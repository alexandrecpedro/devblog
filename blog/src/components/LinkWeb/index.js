import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default LinkWeb = ({ link, title, closeModal }) => {
    return (
        <>
            <TouchableOpacity 
                style={styles.button}
                onPress={closeModal}
            >
                <Feather name='x' size={25} color="#FFF"/>
                <Text style={styles.name}>{title}</Text>
            </TouchableOpacity>
            <WebView
                source={{ uri: link }} 
            />
        </>
    )
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#232630',
        padding: 10,
        marginTop: 60,
        flexDirection: 'row',
        alignItems: 'center'
    },
    name: {
        color: '#FFF',
        marginStart: 8,
        fontSize: 18,
        fontWeight: 'bold'
    }
});