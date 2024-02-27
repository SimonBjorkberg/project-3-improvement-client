import "./MainBanner.css";

function MainBanner() {
  return (
      <div className="lg:h-[530px] md:h-[40vh] overflow-hidden">
        <img
          src="https://static.vinted.com/assets/seller-promotion/gender_test/a/banner-wide-7403f719caac875cfeea61593da7fc7e7320c126193b4ff654e4397f54d430ae.jpg"
          className="w-full max-w-full 2xl:relative 2xl:top-[-20%]"
          alt=""
        ></img>
      </div>
  );
}

export default MainBanner;
