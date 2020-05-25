import { ADD_TO_CARD } from "../actions/cart";
import CartItem from '../../models/Cart';

const initialState = {
    items: {},
    totalAmountPrice: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CARD:
            const addedProduct = action.product;
            const productPrice = addedProduct.price;
            const productTiTle = addedProduct.title;

            let updatedOrCreatedCartItem;

            if(state.items[addedProduct.id]) {
                updatedOrCreatedCartItem = new CartItem(
                    ++state.items[addedProduct.id].quantity,
                    productPrice,
                    productTiTle,
                    state.items[addedProduct.id].sum + productPrice
                );
            } else {
                updatedOrCreatedCartItem = new CartItem(1, productPrice, productTiTle, productPrice);
            }
            return {
                ...state, 
                items: {...state.items, [addedProduct.id]: updatedOrCreatedCartItem},
                totalAmountPrice: state.totalAmountPrice + productPrice
            }
        default:
            return state;
    }
}
