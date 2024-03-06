import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSessionStorage from "../hooks/useSessionStorage";
import Home from "../pages/Home";
import { toast } from "react-hot-toast";

export function UserWrapper() {
  const navigate = useNavigate();
  const [user] = useSessionStorage("user");
  const [authenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    if (user && user.username !== "") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      toast.error("Access Restricted !", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        id: 234,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user, navigate]);

  if (authenticated === null) {
    return null; // or a loading spinner
  }

  return authenticated ? <Home /> : null;
}
