import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if(!userInfo) {
      navigate("/login")
    } else {
      navigate("/posts")
    }
  }, [])
  
  return <div>
 Hello
  </div>;
}
