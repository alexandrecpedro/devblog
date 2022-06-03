import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default CategoryItem = ({ data, favorite }) => {
    const navigation = useNavigation();

    const handleNavigate = () => {
        navigation.navigate("Category", { id: data.id, title: data?.attributes?.name });
    }

    return (
        <TouchableOpacity 
            style={styles.container}
            activeOpacity={0.9}
            onPress={handleNavigate}
            onLongPress={favorite}
        >
            <Image
                style={styles.icon}
                source={{ uri: `http://IPv4:1337${data?.attributes?.icon?.data?.attributes?.url}`}}
            />
            <Text style={styles.name}>{data?.attributes?.name}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        marginStart: 8,
        marginVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    icon: {
        width: 40,
        height: 40
    }
});