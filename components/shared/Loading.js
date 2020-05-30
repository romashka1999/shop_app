import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import Colors from '../../constants/Colors'

const Loading = () => {
    return (
        <View style={styles.centered}>
            <ActivityIndicator 
                size='large'
                color={Colors.primary}/>
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    centered: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})
