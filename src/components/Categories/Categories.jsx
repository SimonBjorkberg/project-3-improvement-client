import { Link } from "react-router-dom";
import "./Categories.css";
import { useContext } from "react";
import { SearchContext } from "../../context/search.context";

function Categories() {
  const { setFilter, filter } = useContext(SearchContext);

  const handleClick = (value) => {
    if (value === filter) {
      setFilter("");
    } else {
      setFilter(value);
    }
  };

  return (
    <div className="max-w-[676px] mx-auto mt-10">
      <div className="flex flex-row flex-wrap gap-x-1 gap-y-1 mb-8 justify-center">
        <Link to="/products">
          <button
            onClick={() => handleClick("rompers")}
            className="text-white border border-white hover:bg-neutral-focus px-2.5 py-1.5 rounded-md font-light bg-neutral w-fit"
          >
            Rompers
          </button>
        </Link>
        <Link to="/products">
          <button
            onClick={() => handleClick("sleepsuits")}
            className="text-white border border-white hover:bg-neutral-focus px-2.5 py-1.5 rounded-md font-light bg-neutral w-fit"
          >
            Sleepsuits
          </button>
        </Link>
        <Link to="/products">
          <button
            onClick={() => handleClick("onesies")}
            className="text-white border border-white hover:bg-neutral-focus px-2.5 py-1.5 rounded-md font-light bg-neutral w-fit"
          >
            Onesies
          </button>
        </Link>
        <Link to="/products">
          <button
            onClick={() => handleClick("bodysuits")}
            className="text-white border border-white hover:bg-neutral-focus px-2.5 py-1.5 rounded-md font-light bg-neutral w-fit"
          >
            Bodysuits
          </button>
        </Link>
        <Link to="/products">
          <button
            onClick={() => handleClick("dresses")}
            className="text-white border border-white hover:bg-neutral-focus px-2.5 py-1.5 rounded-md font-light bg-neutral w-fit"
          >
            Dresses
          </button>
        </Link>
        <Link to="/products">
          <button
            onClick={() => handleClick("t-shirts")}
            className="text-white border border-white hover:bg-neutral-focus px-2.5 py-1.5 rounded-md font-light bg-neutral w-fit"
          >
            T-Shirts
          </button>
        </Link>
        <Link to="/products">
          <button
            onClick={() => handleClick("pantsNleggings")}
            className="text-white border border-white hover:bg-neutral-focus px-2.5 py-1.5 rounded-md font-light bg-neutral w-fit"
          >
            Pants & Leggings
          </button>
        </Link>
        <Link to="/products">
          <button
            onClick={() => handleClick("sweatersNcardigans")}
            className="text-white border border-white hover:bg-neutral-focus px-2.5 py-1.5 rounded-md font-light bg-neutral w-fit"
          >
            Sweaters & Cardigans
          </button>
        </Link>
        <Link to="/products">
          <button
            onClick={() => handleClick("bibs")}
            className="text-white border border-white hover:bg-neutral-focus px-2.5 py-1.5 rounded-md font-light bg-neutral w-fit"
          >
            Bibs
          </button>
        </Link>
        <Link to="/products">
          <button
            onClick={() => handleClick("outerwear")}
            className="text-white border border-white hover:bg-neutral-focus px-2.5 py-1.5 rounded-md font-light bg-neutral w-fit"
          >
            Outerwear
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Categories;
