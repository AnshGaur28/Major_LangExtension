import Hero from "../components/hero";
import Navbar from "../components/Navbar";

export default function LandingPage() {
  return (
    <div className="flex flex-col bg-black text-white ">
      <Navbar />
      <div className="flex flex-row">
        <Hero />
      </div>
    </div>
  );
}
