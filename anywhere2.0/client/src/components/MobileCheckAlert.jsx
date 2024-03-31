import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

const MobileCheckAlert = () => {
  useEffect(() => {
    const checkMobileScreen = () => {
      if (window.innerWidth < 768) {
        toast.error("This web app is not supported on mobile devices.", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    };

    checkMobileScreen();

    window.addEventListener("resize", checkMobileScreen);

    return () => window.removeEventListener("resize", checkMobileScreen);
  }, []);

  return null;
};

export default MobileCheckAlert;
