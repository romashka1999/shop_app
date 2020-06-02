import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerNavigatorItems} from 'react-navigation-drawer';
import { Platform, SafeAreaView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useDispatch } from 'react-redux';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import Colors from '../constants/Colors';
import CustomButton from '../components/shared/CustomButton';
import { logOut } from '../store/actions/auth';

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

const UsersStackNavigator = createStackNavigator({
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => (
        <Ionicons 
            color={drawerConfig.tintColor}
            size={23}
            name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}/>
        )
    },
    defaultNavigationOptions: defaultStackNavigationOptions
});

const ShopDrawerNavigator = createDrawerNavigator({
    Products: ProductsStackNavigator,
    Orders: OrdersStackNavigator,
    Users: UsersStackNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    },
    contentComponent: props => {
        const dispatch = useDispatch();
        return (
            <View style={{flex: 1, paddingTop: 27}}>
                <SafeAreaView 
                    forceInset={{top: 'always', horizontal: 'never'}}>
                    <DrawerNavigatorItems {...props}/>
                    <CustomButton
                        buttonStyle={{width: 120, alignSelf: 'center'}} 
                        buttonText="Logout"
                        onPress={() => {
                            dispatch(logOut);
                        }}/>
                </SafeAreaView>
            </View>
        )
    }
});

const AuthStackNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: defaultStackNavigationOptions
})

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthStackNavigator,
    Shop: ShopDrawerNavigator
});

export default createAppContainer(MainNavigator);