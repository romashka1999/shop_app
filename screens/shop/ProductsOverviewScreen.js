import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = ({navigation}) => {

    const products = useSelector(state => state.products.availableProducts);

    const addToCartHandler = () => {

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
                    onAddToCart={() => addToCartHandler}
                    onViewDetail={() => viewDetailHandler(itemData.item)}/>
            )}/>
    )
}

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products',
}

export default ProductsOverviewScreen;

const styles = StyleSheet.create({})
