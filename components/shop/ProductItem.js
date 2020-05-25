import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import CustomButton from '../shared/CustomButton';

const ProductItem = ({imageUrl, title, price, onViewDetail, onAddToCart}) => {
    return (
        <View style={styles.product}>
            <View style={styles.imageContainer}>
                <Image 
                    style={styles.image}
                    source={{uri: imageUrl}}/>
            </View>
            <View style={styles.details}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.price}>${price}</Text>
            </View>
            <View style={styles.actions}>
                <CustomButton 
                    buttonText="view details"
                    onPress={onViewDetail}/>
                <CustomButton 
                    buttonText="Add To Cart"
                    onPress={onAddToCart}/>
            </View>
        </View>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 350,
        margin: 20,
        borderRadius: 20,
        overflow: 'hidden'
    },
    imageContainer: {
        width: '100%',
        height: '60%'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },
    title: {
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
    }
})
