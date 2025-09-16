import React, { useState } from "react";
import html2canvas from "html2canvas";
import CardArea from "./components/CardArea";
import { WORDS } from "./data/words";

const App: React.FC = () => {
  const [hand, setHand] = useState<string[]>([]);
  const [field, setField] = useState<string[]>([]);

  // 山札クリックで手札生成（リセット）
  const drawHand = () => {
    const shuffled = [...WORDS].sort(() => 0.5 - Math.random());
    setHand(shuffled.slice(0, 5));
    setField([]);
  };

  // 手札 → 場
  const playCard = (word: string) => {
    setField([...field, word]);
    setHand(hand.filter((w) => w !== word));
  };

  // 場 → 手札
  const returnCard = (word: string) => {
    setHand([...hand, word]);
    setField(field.filter((w) => w !== word));
  };

  // 場を画像として保存
  const saveField = async () => {
    const fieldEl = document.getElementById("field");
    if (!fieldEl) return;

    const canvas = await html2canvas(fieldEl, {
      scale: 2, // 高解像度化で文字ずれ軽減
      useCORS: true,
    });
    const link = document.createElement("a");
    link.download = "field.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div style={{ padding: "10px", fontFamily: "sans-serif" }}>
      <h1>JHHカードゲーム</h1>

      {/* 山札 */}
      <div
        id="deck"
        onClick={drawHand}
        style={{
          width: "60px",
          height: "90px",
          background:
            "repeating-linear-gradient(45deg,#ff6f61,#ff6f61 10px,#ffcc00 10px,#ffcc00 20px)",
          border: "2px solid #333",
          borderRadius: "8px",
          margin: "0 auto 10px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontWeight: "bold",
        }}
      >
        山札
      </div>

      {/* 場 */}
      <div
        id="field"
        style={{
          border: "2px dashed #666",
          background: "#f9f9f9",
          minHeight: "120px",
          padding: "10px",
          display: "flex",
          flexWrap: "nowrap", // 折り返さず横並び
          gap: "10px",
          justifyContent: "flex-start",
          overflow: "hidden", // はみ出し抑制
        }}
      >
        <CardArea cards={field} onCardClick={returnCard} autoResize />
      </div>

      <button
        onClick={saveField}
        style={{
          display: "block",
          margin: "10px auto",
          padding: "10px",
          fontSize: "1rem",
          borderRadius: "6px",
          border: "none",
          background: "#ff6f61",
          color: "white",
          cursor: "pointer",
        }}
      >
        場を画像として保存
      </button>

      {/* 手札 */}
      <div
        id="hand"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          padding: "10px",
          background: "rgba(255,255,255,0.6)",
        }}
      >
        <CardArea cards={hand} onCardClick={playCard} />
      </div>
    </div>
  );
};

export default App;
