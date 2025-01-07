const symbols = [
	"images/symbol1.png",
	"images/symbol2.png",
	"images/symbol3.png",
	"images/symbol4.png",
	"images/symbol5.png",
	"images/symbol6.png"
  ];
  
  let score = 0;
  let spinCount = 0;
  let isSpinning = false;
  let reelInterval;
  let reelSymbols = [[], [], []];
  
  const spinButton = document.getElementById('spin-btn');
  const stopButton = document.getElementById('stop-btn');
  const pekaButton = document.getElementById('peka-btn');
  const scoreDisplay = document.getElementById('score');
  const spinCountDisplay = document.getElementById('spin-count');
  
  // リールをランダムにシャッフルして表示
  function shuffleAndDisplayReels() {
	for (let i = 0; i < 3; i++) {
	  const shuffledSymbols = symbols.sort(() => Math.random() - 0.5);
	  const reel = document.getElementById(`reel-${i + 1}`).querySelector(".reel-content");
	  reel.innerHTML = shuffledSymbols.map(symbol => `<img src="${symbol}" alt="symbol">`).join('');
	  reelSymbols[i] = shuffledSymbols; // 各リールのシンボルを記録
	}
  }
  
  // スピンを開始
  function startSpin() {
	if (isSpinning) return;
  
	isSpinning = true;
	spinButton.disabled = true;
	stopButton.disabled = false;
	shuffleAndDisplayReels();
	spinCount++;
  
	// スピン回数表示
	spinCountDisplay.innerText = spinCount;
  
	// リールが回転する処理（アニメーション）
	for (let i = 0; i < 3; i++) {
	  const reel = document.getElementById(`reel-${i + 1}`).querySelector(".reel-content");
	  reel.style.top = "0px"; // 最初にリールをリセット
	  reelInterval = setInterval(() => {
		reel.style.top = `${parseInt(reel.style.top) - 100}px`; // 1リールの高さ分をスクロール
	  }, 100);
	}
  }
  
  // 停止ボタンが押された時
  function stopSpin() {
	if (!isSpinning) return;
  
	// 停止時にリールを止める
	for (let i = 0; i < 3; i++) {
	  clearInterval(reelInterval);
	  const reel = document.getElementById(`reel-${i + 1}`).querySelector(".reel-content");
	  const stopSymbol = reelSymbols[i][Math.floor(Math.random() * reelSymbols[i].length)];
	  const stopPosition = symbols.indexOf(stopSymbol) * 100;
	  reel.style.top = `-${stopPosition}px`;
	}
  
	// 得点の計算（揃ったら+3, 揃わなかったら-1）
	checkForMatch();
  
	// ぺかりボタン表示
	if (Math.random() < 0.1) {  // 10%の確率でぺかりボタン
	  pekaButton.style.display = "block";
	}
  
	spinButton.disabled = false;
	stopButton.disabled = true;
	isSpinning = false;
  }
  
  // 図柄が揃ったかどうかの判定
  function checkForMatch() {
	const reel1 = reelSymbols[0][reelSymbols[0].length - 1];
	const reel2 = reelSymbols[1][reelSymbols[1].length - 1];
	const reel3 = reelSymbols[2][reelSymbols[2].length - 1];
  
	if (reel1 === reel2 && reel2 === reel3) {
	  score += 3;
	} else {
	  score -= 1;
	}
  
	scoreDisplay.innerText = score;
  }
  
  spinButton.addEventListener('click', startSpin);
  stopButton.addEventListener('click', stopSpin);
  pekaButton.addEventListener('click', () => {
	alert('ぺかり！');
	pekaButton.style.display = "none"; // ぺかりボタンを非表示に
  });
  
  // スペースキーで停止ボタンが反応
function handleKeyPress(event) {
	if (event.code === "Space" && !stopButton.disabled) {
	  stopSpin();
	}
  }
  
  document.addEventListener('keydown', handleKeyPress)