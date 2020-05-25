import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';

import Colors from '../constants/Colors';

const ProductsStackNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitleAlign: 'center',
        headerTitleStyle: {
            letterSpacing: 1
        }
    }
});

export default createAppContainer(ProductsStackNavigator);