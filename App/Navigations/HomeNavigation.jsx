import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeView from '../Views/HomeView/HomeView';
import BusinessListByCategoryScreen from '../Views/BusinessListByCategoryView/BusinessListByCategoryScreen';
import BusinessDetailView from '../Views/BusinessDetailView/BusinessDetailView';
import ClaimsViewAll from '../Views/ClaimsView/ClaimsViewAll';
import ClaimsViewOne from '../Views/ClaimsView/ClaimsViewOne';
import ComplaintsViewAll from '../Views/ComplaintsView/ComplaintsViewAll';
import ComplaintsViewOne from '../Views/ComplaintsView/ComplaintsViewOne';

const Stack = createStackNavigator();

export default function HomeNavigation({ route }) {
    const { token } = route.params || null;
    const { data } = route.params || null;  
    return (
        <Stack.Navigator screenOptions={{
            headerShown:false
        }}>
            <Stack.Screen name='home' component={HomeView} initialParams={{ token, data}} />
            <Stack.Screen name='business-list' component={BusinessListByCategoryScreen} initialParams={{ token, data }} />
            <Stack.Screen name='business-detail' component={BusinessDetailView} />
            <Stack.Screen name='claims' component={ClaimsViewAll} />
            <Stack.Screen name='claim-detail' component={ClaimsViewOne} />
            <Stack.Screen name='complaints' component={ComplaintsViewAll} />
            <Stack.Screen name='complaint-detail' component={ComplaintsViewOne} />
        </Stack.Navigator>
    )
}