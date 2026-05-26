"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
};

export function Toast({ message, type = "success", onClose }: ToastProps) {
  useEffect(() => {
    const timeout = setTimeout(onClose, 2800);
    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <div
        className={`rounded-xl border px-4 py-3 text-sm shadow-xl backdrop-blur ${
          type === "success"
            ? "border-emerald-400/30 bg-emerald-400/15 text-emerald-100"
            : "border-red-400/35 bg-red-400/15 text-red-100"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
