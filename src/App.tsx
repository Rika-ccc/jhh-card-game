import React, { useRef } from "react";
import html2canvas from "html2canvas";

const WORDS = [
  "さんま","ポニー","が","は","で","ピンク","ラヴァー","鬼頭の一族","真下","正義","ヘイヘイ","ヒューイ","そいつ","こそ","王子様","プリンセス","それ","あれ","これ","どれ","真実","ホームルーム","テニス","おばけ","バスケ","黒子","っち","船","動かない","沈まない","！","？","君","あなた","ペット","ポテト","の","ショベルカー","人生","お見事","です","し","ます","でござる","有頂天","大和撫子","七変化","人","すみません","どこ","ここ","か","バカンス","ダメ","な","もう一回","予想以上に","のたうち回るほど","に","やばい","考えられない","ダイエット","邪な","おじさん","構文","ネコチャン","だよ","!(^^)!","JHH","ミア","水都","なあこ","恋","いちい","モモコ","エイコ","大和","かおり","シュッ","アチッ","ねじれ国会","紙子","いちいの絵茶","荒らし","幻","水上敏志","リーマス","シリウス","ポッター","ドビーめ","ドビーは悪い子","ドビーは悪い子","甘い歌声","最終電車","ほっかほか","芋男爵","芋","芋","芋芋芋","うゅん","坂田銀時","公認","公式の女","セブルス","ゴドリック・グリフィンドール","ワッフルチン","同人誌","即売会","実写","100本のバラ","それは","百合","天上天下","唯我独尊","日本","イギリス","フランス","アメリカ","ジレンマ","抱える","たおやかに","受け入れる","しかない","しょうがない","走る","永遠に","どこまでも","あまりにも","つらい","嬉しい","悲しい","許せない","神よ","許します","崇め奉れ","30分","一億年","素敵だね","お互い様","こわい","ホー","珍宝","大きい","小さい","どうぞ","よろしく","お願いします","違法","アインシュタイン","ゲート","新しい","古い","男","女","友達","そいつ","ここから","始まる","TRUE LOVE","REBORN","オシム","惜しい","ストラテコブブウィッチ","恋愛経験値","五億","五千","エリート","驚愕の","ありがとう","感謝","圧倒的","おたんこナース","浩一郎くん","古谷","エンディングノート","パンツ","落ちてる","首が長い","やめてよ","思いついたのさ","ベイベー","美味しい","食べる","いただきます","納得できる","なってます","って何？","ビビっちまったよ","ビビビ","ビーム★","正解","なんてない","ダウンロード","及川","金魚","ミントな僕ら","懐かしい","ね","よ","正直に","可能性がある","の","どや顔","負けた","勝った","買った","リリカルな","おでん","デデンデンデデン","デデンデンデデン","伸びた","デビュー","先生","生徒","チャレンジ","ティエリア","痔","うっかり","しっかり","成仏","鳥籠","ゴルゴ"
];

function getRandomHand(): string[] {
  return Array.from({ length: 7 }, () => WORDS[Math.floor(Math.random() * WORDS.length)]);
}

// カード内の文字サイズを自動調整する関数
function getCardFontSize(text: string, isField: boolean) {
  const base = isField ? 1.25 : 1.0;
  if (text.length <= 5) return `${base}rem`;
  if (text.length <= 8) return `${base * 0.9}rem`;
  if (text.length <= 12) return `${base * 0.8}rem`;
  return `${base * 0.7}rem`;
}

const App: React.FC = () => {
  const [hand, setHand] = React.useState<string[]>(getRandomHand());
  const [board, setBoard] = React.useState<string[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);

  const drawHand = () => {
    setHand(getRandomHand());
    setBoard([]);
  };

  const playCard = (idx: number) => {
    setBoard([...board, hand[idx]]);
    setHand(hand.filter((_, i) => i !== idx));
  };

  const returnCard = (idx: number) => {
    setHand([...hand, board[idx]]);
    setBoard(board.filter((_, i) => i !== idx));
  };

  const saveBoardImage = async () => {
    if (!boardRef.current) return;
    const canvas = await html2canvas(boardRef.current, {
      scale: 2,
      backgroundColor: "#eaeaea",
      useCORS: true,
      onclone: (doc) => {
        doc.querySelectorAll('.card').forEach(card => {
          (card as HTMLElement).style.fontFamily = '"Segoe UI", sans-serif';
          (card as HTMLElement).style.fontSize = window.getComputedStyle(card as HTMLElement).fontSize;
          (card as HTMLElement).style.color = "#222";
          (card as HTMLElement).style.background = "#fff";
          (card as HTMLElement).style.border = "2.5px solid #222";
          (card as HTMLElement).style.boxSizing = "border-box";
          (card as HTMLElement).style.display = "flex";
          (card as HTMLElement).style.alignItems = "center";
          (card as HTMLElement).style.justifyContent = "center";
          (card as HTMLElement).style.overflow = "hidden";
          (card as HTMLElement).style.padding = "0 4px";
          (card as HTMLElement).style.wordBreak = "break-all";
        });
      }
    });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "board.png";
    link.click();
  };

  // スマホ対応のためのレスポンシブサイズ
  const isMobile = window.innerWidth <= 600;
  const fieldCard = {
    width: isMobile ? "19vw" : 80,
    minWidth: isMobile ? 56 : 80,
    maxWidth: isMobile ? 80 : 80,
    height: isMobile ? "28vw" : 120,
    minHeight: isMobile ? 80 : 120,
    maxHeight: isMobile ? 120 : 120,
    fontSize: "1.25rem",
  };
  const handCard = {
    width: isMobile ? "13vw" : 60,
    minWidth: isMobile ? 40 : 60,
    maxWidth: isMobile ? 60 : 60,
    height: isMobile ? "20vw" : 90,
    minHeight: isMobile ? 60 : 90,
    maxHeight: isMobile ? 90 : 90,
    fontSize: "1rem",
  };

  return (
    <div style={{
      fontFamily: '"Segoe UI", sans-serif',
      background: "#f7f7f7",
      minHeight: "100vh",
      margin: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <header>
        <h1 style={{ color: "#333", margin: "20px 0 10px", fontSize: "1.7rem", textAlign: "center" }}>JHHカードゲーム</h1>
      </header>
      <main style={{ width: "100vw", maxWidth: 600, margin: "0 auto" }}>
        <div
          id="deck"
          tabIndex={0}
          style={{
            width: 80, height: 120, background: "#fff", border: "2.5px solid #222", borderRadius: 10,
            display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold",
            fontSize: "1.2rem", cursor: "pointer", boxShadow: "2px 2px 8px rgba(0,0,0,0.12)",
            margin: "16px auto", color: "#222", outline: "none", userSelect: "none"
          }}
          onClick={drawHand}
          onKeyDown={e => { if (e.key === "Enter" || e.key === " ") drawHand(); }}
        >山札</div>
        <section className="game-container" style={{
          width: "100vw", maxWidth: 600, display: "flex", flexDirection: "column", alignItems: "center", gap: 18, padding: 0, boxSizing: "border-box"
        }}>
          <div
            id="board"
            aria-label="場"
            ref={boardRef}
            style={{
              width: "98vw", maxWidth: 600, minHeight: isMobile ? "32vw" : 180, height: isMobile ? "36vw" : 180,
              display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",
              gap: 8, background: "#eaeaea", border: "2px solid #bbb", borderRadius: 24,
              padding: 0, boxSizing: "border-box", overflowX: "auto", overflowY: "hidden", position: "relative", zIndex: 1
            }}
          >
            {board.map((word, idx) => (
              <div
                key={idx}
                className="card field-card"
                style={{
                  ...fieldCard,
                  background: "#fff", border: "2.5px solid #222", borderRadius: 8,
                  display: "flex", justifyContent: "center", alignItems: "center",
                  fontFamily: '"Segoe UI", sans-serif',
                  color: "#222", cursor: "pointer", boxShadow: "1.5px 1.5px 6px rgba(0,0,0,0.10)",
                  transition: "transform 0.15s, box-shadow 0.15s", userSelect: "none",
                  whiteSpace: "pre-line", textAlign: "center", overflow: "hidden", padding: "0 4px",
                  position: "relative", zIndex: 2,
                  fontSize: getCardFontSize(word, true),
                  wordBreak: "break-all"
                }}
                onClick={() => returnCard(idx)}
                tabIndex={0}
                onKeyDown={e => { if (e.key === "Enter" || e.key === " ") returnCard(idx); }}
                onMouseOver={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; (e.currentTarget as HTMLElement).style.boxShadow = "2.5px 2.5px 10px rgba(0,0,0,0.13)"; }}
                onMouseOut={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "1.5px 1.5px 6px rgba(0,0,0,0.10)"; }}
              >{word}</div>
            ))}
          </div>
          <div
            id="hand"
            aria-label="手札"
            style={{
              width: "98vw", maxWidth: 600, minHeight: isMobile ? "22vw" : 140, height: isMobile ? "26vw" : 140,
              display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",
              gap: 8, background: "#f5f5f5", border: "2px solid #bbb", borderRadius: 24,
              padding: 0, boxSizing: "border-box", overflowX: "auto", overflowY: "hidden", position: "relative", zIndex: 1
            }}
          >
            {hand.map((word, idx) => (
              <div
                key={idx}
                className="card hand-card"
                style={{
                  ...handCard,
                  background: "#fff", border: "2.5px solid #222", borderRadius: 8,
                  display: "flex", justifyContent: "center", alignItems: "center",
                  fontFamily: '"Segoe UI", sans-serif',
                  color: "#222", cursor: "pointer", boxShadow: "1.5px 1.5px 6px rgba(0,0,0,0.10)",
                  transition: "transform 0.15s, boxShadow 0.15s", userSelect: "none",
                  whiteSpace: "pre-line", textAlign: "center", overflow: "hidden", padding: "0 4px",
                  position: "relative", zIndex: 2,
                  fontSize: getCardFontSize(word, false),
                  wordBreak: "break-all"
                }}
                onClick={() => playCard(idx)}
                tabIndex={0}
                onKeyDown={e => { if (e.key === "Enter" || e.key === " ") playCard(idx); }}
                onMouseOver={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; (e.currentTarget as HTMLElement).style.boxShadow = "2.5px 2.5px 10px rgba(0,0,0,0.13)"; }}
                onMouseOut={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "1.5px 1.5px 6px rgba(0,0,0,0.10)"; }}
              >{word}</div>
            ))}
          </div>
        </section>
        <button
          id="saveBtn"
          style={{
            margin: "12px 0 24px 0", padding: "8px 18px", background: "#333", border: "none",
            borderRadius: 8, fontSize: "1rem", color: "#fff", cursor: "pointer",
            boxShadow: "1.5px 1.5px 6px rgba(0,0,0,0.10)", transition: "background 0.2s"
          }}
          onClick={saveBoardImage}
        >場を画像として保存</button>
      </main>
    </div>
  );
};

export default App;
