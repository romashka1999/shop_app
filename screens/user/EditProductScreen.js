import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { StyleSheet, View, ScrollView, Platform, Alert, KeyboardAvoidingView, Text } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';


import CustomHeaderButton from '../../components/shared/CustomHeaderButton';
import { createProduct, updateProduct } from '../../store/actions/products';
import Input from '../../components/shared/Input';
import Loading from '../../components/shared/Loading';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    switch (action.type) {
        case FORM_INPUT_UPDATE:
            const updatedValues = {
                ...state.inputValues,
                [action.input]: action.value
            }
            const updatedValidities = {
                ...state.inputValidities,
                [action.input]: action.isValid
            }
            let formIsValid = true;
            for (const key in updatedValidities) {
                formIsValid = formIsValid && updatedValidities[key];
            }
            return {
                ...state,
                inputValues: updatedValues,
                inputValidities: updatedValidities,
                formIsValid: formIsValid
            }
        default:
            return state;
    }
}

const EditProductScreen = ({navigation}) => {
    const [isLoading, setIsloading] = useState(false);
    const [error, setError] = useState(false);

    const productId = navigation.getParam('productId');
    const product = useSelector(state => state.products.userProducts.find(product => product.id === productId));

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: product ? product.title : '',
            imageUrl: product ? product.imageUrl : '',
            price: product ? product.price : '',
            description: product ? product.description : ''
        },
        inputValidities: {
            title: product ? true : false,
            imageUrl: product ? true : false,
            price: product ? true : false,
            description: product ? true : false
        },
        formIsValid: product ? true : false
    });

    const inputChangeHandler = useCallback((inputName, inputValue, inputValidity) => {
        dispatchFormState({type: FORM_INPUT_UPDATE, value: inputValue, isValid: inputValidity, input: inputName});
    }, [dispatchFormState]);

    useEffect(() => {
        if(error) {
            Alert.alert('An error occured', error, [
                {text: 'Okay'}
            ]);
        }
    }, [error]);


    const submitHandler = useCallback( async () => {
        if(!formState.formIsValid) {
            Alert.alert('Wrong Form', 'Please Check the errors in the form :)', [
                {text: 'Okay'}
            ]);
            return
        }
        setError(null);
        setIsloading(true);
        try {
            if(product) {
                await dispatch(updateProduct(
                    productId, 
                    formState.inputValues.title, 
                    formState.inputValues.description,
                    formState.inputValues.imageUrl
                ));
            } else {
                await dispatch(createProduct(
                    formState.inputValues.title, 
                    formState.inputValues.description,
                    formState.inputValues.imageUrl,
                    +formState.inputValues.price
                ));
            }
            navigation.goBack();
        } catch (error) {
            setError(error.message);
        }
        setIsloading(false);
    }, [dispatch, productId, formState]);

    useEffect(() => {
        navigation.setParams({submit: submitHandler});
    }, [submitHandler]);

    if(isLoading) {
        return(
            <Loading />
        );
    }

    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior="padding"
            keyboardVerticalOffset={100}>
            <ScrollView>
                <View style={styles.form}>
                    <Input 
                        id="title"
                        label="Title"
                        errorText="Please Enter a valid Title"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        returnKeyType="next"
                        required
                        initialValue={product ? product.title : ''}
                        initiallyValid={!!product}
                        onInputChange={inputChangeHandler}/>
                    <Input 
                        id="imageUrl"
                        label="Image Url"
                        errorText="Please Enter a valid Image Url"
                        keyboardType="default"
                        returnKeyType="next"
                        required
                        initialValue={product ? product.imageUrl : ''}
                        initiallyValid={!!product}
                        onInputChange={inputChangeHandler}/>
                    {product ? null : (
                        <Input 
                            id="price"
                            label="Price"
                            errorText="Please Enter a valid Price"
                            keyboardType="decimal-pad"
                            returnKeyType="next"
                            required
                            min={0.1}
                            onInputChange={inputChangeHandler}/>
                    )}
                    <Input 
                        id="description"
                        label="Description"
                        errorText="Please Enter a valid Description"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        multiline
                        numberOfLines={3}
                        required
                        minLength={7}
                        initialValue={product ? product.description : ''}
                        initiallyValid={!!product}
                        onInputChange={inputChangeHandler}/>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
    }
})
