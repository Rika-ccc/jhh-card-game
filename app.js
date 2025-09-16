const WORDS = ["さんま","ポニー","が","は","で","ピンク","ラヴァー","鬼頭の一族","真下","正義","ヘイヘイ","ヒューイ","そいつ","こそ","王子様","プリンセス","それ","あれ","これ","どれ","真実","ホームルーム","テニス","おばけ","バスケ","黒子","っち","船","動かない","沈まない","！","？","君","あなた","ペット","ポテト","の","ショベルカー","人生","お見事","です","し","ます","でござる","有頂天","大和撫子","七変化","人","すみません","どこ","ここ","か","バカンス","ダメ","な","もう一回","予想以上に","のたうち回るほど","に","やばい","考えられない","ダイエット","邪な","おじさん","構文","ネコチャン","だよ","!(^^)!","JHH","ミア","水都","なあこ","恋","いちい","モモコ","エイコ","大和","かおり","シュッ","アチッ","ねじれ国会","紙子","いちいの絵茶","荒らし","幻","水上敏志","リーマス","シリウス","ポッター","ドビーめ","ドビーは悪い子","ドビーは悪い子","甘い歌声","最終電車","ほっかほか","芋男爵","芋","芋","芋芋芋","うゅん","坂田銀時","公認","公式の女","セブルス","ゴドリック・グリフィンドール","ワッフルチン","同人誌","即売会","実写","100本のバラ","それは","百合","天上天下","唯我独尊","日本","イギリス","フランス","アメリカ","ジレンマ","抱える","たおやかに","受け入れる","しかない","しょうがない","走る","永遠に","どこまでも","あまりにも","つらい","嬉しい","悲しい","許せない","神よ","許します","崇め奉れ","30分","一億年","素敵だね","お互い様","こわい","ホー","珍宝","大きい","小さい","どうぞ","よろしく","お願いします","違法","アインシュタイン","ゲート","新しい","古い","男","女","友達","そいつ","ここから","始まる","TRUE LOVE","REBORN","オシム","惜しい","ストラテコブブウィッチ","恋愛経験値","五億","五千","エリート","驚愕の","ありがとう","感謝","圧倒的","おたんこナース","浩一郎くん","古谷","エンディングノート","パンツ","落ちてる","首が長い","やめてよ","思いついたのさ","ベイベー","美味しい","食べる","いただきます","納得できる","なってます","って何？","ビビっちまったよ","ビビビ","ビーム★","正解","なんてない","ダウンロード","及川","金魚","ミントな僕ら","懐かしい","ね","よ","正直に","可能性がある","の","どや顔","負けた","勝った","買った","リリカルな","おでん","デデンデンデデン","デデンデンデデン","伸びた","デビュー","先生","生徒","チャレンジ","ティエリア","痔","うっかり","しっかり","成仏","鳥籠","ゴルゴ"];
let hand = [];
let board = [];

const deckEl = document.getElementById("deck");
const handEl = document.getElementById("hand");
const boardEl = document.getElementById("board");
const saveBtn = document.getElementById("saveBtn");

function drawHand() {
  hand = Array.from({ length: 7 }, () => WORDS[Math.floor(Math.random() * WORDS.length)]);
  board = [];
  renderHand();
  renderBoard();
}

function renderHand() {
  handEl.innerHTML = "";
  hand.forEach((word, idx) => {
    const card = document.createElement("div");
    card.className = "card hand-card";
    card.textContent = word;
    card.onclick = () => playCard(idx);
    handEl.appendChild(card);
  });
}

function renderBoard() {
  boardEl.innerHTML = "";
  board.forEach((word, idx) => {
    const card = document.createElement("div");
    card.className = "card field-card";
    card.textContent = word;
    card.onclick = () => returnCard(idx);
    boardEl.appendChild(card);
  });
}

function playCard(idx) {
  board.push(hand[idx]);
  hand.splice(idx, 1);
  renderHand();
  renderBoard();
}

function returnCard(idx) {
  hand.push(board[idx]);
  board.splice(idx, 1);
  renderHand();
  renderBoard();
}

deckEl.onclick = drawHand;
deckEl.onkeydown = e => { if (e.key === "Enter" || e.key === " ") drawHand(); };

saveBtn.onclick = () => {
  // 画像生成時のズレ対策: scaleを2にし、背景色を明示し、フォントを指定
  html2canvas(boardEl, {
    scale: 2,
    backgroundColor: "#eaeaea",
    useCORS: true,
    onclone: (doc) => {
      // カードのフォント・サイズを強制
      doc.querySelectorAll('.card').forEach(card => {
        card.style.fontFamily = '"Segoe UI", sans-serif';
        card.style.fontSize = window.getComputedStyle(card).fontSize;
        card.style.color = "#222";
        card.style.background = "#fff";
        card.style.border = "2.5px solid #222";
        card.style.boxSizing = "border-box";
        card.style.display = "flex";
        card.style.alignItems = "center";
        card.style.justifyContent = "center";
        card.style.overflow = "hidden";
        card.style.padding = "0 4px";
      });
    }
  }).then(canvas => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "board.png";
    link.click();
  });
};

// 初期描画
renderHand();
renderBoard();