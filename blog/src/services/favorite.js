import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

// Search the favorited categories
export const getFavorite = async (category) => {
    const data = await AsyncStorage.getItem('@favCategory');
    if (data !== null) {
        // found a category
        const response = await api.get(`http://IPv4:1337/api/categories/${data}?fileds=name&populate=posts,posts.cover`);
        return response.data?.data?.attributes?.posts?.data
    } else {
        return [];
    }
}

// Favorite a category
export const setFavorite = async (category) => {
    // save on AsyncStorage
    await AsyncStorage.setItem('@favCategory', String(category));
    // search and show on screen
    const response = await getFavorite();
    return response;
}