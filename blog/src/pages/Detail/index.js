import { Entypo, Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Image, Modal, SafeAreaView, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinkWeb from '../../components/LinkWeb';
import api from '../../services/api';

export default function Detail({}) {
    const route = useRoute();
    const navigation = useNavigation();

    const [post, setPost] = useState({});
    const [links, setLinks] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [openLink, setOpenLink] = useState({});

    useEffect(() => {
        const getPost = async () => {
            const response = await api.get(`api/posts/${route.params?.id}?populate=cover,category,Options`);
            setPost(response.data.data);
            setLinks(response.data?.data?.attributes?.Options);
        }
        getPost();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={handleShare}>
                    <Entypo name="share" size={25} color="#FFF" />
                </TouchableOpacity>
            )
        });
    }, [navigation, post])

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: `
                Take a look at this post: ${post?.attributes?.title}
                ${post?.attributes?.description}
                I have seen at devpost app!
                `
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log("ACTIVITY TYPE");
                } else {
                    console.log("SHARED WITH SUCCESS");
                }
            } else if (result.action === Share.dismissedAction) {
                console.log("CLOSED MODAL");
            }
        } catch (error) {
            console.log("ERROR");
        }
    }

    const handleOpenLink = (link) => {
        setModalVisible(true);
        setOpenLink(link);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image 
                style={styles.cover}
                source={{ uri: `http://IPv4:1337${post?.attributes?.cover?.data?.attributes?.url}` }}
                resizeMode='cover'
            />
            
            <Text style={styles.title}>
                {post?.attributes?.title}
            </Text>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                

                <Text style={styles.description}>
                    {post?.attributes?.description}
                </Text>

                {links.length > 0 && (
                    <Text style={styles.subtitle}>Links</Text>
                )}

                {links.map(link => (
                    <TouchableOpacity
                        key={link.id}
                        style={styles.linkButton}
                        onPress={() => handleOpenLink(link)}
                    >
                        <Feather name='link' color="#1E4687" size={14} />
                        <Text style={styles.linkText}>{link.name}</Text>
                    </TouchableOpacity>
                ))}

            </ScrollView>

            <Modal animationType='slide' visible={modalVisible} transparent={true}>
                <LinkWeb 
                    link={openLink?.url}
                    title={openLink?.name}
                    closeModal={() => setModalVisible(false)}
                />
            </Modal>
            {/* <TouchableOpacity>
                <View style={styles.container}>
                    <Text>Post details Page</Text>
                    <Text>{route.params?.id}</Text>
                </View>
            </TouchableOpacity> */}
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1, // view occupies full screen
      backgroundColor: '#FFF'
    },
    cover: {
        width: '100%',
        height: 230
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 14,
        marginTop: 18,
        paddingHorizontal: 12
    },
    content: {
        paddingHorizontal: 12
    },
    description: {
        lineHeight: 20
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
        marginTop: 14
    },
    linkButton: {
        flexDirection: 'row', // icon and text at the same line
        alignItems: 'center',
        marginBottom: 8
    },
    linkText: {
        color: '#1E4687',
        fontSize: 16,
        marginStart: 6
    }
})