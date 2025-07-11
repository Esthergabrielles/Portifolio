// src/components/BackToTop.tsx
import React from "react";

const BackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button onClick={scrollToTop} style={{ position: 'fixed', bottom: 20, right: 20 }}>
      ↑ Back to Top
    </button>
  );
};

export default BackToTop;
