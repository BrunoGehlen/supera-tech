import { createStore, action, Action } from 'easy-peasy'

type Product = {
    url: string;
    name: string;
    price: number;
    score: number;
    image: string;
    id: number;
};

type Cart =  {
    cart_costs: {
        sub_total: number
        total: number
        delivery_cost: number
    },
    products: Product[],
}

const CartModel: ICart = {
    'Cart': {} as Cart,
    'updateCart': action((state, payload) => {
        state.Cart = payload;
    })
}

export interface ICart {
    Cart: Cart,
    updateCart: Action<ICart, Cart>
}

export interface ICartModel {
    Cart: ICart
}

export const store = createStore({
    Cart: CartModel
})
