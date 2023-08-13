import heropicture from "../static/heropicture.jpg";
import { Link } from "react-router-dom";

const image = new Image();
image.src = heropicture;

export const HeroSection = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <img src={heropicture} className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">Hello there!</h1>
          <p className="py-6">
            Indulge your wanderlust by virtually touring remarkable hotels
            worldwide. Experience opulent suites, stunning views, and lavish
            amenities online. Imagine sipping cocktails by the pool or unwinding
            in serene spas. Whether planning a getaway or seeking inspiration,
            explore elegance and hospitality at its finest on our website. Your
            dream stay is a click away.
          </p>
          <Link to="/hotels">
            <button className="btn btn-primary">Get Started!</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
