import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';

import CustomButton from '../../components/shared/CustomButton';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import { removeFromCart } from '../../store/actions/cart';
import { addOrder } from '../../store/actions/orders'

const CartScreen = () => {

    const cartTotalAmountPrice = useSelector(state => state.cart.totalAmountPrice);
    const cartItems = useSelector(state => {
        return Object.keys(state.cart.items).map(key => {
            return {...state.cart.items[key], id: key}
        });
    }).sort((a, b) => a.id > b.id ? 1 : -1);

    const dispatch = useDispatch();

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.sumaryText}>
                    Total: <Text style={styles.amount}>${Math.abs(cartTotalAmountPrice.toFixed(2))}</Text>
                </Text>
                <CustomButton 
                    disabled={cartItems.length===0}
                    buttonText="order now"
                    onPress={() => {
                        dispatch(addOrder(cartItems, cartTotalAmountPrice));
                    }}/>
            </View>
            <FlatList
                keyExtractor={item => item.id}
                data={cartItems}
                renderItem={(itemData) => (
                    <CartItem 
                        deletable={true}
                        title={itemData.item.title}
                        amount={itemData.item.sum}
                        quantity={itemData.item.quantity}
                        onDelete={() => {
                            dispatch(removeFromCart(itemData.item.id));
                        }}/>
                )}/>
            
        </View>
    )
}

export default CartScreen;

const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 10,
        borderRadius: 10,
        backgroundColor: '#ffefd5',
    },
    sumaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
    amount: {
        color: Colors.primary,
    }
});
