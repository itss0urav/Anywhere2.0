import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSessionStorage from "../hooks/useSessionStorage";
import Admin from "./Admin";
import { toast } from "react-hot-toast";

export function AdminWrapper() {
  const navigate = useNavigate();
  const [user] = useSessionStorage("user");
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    if (user && user.username === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
      toast.error("Access Restricted !", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user, navigate]);

  if (isAdmin === null) {
    return null; // or a loading spinner
  }

  return isAdmin ? <Admin /> : null;
}
