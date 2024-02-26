import { useNavigate } from "react-router-dom";
const SearchBar = ({
  setFocus,
  deFocus,
  titleSearch,
  isFocused,

  searchValue,
  setSearchValue,
}) => {
  const navigate = useNavigate();

  const handleNavigate = (productId) => {
    navigate(`/product/single/${productId}`);
  };

  return (
    <div
      className="flex justify-center items-center w-3/5 md:w-[200px]"
      id="searchbar"
      onFocus={setFocus}
    >
      <input
        type="text"
        className={`${
          isFocused &&
          "inset-x-0 mx-auto absolute outline-none z-50 w-[80%] rounded"
        } p-2 rounded`}
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {isFocused && titleSearch.length > 0 && (
        <div className="z-50 w-[80%] bg-white absolute inset-x-0 mx-auto top-[70px] max-h-80 overflow-y-auto">
          {titleSearch?.map((product) => {
            return (
              <div
                onClick={() => {
                  handleNavigate(product._id);
                  deFocus();
                  setSearchValue("");
                }}
                key={product._id}
                className="bg-neutral-50 rounded-none text-left border-b flex justify-between hover:cursor-pointer hover:bg-neutral-200 p-2"
              >
                <p className="text-lg p-2 font-semibold">{product.title}</p>
                <div className="hidden md:flex mr-2">
                  {product.categories.map((category, index) => (
                    <div
                      key={index}
                      className={`${
                        category.value === "onesies" && "bg-teal-500"
                      } ${category.value === "t-shirts" && "bg-green-500"} ${
                        category.value === "sleepsuits" && "bg-yellow-500"
                      } ${category.value === "bodysuits" && "bg-cyan-500"} ${
                        category.value === "dresses" && "bg-orange-500"
                      } ${
                        category.value === "pantsNleggings" && "bg-purple-500"
                      } ${
                        category.value === "sweatersNcardigans" && "bg-pink-500"
                      } ${category.value === "bibs" && "bg-rose-500"} ${
                        category.value === "outerwear" && "bg-violet-500"
                      } ${
                        category.value === "rompers" && "bg-yellow-600"
                      } badge badge-outline mx-1 my-auto`}
                    >
                      {category.label}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
