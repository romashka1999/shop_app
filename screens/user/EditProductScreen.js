import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';


import CustomHeaderButton from '../../components/shared/CustomHeaderButton';
import { createProduct, updateProduct } from '../../store/actions/products';

const EditProductScreen = ({navigation}) => {
    const productId = navigation.getParam('productId');
    const product = useSelector(state => state.products.userProducts.find(product => product.id === productId));

    const dispatch = useDispatch();

    const [title, setTitle] = useState(product ? product.title : '');
    const [imageUrl, setImageUrl] = useState(product ? product.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(product ? product.description : '');

    

    const submitHandler = useCallback(() => {
        if(product) {
            dispatch(updateProduct(productId, title, description, imageUrl));
        } else {
            dispatch(createProduct(title, description, imageUrl, +price));
        }
        navigation.goBack();
    }, [dispatch, productId, title, description, imageUrl, price]);

    useEffect(() => {
        navigation.setParams({submit: submitHandler});
    }, [submitHandler])

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput 
                        style={styles.input}
                        value={title}
                        onChangeText={text => setTitle(text)}/>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image Url</Text>
                    <TextInput 
                        style={styles.input}
                        value={imageUrl}
                        onChangeText={text => setImageUrl(text)}/>
                </View>
                {product ? null : <View style={styles.formControl}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput 
                        style={styles.input}
                        value={price}
                        onChangeText={text => setPrice(text)}/>
                </View>}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput 
                        style={styles.input}
                        value={description}
                        onChangeText={text => setDescription(text)}/>
                </View>
            </View>
        </ScrollView>
    )
}

EditProductScreen.navigationOptions = (navigationData) => {
    const { navigation } = navigationData;
    const submitFn = navigation.getParam('submit');
    return {
        headerTitle: navigation.getParam('productId') ? 'Edit product' : 'Add product',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title="Cart"
                    iconName={Platform.OS === 'android' ? 'md-save' : 'ios-save'}
                    onPress={submitFn}/>
            </HeaderButtons>
        )
    }
}

export default EditProductScreen

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    formControl: {
        width: '100%',
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
})
