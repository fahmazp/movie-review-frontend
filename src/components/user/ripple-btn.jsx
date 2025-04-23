import { useState } from "react";

export default function RippleButton({ 
      children,
      bgColor = "bg-zinc-900 hover:bg-gray-900 dark:bg-white/15 dark:hover:bg-white/30",
      textColor = "text-white",
      onClick,
    }) {

  const [ripples, setRipples] = useState([]);

  const createRipple = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = { id: Date.now(), x, y, size };
    setRipples((prevRipples) => [...prevRipples, newRipple]);

    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.filter((r) => r.id !== newRipple.id));
    }, 600); 
    
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
    type="button"
      className={`relative overflow-hidden flex items-center px-5 py-1.5 border-2 backdrop-blur-xl font-medium rounded-sm shadow-lg transition-all duration-300 active:scale-95 focus:outline-none tracking-wide ${bgColor} ${textColor}`}
      onClick={createRipple}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white opacity-30 rounded-full animate-ripple"
          style={{
            width: ripple.size,
            height: ripple.size,
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}
    </button>
  );
}
