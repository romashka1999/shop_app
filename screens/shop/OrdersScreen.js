import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, View, FlatList, Platform, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/shared/CustomHeaderButton';
import Loading from '../../components/shared/Loading';
import OrderItem from '../../components/shop/OrderItem';
import { fetchOrders } from '../../store/actions/orders';

const OrdersScreen = ({navigation}) => {
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const loadOrders = useCallback(async () => {
        try {
            setError(null);
            setIsLoading(true);
            await dispatch(fetchOrders());
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
        }
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        const willFocusSub = navigation.addListener('willFocus', loadOrders);
        return () => {
            willFocusSub.remove();
        }
    }, [loadOrders])

    useEffect(() => {
        loadOrders();
    }, [loadOrders]);


    if(isLoading) {
        return <Loading />
    }

    if(!isLoading && orders.length === 0) {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>No Orders Found</Text>
            </View>
        );
    }

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
