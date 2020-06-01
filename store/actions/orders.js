import Order from '../../models/Order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const response = await fetch(`https://shop-app-ea6db.firebaseio.com/orders/${userId}.json`);
        
        if(!response.ok) {
            throw new Error("Something went wrong");
        }

        const responseData = await response.json();
        const loadedOrders = [];

        for(let key in responseData) {
            loadedOrders.push(
                new Order(
                    key,
                    responseData[key].cartItems,
                    responseData[key].totalAmountPrice,
                    new Date(responseData[key].date)
                )
            );
        }

        dispatch({ type: SET_ORDERS, orders: loadedOrders });
    }
}

export const addOrder = (cartItems, totalAmountPrice) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const date = new Date();
        const response = await fetch(`https://shop-app-ea6db.firebaseio.com/orders/${userId}.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmountPrice,
                date: date.toISOString()
            })
        });

        if(!response.ok) {
            const errData = await response.json();
            throw new Error("Something went wrong" || errData.error);
        }

        const responseData = await response.json();

        const id = responseData.name;

        dispatch({ type: ADD_ORDER, orderData: { id: id, items: cartItems, amount: totalAmountPrice, date: date }});
    }
}