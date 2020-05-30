import React, { useReducer, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            }
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            }
        default:
            return state;
    }
}

const Input = ({id, label, errorText, initialValue, initiallyValid, required, email, min, max, minLength, onInputChange, ...props}) => {

    const [inputState, dispatchInputState] = useReducer(inputReducer, {
        value: initialValue ? initialValue: '',
        isValid: initiallyValid,
        touched: false
    });

    useEffect(() => {
        onInputChange(id, inputState.value, inputState.isValid);
    }, [inputState, id, onInputChange, dispatchInputState]);

    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (required && text.trim().length === 0) {
            isValid = false;
        }
        if (email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (min != null && +text < min) {
            isValid = false;
        }
        if (max != null && +text > max) {
            isValid = false;
        }
        if (minLength != null && text.length < minLength) {
            isValid = false;
        }
        dispatchInputState({ type: INPUT_CHANGE, value: text, isValid: isValid });
    }

    const lostFocusHandler = () => {
        dispatchInputState({ type: INPUT_BLUR });
    }   

    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{label}</Text>
            <TextInput 
                {...props}
                style={styles.input}
                value={inputState.value}
                onBlur={lostFocusHandler}
                onChangeText={textChangeHandler}/>
            {!inputState.isValid && inputState.touched && <Text style={styles.errorText}>{errorText}</Text>}
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
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
    },
    errorText: {
        fontFamily: 'open-sans-bold',
        color: 'red'
    }
})
