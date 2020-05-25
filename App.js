import React, { useState } from 'react'
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ShopNavigator from './navigation/ShopNavigator';

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
}

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer
});

const store = createStore(rootReducer);

const App = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    
    if(!fontsLoaded) {
        return <AppLoading 
                    startAsync={fetchFonts}
                    onFinish={() => setFontsLoaded(true)}/>
    }

    return (
        <Provider store={store}>
            <ShopNavigator />
        </Provider>
    )
}

export default App;

