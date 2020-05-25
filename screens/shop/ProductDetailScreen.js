import React from 'react'
import { ScrollView ,StyleSheet, Text, View, Image} from 'react-native'
import { useSelector, useDispatch } from 'react-redux';

import CustomButton from '../../components/shared/CustomButton';
import { addToCart } from '../../store/actions/cart';

const ProductDetailScreen = ({navigation}) => {
    const productId = navigation.getParam('productId');
    const product = useSelector(state => state.products.availableProducts.find(product => product.id === productId));

    const dispatch = useDispatch();

    const addToCartHandler = () => {
        dispatch(addToCart(product));
    }

    return (
        <ScrollView>
            <Image 
                style={styles.image}
                source={{uri: product.imageUrl}}/>
            <CustomButton 
                buttonStyle={{marginTop: '7%', width: '70%', alignSelf: 'center'}}
                buttonText="add to cart"
                onPress={addToCartHandler}/>
            <View style={styles.detail}>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                <Text style={styles.description}>{product.description}</Text>
            </View>
        </ScrollView>
    )
}

ProductDetailScreen.navigationOptions = (navigationData) => {
    const { navigation } = navigationData;
    const title = navigation.getParam('productTitle');

    return {
        headerTitle: title
    }
}

export default ProductDetailScreen

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    detail: {
        width: '100%',
        paddingHorizontal: '10%'
    },
    price: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: '5%'
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: 'center',
    }
})
