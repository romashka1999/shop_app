import React, { useEffect } from 'react'
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';


import { authenticate } from '../store/actions/auth';
import Loading from '../components/shared/Loading';

const StartupScreen = ({navigation}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userDataString = await AsyncStorage.getItem('userData');

            if(!userDataString) {
                navigation.navigate('Auth');
                return;
            }
            const userData = JSON.parse(userDataString);
            const { token, userId, expirationDate } = userData;
            const expDate = new Date(expirationDate);

            if(expDate <= new Date() || !token || !userId) {
                navigation.navigate('Auth');
                return;
            }   

            const expirationTime = expDate.getTime() - new Date().getTime();

            navigation.navigate('Shop');
            dispatch(authenticate(userId, token, expirationTime));
        }
        tryLogin();
    }, [])
    return (
        <View style={styles.screen}>
            <Loading />
        </View>
    )
}

export default StartupScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
