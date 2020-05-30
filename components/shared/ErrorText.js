import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Colors from '../../constants/Colors'
import CustomButton from './CustomButton';

const ErrorText = ({text, onPress}) => {
    return (
        <View style={styles.centered}>
            <Text style={{color: Colors.primary}}>{text}</Text>
            <CustomButton 
                buttonText="Try Again"
                onPress={onPress}/>
        </View>
    )
}

export default ErrorText

const styles = StyleSheet.create({
    centered: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})
