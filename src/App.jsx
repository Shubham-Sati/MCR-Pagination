import { useEffect, useState } from "react";
import rightArrow from "./assets/arrow-right.png";
import leftArrow from "./assets/left-arrow.png";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage === 0 ||
      selectedPage === products.length / 10 + 1 ||
      selectedPage === page
    ) {
      return;
    }

    setPage(selectedPage);
  };

  console.log(products);
  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <span key={prod.id} className="products__single">
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}

      {products.length > 0 && (
        <div className="pagination">
          <span>
            <img
              src={leftArrow}
              alt="Prev"
              className={page === 1 ? "pagination__disable" : "pagination__img"}
              onClick={() => selectPageHandler(page - 1)}
            />
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                key={i}
                onClick={() => selectPageHandler(i + 1)}
                className={page === i + 1 ? "pagination__selected" : ""}
              >
                {i + 1}
              </span>
            );
          })}
          <span>
            <img
              src={rightArrow}
              alt="Next"
              className={
                page == products.length / 10
                  ? "pagination__disable"
                  : "pagination__img"
              }
              onClick={() => selectPageHandler(page + 1)}
            />
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
