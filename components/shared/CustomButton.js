import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import Colors from '../../constants/Colors';

const CustomButton = ({buttonText, textStyle, buttonStyle, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{...styles.button, ...buttonStyle}}>
                <Text style={{...styles.text, ...textStyle}}>{buttonText}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        borderWidth: 2,
        padding: 12,
        backgroundColor: Colors.primary,
        margin: 10
    },
    text: {
        fontFamily: 'open-sans',
        textTransform: 'uppercase',
        color: 'white',
        fontSize: 15,
        textAlign: 'center'
    }
})
