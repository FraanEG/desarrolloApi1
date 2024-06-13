import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native'
import React from 'react'
import HomeView from '../Views/HomeView/HomeView';
import ProfileView from '../Views/ProfileView/ProfileView'
import BookingView from '../Views/BookingView/BookingView'
import ComplaintsView from '../Views/ComplaintsView/ComplaintsView'
import ClaimsView from '../Views/ClaimsView/ClaimsView'
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '../Utils/Colors';
import HomeNavigation from './HomeNavigation';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{ 
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY
    }}>
        <Tab.Screen name='home' component={HomeNavigation} options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color,fontSize:12,marginTop:-7}}>Inicio</Text>
        ),
            tabBarIcon:({color, size})=>(
                <Entypo name="home" size={size} color={color}/>
        )
        }}/>
        <Tab.Screen name='booking' component={BookingView} options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color,fontSize:12,marginTop:-7}}>Reservas</Text>
        ),
            tabBarIcon:({color, size})=>(
                <FontAwesome name="book" size={size} color={color} />
        )
        }}/>
        <Tab.Screen name='claim' component={ClaimsView} options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color,fontSize:12,marginTop:-7}}>Reclamos</Text>
        ),
            tabBarIcon:({color, size})=>(
                <FontAwesome name="hand-paper-o" size={size} color={color} />
        )
        }}/>
        <Tab.Screen name='complaint' component={ComplaintsView} options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color,fontSize:12,marginTop:-7}}>Denuncias</Text>
        ),
            tabBarIcon:({color, size})=>(
                <FontAwesome name="exclamation" size={size} color={color} />
        )
        }}/>
        <Tab.Screen name='profile' component={ProfileView} options={{
            tabBarLabel:({color})=>(
                <Text style={{color:color,fontSize:12,marginTop:-7}}>Perfil</Text>
        ),
            tabBarIcon:({color, size})=>(
                <MaterialCommunityIcons name="account-details" size={size} color={color} />
        )
        }}/>
    </Tab.Navigator>
  )
}