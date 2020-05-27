import React from 'react'
import { StyleSheet, View, FlatList, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';


import CustomHeaderButton from '../../components/shared/CustomHeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import CustomButton from '../../components/shared/CustomButton';
import { deleteProduct } from '../../store/actions/products';

const UserProductsScreen = ({navigation}) => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = (id) => {
        navigation.navigate({routeName: 'EditProduct', params: {
            productId: id
        }})
    }

    const deleteHandler = (id) => {
        Alert.alert('Are you Sure', 'Do you really want delete', [
            {text: 'No', style: 'default'},
            {text: 'Yes', style: 'destructive', onPress: () => {
                dispatch(deleteProduct(id));
            }}
        ])
    }

    return (
        <View>
            <FlatList 
                keyExtractor={item => item.id}
                data={userProducts}
                renderItem={(itemData) => (
                    <ProductItem 
                        imageUrl={itemData.item.imageUrl}
                        onSelect={() => {editProductHandler(itemData.item.id)}}
                        price={itemData.item.price}
                        title={itemData.item.title}>
                        <CustomButton 
                            buttonStyle={{width: 150}}
                            buttonText="edit"
                            onPress={() => {editProductHandler(itemData.item.id)}}/>
                        <CustomButton 
                            buttonStyle={{width: 150}}
                            buttonText="delete"
                            onPress={() => deleteHandler(itemData.item.id)}/>
                </ProductItem>  
                )}/>
        </View>
    )
}

UserProductsScreen.navigationOptions = (navigationData) => {
    const { navigation } = navigationData;
    return {
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title="Menu"
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => navigation.toggleDrawer()}/>
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item 
                    title="Save"
                    iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    onPress={() => {
                        navigation.navigate({routeName: 'EditProduct', params: {
                            productId: null
                        }});
                    }}/>
            </HeaderButtons>
        )
    }
}

export default UserProductsScreen

const styles = StyleSheet.create({})
