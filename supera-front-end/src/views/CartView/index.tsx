import React, { useEffect } from "react";
import axios from "axios";
import { useStoreActions, useStoreState } from "easy-peasy";
import { ICart, ICartModel } from "../../store/store";
import {
  View,
  ProductDetailView,
  ButtomView,
  ProductView,
  ProductListView,
  ImageView,
  ProductTitleView,
  ProductPriceView,
  CartDetailView,
} from './style'

type Product = {
  url: string;
  name: string;
  price: number;
  score: number;
  image: string;
  id: number;
};

type Cart = {
  url: string;
  cart_costs: {
    sub_total: number;
    total: number;
    delivery_cost: number;
  };
  products: Product[];
};

const CartView: React.FC = () => {
  const { Cart } = useStoreState<ICartModel, ICart>((state) => state.Cart)
  const { updateCart } = useStoreActions<ICartModel>((actions) => actions.Cart)

  useEffect(() => {
    const fetchCart = async () => {
      const response = await axios.get<Cart[]>("http://127.0.0.1:8000/cart/", {
        headers: {
          Authorization: 'Token f93642a55841630424e455f9c8f299c3280cc2a2',
        },
      });
      updateCart(response.data[0]);
    };
    fetchCart();
  }, []);

  const handleCheckout = async () => {
    await axios.post("http://127.0.0.1:8000/orders/checkout/", {}, {
      headers: {
        Authorization: 'Token f93642a55841630424e455f9c8f299c3280cc2a2',
      },
    });

    updateCart([]);
  };

  const handleRemoveFromCart = async (id: number) => {
    const response = await axios.delete(`http://127.0.0.1:8000/cart/remove_product_from_cart/?id=${id}`, {
      headers: {
        Authorization: 'Token f93642a55841630424e455f9c8f299c3280cc2a2',
      },
    });

    updateCart(response.data);
  }

  return (
    <View>
      {Cart?.products?.length > 0 && (
        <>
          <ProductListView>
            {Cart.products.map(({ id, url, name, price, image }) => (
              <ProductView key={url} >
                <ImageView src="https://picsum.photos/200" alt={name} />
                { /*<img src={image} alt={name} /> */}
                <ProductDetailView>
                  <ProductTitleView>{name}</ProductTitleView>
                  <ProductPriceView>$ {price}</ProductPriceView>
                </ProductDetailView>
                <ButtomView onClick={() => handleRemoveFromCart(id)}>Remove</ButtomView>
              </ProductView>
            ))}
          </ProductListView>
          <CartDetailView>
            <div>
              <p>Sub Total: $ {Cart.cart_costs.sub_total}</p>
              <p>Total: $ {Cart.cart_costs.total}</p>
              <p>Delivery Cost: $ {Cart.cart_costs.delivery_cost}</p>
            </div>
            <ButtomView onClick={handleCheckout}>Checkout</ButtomView>
          </CartDetailView>
        </>)
      }
    </View>
  );
};

export default CartView;

