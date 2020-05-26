import { ADD_TO_CARD, REMOVE_FROM_CART } from "../actions/cart";
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
        case REMOVE_FROM_CART:
            const currentQuantity = state.items[action.productId].quantity;
            let updatedCartItems;
            if(currentQuantity > 1) {
                const updatedCartItem = new CartItem(
                    --state.items[action.productId].quantity,
                    state.items[action.productId].price,
                    state.items[action.productId].title,
                    state.items[action.productId].sum - state.items[action.productId].price
                );
                updatedCartItems = {...state.items, [action.productId]: updatedCartItem}
            } else {
                updatedCartItems = {...state.items}
                delete updatedCartItems[action.productId];
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmountPrice: state.totalAmountPrice - state.items[action.productId].price
            }
        default:
            return state;
    }
}
