import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Search from './pages/Search';
import CategoryPosts from './pages/CategoryPosts';

const Stack = createNativeStackNavigator();

export default Routes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Home'
                component={Home}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen 
                name='Detail'
                component={Detail}
                options={{
                    title: 'Details',
                    headerTintColor: '#FFF',
                    headerStyle: {
                        backgroundColor: '#232630'
                    }
                }}
            />

            <Stack.Screen 
                name='Category'
                component={CategoryPosts}
                options={{
                    title: 'Category',
                    headerTintColor: '#FFF',
                    headerStyle: {
                        backgroundColor: '#232630'
                    }
                }}
            />

            <Stack.Screen 
                name='Search'
                component={Search}
                options={{
                    title: 'Searching something?',
                    headerTintColor: '#FFF',
                    headerStyle: {
                        backgroundColor: '#232630'
                    }
                }}
            />
        </Stack.Navigator>
    )
}