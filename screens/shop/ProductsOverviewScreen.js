import React, { useState, useEffect, useCallback } from 'react'
import { FlatList, Platform, View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import { addToCart } from '../../store/actions/cart';
import { fetchProducts } from '../../store/actions/products';
import CustomHeaderButton from '../../components/shared/CustomHeaderButton';
import CustomButton from '../../components/shared/CustomButton';
import Loading from '../../components/shared/Loading';
import ErrorText from '../../components/shared/ErrorText';

const ProductsOverviewScreen = ({navigation}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.availableProducts);

    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(fetchProducts());
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        const willFocusSub = navigation.addListener('willFocus', loadProducts);
        return () => {
            willFocusSub.remove();
        }
    }, [loadProducts])

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const addToCartHandler = (product) => {
        dispatch(addToCart(product));
    }

    const viewDetailHandler = (product) => {
        navigation.navigate({routeName: 'ProductDetail', params: {
            productId: product.id,
            productTitle: product.title
        }});
    }

    if(error) {
        return(
            <ErrorText 
                onPress={loadProducts}
                text={`error occured: ${error}`}/>
        )
    }

    if(isLoading) {
        return <Loading />
    }

    if(!isLoading && products.length === 0) {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>No Products Found</Text>
            </View>
        );
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
                    onSelect={() => viewDetailHandler(itemData.item)}>
                    <CustomButton 
                        buttonText="view details"
                        onPress={() => viewDetailHandler(itemData.item)}/>
                    <CustomButton 
                        buttonText="add to cart"
                        onPress={() => addToCartHandler(itemData.item)}/>
                </ProductItem>        
            )}/>
    )
}

ProductsOverviewScreen.navigationOptions = (navigationData) => {
    const { navigation } = navigationData;
    return {
        headerTitle: 'All Products',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title="Cart"
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => navigation.navigate({routeName: 'Cart'})}/>
            </HeaderButtons>
        ),
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

export default ProductsOverviewScreen;


