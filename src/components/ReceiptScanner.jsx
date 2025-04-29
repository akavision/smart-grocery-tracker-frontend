import React, { useState } from "react";
import Tesseract from "tesseract.js";

export default function ReceiptScanner() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    Tesseract.recognize(file, "eng").then(({ data: { text } }) => {
      setText(text);
      setLoading(false);
    });
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h3 className="text-lg font-bold mb-2">Scan Grocery Receipt</h3>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {loading ? <p>Scanning...</p> : <pre className="mt-2 text-sm">{text}</pre>}
    </div>
  );
}
