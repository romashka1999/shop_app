import React from 'react'
import { StyleSheet, FlatList, Platform } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../store/actions/cart';
import CustomHeaderButton from '../../components/shared/CustomHeaderButton';

const ProductsOverviewScreen = ({navigation}) => {

    const products = useSelector(state => state.products.availableProducts);

    const dispatch = useDispatch();

    const addToCartHandler = (product) => {
        dispatch(addToCart(product));
    }

    const viewDetailHandler = (product) => {
        navigation.navigate({routeName: 'ProductDetail', params: {
            productId: product.id,
            productTitle: product.title
        }});
    }

    return (
        <FlatList 
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => (
                <ProductItem 
                    imageUrl={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price.toFixed(2)}
                    onAddToCart={() => addToCartHandler(itemData.item)}
                    onViewDetail={() => viewDetailHandler(itemData.item)}/>
            )}/>
    )
}

ProductsOverviewScreen.navigationOptions = (navigationData) => {
    const { navigation } = navigationData;
    return {
        headerTitle: 'All Products',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title="Cart"
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => navigation.navigate({routeName: 'Cart'})}/>
            </HeaderButtons>
        )
    }
}

export default ProductsOverviewScreen;

const styles = StyleSheet.create({})
