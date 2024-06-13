import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeView from '../Views/HomeView/HomeView';
import BusinessListByCategoryScreen from '../Views/BusinessListByCategoryView/BusinessListByCategoryScreen';
import BusinessDetailView from '../Views/BusinessDetailView/BusinessDetailView';

const Stack = createStackNavigator();
export default function HomeNavigation() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown:false
        }}>
            <Stack.Screen name='home' component={HomeView} />
            <Stack.Screen name='business-list' component={BusinessListByCategoryScreen} />
            <Stack.Screen name='business-detail' component={BusinessDetailView} />
        </Stack.Navigator>
    )
}