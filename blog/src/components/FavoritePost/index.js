import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';

// Select a device screen dimension
const { width: WIDTH } = Dimensions.get('window');

export default FavoritePost = ({ data, favorite }) => {
    const navigation = useNavigation();

    const handleNavigate = () => {
        navigation.navigate("Detail", { id: data.id });
    }

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.9}
            onPress={handleNavigate}
            onLongPress={favorite}
        >
            <ImageBackground
                style={styles.cover}
                source={{ uri: `http://IPv4:1337${data?.attributes?.cover?.data?.attributes?.url}`}}
                resizeMode="cover"
                blurRadius={3} // opcaity for image
                imageStyle={{ borderRadius: 6, opacity: 0.4 }}
            >
                <Text style={styles.title} numberOfLines={1}>
                    {data?.attributes?.title}
                </Text>
            </ImageBackground>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        marginStart: -8,
        marginVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    cover: {
        width: WIDTH - 60,
        height: 100,
        borderRadius: 4,
        justifyContent: 'flex-end',
        backgroundColor: '#232630'
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#FFF',
        paddingVertical: 8,
        paddingHorizontal: 12,
        textShadowColor: '#121212', // shadow
        textShadowOffset: { width: 2, height: 1 },
        textShadowRadius: 8
    }
});