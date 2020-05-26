import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import CustomButton from '../shared/CustomButton';
import CartItem from './CartItem';

const OrderItem = ({amount, date, cartItmes}) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>${amount.toFixed(2)}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
            <CustomButton 
                buttonStyle={{width: '50%'}}
                buttonText={showDetails ?  "hide details" :"show details"}
                onPress={() => {setShowDetails(prevState => !prevState)}}/>
            {showDetails && 
            
            <View style={styles.detailItems}>
                {cartItmes.map(cartItem => 
                    <CartItem
                        key={cartItem.id}
                        amount={cartItem.sum} 
                        quantity={cartItem.quantity} 
                        title={cartItem.title}/>)}
            </View>
            
            }
        </View>
    )
}

export default OrderItem

const styles = StyleSheet.create({
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 10,
        borderRadius: 10,
        backgroundColor: '#ffefd5',
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: '#888'
    }, 
    detailItems: {
        width: '100%'
    }
});
