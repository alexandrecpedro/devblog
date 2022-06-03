import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PostItem from '../../components/PostItem';
import api from '../../services/api';

export default function Search() {
    const [input, setInput] = useState('');
    const [posts, setPosts] = useState([]);
    const [empty, setEmpty] = useState(false);

    const handleSearchPost = async () => {
        if (input === '') {
            alert("Enter a desired post");
            return;
        }
        const response = await api.get(`api/posts?filters[title][$containsi]=${input}&populate=cover`);
        if (response.data?.data.length === 0) {
            setEmpty(true);
            setPosts([]);
            return;
        }
        setPosts(response.data?.data);
        setEmpty(false);
        setInput('');
        Keyboard.dismiss(); // close device keyboard
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerInput}>
                <TextInput
                    style={styles.input}
                    placeholder='What are you looking for?'
                    value={input}
                    onChangeText={(text) => setInput(text)}
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearchPost}>
                    <Feather name='search' size={25} color='#000' />
                </TouchableOpacity>
            </View>

            {empty && (
                <View>
                    <Text style={styles.emptyText}>Ops... no posts found</Text>
                </View>
            )}
            <FlatList 
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, paddingHorizontal: 18 }}
                data={posts}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <PostItem data={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1, // view occupies full screen
      backgroundColor: '#FFF',
      padding: 18,
    },
    containerInput: {
        flexDirection: 'row',
        width: '100%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    input: {
        width: '85%',
        backgroundColor: '#C4C4C4',
        height: 45,
        borderTopStartRadius: 4,
        borderBottomStartRadius: 4,
        padding: 8,
        fontSize: 16 
    },
    searchButton: {
        width: '15%',
        backgroundColor: '#C4C4C4',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopEndRadius: 4,
        borderBottomEndRadius: 4,
        marginStart: -1
    },
    emptyText: {
        textAlign: 'center'
    }
});