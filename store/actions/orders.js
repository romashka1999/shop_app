import Order from '../../models/Order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
    return async dispatch => {
        const response = await fetch('https://shop-app-ea6db.firebaseio.com/orders/u1.json');
        
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
    return async dispatch => {
        const date = new Date();
        const response = await fetch('https://shop-app-ea6db.firebaseio.com/orders/u1.json', {
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
            throw new Error("Something went wrong");
        }

        const responseData = await response.json();

        const id = responseData.name;

        dispatch({ type: ADD_ORDER, orderData: { id: id, items: cartItems, amount: totalAmountPrice, date: date }});
    }
}