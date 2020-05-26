import React from 'react'
import { StyleSheet, Text, View, FlatList, Platform } from 'react-native'
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/shared/CustomHeaderButton';
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = () => {
    const orders = useSelector(state => state.orders.orders);
    
    return (
        <View>
            <FlatList 
                keyExtractor={item => item.id}
                data={orders}
                renderItem={(itemData) => (
                    <OrderItem 
                        cartItmes={itemData.item.items}
                        amount={itemData.item.totalAmount}
                        date={itemData.item.stringDate}/>
                )}/>
        </View>
    )
}

OrdersScreen.navigationOptions = (navigationData) => {
    const { navigation } = navigationData;
    return  {
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => navigation.toggleDrawer()}/>
            </HeaderButtons>
        )
    }
}

export default OrdersScreen

const styles = StyleSheet.create({})
