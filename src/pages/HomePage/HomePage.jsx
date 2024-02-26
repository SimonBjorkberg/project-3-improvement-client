import "./HomePage.css";
import RecentProducts from "../../components/RecentProducts/RecentProducts";
import MainBanner from "../../components/MainBanner/MainBanner";
import Categories from "../../components/Categories/Categories";

// components: nav bar / search bar/ main banner / module CTA / module last added products / filters / footer

function HomePage() {
  return (
    <div className="pt-20">
      <MainBanner />
      <Categories />
      <RecentProducts />
    </div>
  );
}

export default HomePage;
