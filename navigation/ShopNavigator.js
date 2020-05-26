import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import Colors from '../constants/Colors';

const defaultStackNavigationOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    headerTitleAlign: 'center',
    headerTitleStyle: {
        letterSpacing: 1,
        fontFamily: 'open-sans-bold'
    },
}   

const ProductsStackNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons 
                color={drawerConfig.tintColor}
                size={23}
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}/>
            )
    },
    defaultNavigationOptions: defaultStackNavigationOptions
});

const OrdersStackNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
        <Ionicons 
            color={drawerConfig.tintColor}
            size={23}
            name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}/>
        )
    },
    defaultNavigationOptions: defaultStackNavigationOptions
});


const ShopDrawerNavigator = createDrawerNavigator({
    Products: ProductsStackNavigator,
    Orders: OrdersStackNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
});

export default createAppContainer(ShopDrawerNavigator);