import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero.jsx";

export default function HomePage() {
  const navigate = useNavigate();
  return <Hero onOpenSurprise={() => navigate("/message")} />;
}
