import React, { useState, useEffect } from "react";

const Loading = () => {
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [count]);

  return (
    <div className="overlay-loader">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <p>Please sign in to access this page</p>
        <p  >You will automatically be redirected to the login page in {count} seconds</p>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          {["primary","secondary","success","danger","warning","info","light","dark"].map((color) => (
            <div key={color} className={`spinner-grow text-${color}`} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
