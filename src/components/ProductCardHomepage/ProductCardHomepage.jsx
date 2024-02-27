import "./ProductCardHomepage.css";
import productService from "../../services/product.service";
import { useState, useEffect } from "react";
import imagePlaceholder from '../../icons/imagePlaceholder.png'

function ProductCardHomepage() {
  const [products, setProducts] = useState("");

  useEffect(() => {
    productService.getAll().then((response) => {
      if (response.data.length > 7) {
        const sevenRecent = response.data.slice(
          Math.max(response.data.length - 7, 1)
        );
        setProducts(sevenRecent.reverse());
      } else {
        setProducts(response.data);
      }
    });
  }, []);

  return (
    <div className="grid mx-auto gap-5 mb-5">
      {products && products.map((product) => {
        return (
          <div className="flex flex-row border-b border-neutral-900 pb-2 min-w-[750px]">
            <div className="h-40 w-52 overflow-hidden bg-neutral-100 rounded-md border border-neutral-400">
              <img src={imagePlaceholder} className="h-full w-full object-contain" />
            </div>
            <div className="text-left ml-4 flex flex-col justify-between">
              <div>
                <p className="font-light">{product.categories[0].label}</p>
                <p>{product.title}</p>
              </div>
              <p>2024</p>
              <p>{product.price} €</p>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default ProductCardHomepage;
