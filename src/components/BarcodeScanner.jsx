import React, { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

export default function BarcodeScanner({ onDetected }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
      if (result) {
        onDetected(result.getText());
      }
    });

    return () => {
      codeReader.reset();
    };
  }, [onDetected]);

  return (
    <div>
      <video ref={videoRef} className="w-full rounded border shadow" />
    </div>
  );
}
