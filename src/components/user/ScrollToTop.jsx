import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use smooth scroll behavior
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null; // doesn’t render anything
};

