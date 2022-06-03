import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import CategoryItem from '../../components/CategoryItem';
import FavoritePost from '../../components/FavoritePost';
import PostItem from '../../components/PostItem';
import api from '../../services/api';
import { getFavorite, setFavorite } from '../../services/favorite';

// Animating category FlatList
const FlatListAnimated = Animatable.createAnimatableComponent(FlatList);

export default function Home() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [favCategory, setFavCategory] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // React Lifecycle => when open the app, search all categories
  useEffect(() => {
    const loadData = async () => {
      await getListPosts();
      const category = await api.get("/api/categories?populate=icon");
      setCategories(category.data.data);
    }

    loadData();
  }, []);

  // when open the app, just open favorited categories
  useEffect(() => {
    const favorite = async () => {
      const response = await getFavorite();
      setFavCategory(response);
    }
    favorite();
  }, []);

  const getListPosts = async () => {
    setLoading(true);
    const response = await api.get("/api/posts?populate=cover&sort=createdAt:desc");
    setPosts(response.data.data);
    setLoading(false);
  }

  // favorite category
  const handleFavorite = async (id) => {
    const response = await setFavorite(id);
    setFavCategory(response);
    // alert("Favorited category!");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Animatable.Text style={styles.name} animation='fadeInLeft' >DevBlog</Animatable.Text>
        
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <Feather name='search' size={24} color='#FFF' />
        </TouchableOpacity>
      </View>

      <FlatListAnimated
        animation='flipInX'
        delay={500} // miliseconds (ms) 
        showsHorizontalScrollIndicator={false} // no horizontal scroll icon on screen
        horizontal={true}
        contentContainerStyle={{ paddingEnd: 12 }}
        style={styles.categories}
        data={categories} // list
        keyExtractor={(item) => String(item.id)} // id
        renderItem={({ item }) => (
          <CategoryItem 
            data={item}
            favorite={() => handleFavorite(item.id)}
          /> 
        )} // what will be rendered on screen
      />

      {/* Favorite area */}
      <View style={styles.main}>
        {favCategory.length !== 0 && (
          <FlatList 
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{ marginTop: 50, maxHeight: 100, paddingStart: 18 }}
            data={favCategory}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <FavoritePost data={item} />} 
            contentContainerStyle={{ paddingEnd: 18 }}
          />
        )}

        <Text 
          style={[
            styles.title,
            { marginTop: favCategory.length > 0 ? 14 : 46 }
          ]}
        >High content</Text>

        <FlatList 
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, paddingHorizontal: 18 }}
          data={posts}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <PostItem data={item} />}
          refreshing={loading}
          onRefresh={() => getListPosts()}
        />

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // view occupies full screen,
    backgroundColor: '#232630'
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 24
  },
  name: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: 'bold'
  },
  categories: {
    maxHeight: 115,
    backgroundColor: '#EFEFEF',
    marginHorizontal: 18,
    borderRadius: 8,
    zIndex: 9 // all item should be above any component
  },
  main: {
    backgroundColor: '#FFF',
    flex: 1, // get the screen below too
    marginTop: -30
  },
  title: {
    fontSize: 21,
    paddingHorizontal: 18,
    marginBottom: 14,
    fontWeight: 'bold',
    color: '#162133'
  }
});