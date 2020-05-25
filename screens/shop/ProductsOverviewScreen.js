import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = (props) => {

    const products = useSelector(state => state.products.availableProducts);

    const addToCartHandler = () => {

    }

    const viewDetailHandler = () => {
        
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
                    onAddToCart={addToCartHandler}
                    onViewDetail={viewDetailHandler}/>
            )}/>
    )
}

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'All Products',
}

export default ProductsOverviewScreen;

const styles = StyleSheet.create({})
