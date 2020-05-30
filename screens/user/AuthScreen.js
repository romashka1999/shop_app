import React, { useReducer, useCallback, useState } from 'react'
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import Input from '../../components/shared/Input';
import CustomButton from '../../components/shared/CustomButton';
import Colors from '../../constants/Colors';
import { signUp, signIn } from '../../store/actions/auth';


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

const AuthScreen = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });

    const authHandler = () => {
        if(isSignUp) {
            dispatch(signUp(
                formState.inputValues.email,
                formState.inputValues.password
            ));
        } else {
            dispatch(signIn(
                formState.inputValues.email,
                formState.inputValues.password
            ));
        }
    }

    const inputChangeHandler = useCallback((inputName, inputValue, inputValidity) => {
        dispatchFormState({type: FORM_INPUT_UPDATE, value: inputValue, isValid: inputValidity, input: inputName});
    }, [dispatchFormState]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={50}
            style={styles.screen}>
            <LinearGradient
                style={styles.gradient}
                colors={[Colors.accent, Colors.primary]}>
            <View style={styles.authContainer}>
                <ScrollView
                    style={{width: '100%'}}>
                    <Input 
                        id="email"
                        label="E-mail"
                        keyboardType='email-address'
                        required
                        email
                        autoCapitalize="none"
                        errorText="Please Enter Valid Email"
                        onInputChange={inputChangeHandler}
                        initialValue=""/>
                    <Input 
                        id="password"
                        label="Password"
                        keyboardType='default'
                        secureTextEntry
                        required
                        minLength={8}
                        autoCapitalize="none"
                        errorText="Please Enter Valid Password"
                        onInputChange={inputChangeHandler}
                        initialValue=""/>
                    <CustomButton 
                        buttonText={isSignUp ? 'sign up': 'sign in'}
                        onPress={authHandler}/>
                    <CustomButton 
                        buttonStyle={{backgroundColor: Colors.accent }}
                        textStyle={{color: 'black' }}
                        buttonText="switch"
                        onPress={() => {setIsSignUp(currentState => !currentState)}}/>
                </ScrollView>
            </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

export default AuthScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    authContainer: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 10,
        borderRadius: 10,
        backgroundColor: '#ffefd5',
        margin: 4,
        padding: 20,
        alignItems: 'center',
        width: '80%',
    },
    gradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
