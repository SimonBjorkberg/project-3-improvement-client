import { Link } from "react-router-dom";
import "./MainBanner.css";

function MainBanner() {
  return (
    <div className="block">
      <div className="lg:h-[450px] md:h-[40vh] overflow-hidden">
        <img
          src="https://static.vinted.com/assets/seller-promotion/gender_test/a/banner-wide-7403f719caac875cfeea61593da7fc7e7320c126193b4ff654e4397f54d430ae.jpg"
          className="w-full max-w-full 2xl:relative 2xl:top-[-20%]"
          alt=""
        ></img>
      </div>
      <div className="card bg-base-100 shadow-md rounded-none lg:absolute lg:rounded-md lg:top-[10rem] lg:left-40 lg:w-[350px] lg:flex">
        <div className="card-body ">
          <h2 className="card-title">Turn Unwanted Baby Clothes into Cash</h2>
          <p>
            Say goodbye to unused baby clothes and hello to extra income!
            Discover how to effortlessly sell your gently used baby clothes and
            make money today.
          </p>
          <div className="card-actions justify-end">
            <Link to="/products" className="w-full">
              <button className="btn btn-neutral">Our products</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainBanner;
