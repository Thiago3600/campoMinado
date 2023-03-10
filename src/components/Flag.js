import React from 'react';
import {View, StyleSheet} from 'react-native'

export default props => {
    return (
        <View style={styles.container}>
            <View style={[styles.flagPole, props.bigger ? styles.flagPoleB : null ]} />
            <View style={[styles.flag, props.bigger ? styles.flagB : null ]} />
            <View style={[styles.flagBase1, props.bigger ? styles.flagBase1B : null] } />
            <View style={[styles.flagBase2, props.bigger ? styles.flagBase2B : null] } />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginVertical: 4,
        marginHorizontal: 3     
    },
    flagPole:{
        position: 'absolute',
        height: 14,
        width: 2,
        backgroundColor: '#222',
        marginLeft: 9,
    },
    flag:{
        position: 'absolute',
        height: 7,
        width: 9,        
        backgroundColor: '#F22'
    },
    flagBase1:{
        position: 'absolute',
        height: 2,
        width: 6,
        backgroundColor: '#222',
        marginLeft: 7,
        marginTop: 10,
    },
    flagBase2:{
        position: 'absolute',
        height: 2,
        width: 10,
        backgroundColor: '#222',
        marginLeft: 5,
        marginTop: 12,
    },

    flagPoleB:{
        height: 28,
        width: 4,
        marginLeft: 16,
    },
    flagB:{
        height: 10,
        width: 14,        
        marginLeft: 3,
    },
    flagBase1B:{
        height: 4,
        width: 15,
        marginLeft: 10,
        marginTop: 20,
    },
    flagBase2B:{
        height: 4,
        width: 20,
        marginLeft: 8,
        marginTop: 24,
    }
})