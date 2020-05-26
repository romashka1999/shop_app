import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = ({onDelete, quantity, title, amount, deletable}) => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{quantity} </Text>
                <Text style={styles.title}>{title.length >= 12 ? title.slice(0, 12) + '...' : title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.amount}>${amount.toFixed(2)}</Text>
                {deletable && 
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={onDelete}>
                        <Ionicons 
                            size={30}
                            color='red'
                            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}/>
                    </TouchableOpacity> 
                }
            </View>
        </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white', 
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888', 
        fontSize: 16,
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    amount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    deleteButton: {
        marginLeft: 20,
    }
});
