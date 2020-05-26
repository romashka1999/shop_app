import { ADD_ORDER } from '../actions/orders';
import Order from '../../models/Order';

const initialState = {
    orders: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const order =  new Order(
                new Date().toString(), 
                action.orderData.items,
                action.orderData.amount,
                new Date()
            );
            return {
                ...state,
                orders: state.orders.concat(order)
            }
        default:
            return state;
    }
}