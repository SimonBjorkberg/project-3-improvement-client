import "./HomePage.css";
import RecentProducts from "../../components/RecentProducts/RecentProducts";
import MainBanner from "../../components/MainBanner/MainBanner";
import Categories from "../../components/Categories/Categories";

function HomePage() {
  return (
    <div className="bg-neutral-200">
      <MainBanner />
      <div className="w-full bg-neutral-900 py-16">
        <div className="max-w-[676px] mx-auto flex flex-col text-white font-light">
          <p className="text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut numquam aperiam blanditiis, excepturi voluptates temporibus ab at nobis error modi sed reprehenderit minima, iure doloremque ratione odio? Quas, perferendis enim!</p>
          <button className="mr-auto mt-5 px-3 py-2 border transition-all duration-200 hover:bg-neutral-800">
            List an item
          </button>
        </div>
      </div>
      <Categories />
      <RecentProducts />
    </div>
  );
}

export default HomePage;
