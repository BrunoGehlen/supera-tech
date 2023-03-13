import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStoreState, useStoreActions } from "easy-peasy";
import { ICart, ICartModel } from "../../store/store";
// import { getToken } from "./auth";


type Product = {
  url: string;
  name: string;
  price: number;
  score: number;
  image: string;
  id: number;
};

const ProductsView: React.FC = () => {
  const { updateCart } = useStoreActions<ICartModel>((actions) => actions.Cart)
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get<Product[]>(
        "http://127.0.0.1:8000/products/"
      );
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId: number) => {
    // const token = getToken();
    const config = {
      headers: { Authorization: "Token f93642a55841630424e455f9c8f299c3280cc2a2" }, //${token}` },
    };
    const data = { product_id: productId };
    const response = await axios.post("http://127.0.0.1:8000/cart/add_product_to_cart/", data, config);
    console.log(response.data)
    if (response.status === 201) {
      updateCart(response.data)
    }
  };

  return (
    <div className="product-list">
      {products.map(({ name, url, id, price, score }) => (
        <div key={url}>

          <p>{name}</p>
          <p>{price}</p>
          <p>{score}</p>
          <img src="https://picsum.photos/200" alt={name}></img>
          { /*<img src={image} alt={name} /> */}
          <button onClick={() => handleAddToCart(id)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductsView;

