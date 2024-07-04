import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './App/Views/LoginView/Login';
import LoginUser from './App/Views/LoginView/LoginUser';
import LoginInspector from './App/Views/LoginView/LoginInspector';
import * as SecureStore from "expo-secure-store";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import TabNavigation from './App/Navigations/TabNavigation';
import Category from './App/Views/HomeView/Category';
import Categories from './App/Views/HomeView/Categories';

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const Stack = createStackNavigator();

export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'outfit-regular': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-Medium.ttf'),
  });

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{
            headerShown:false
        }}>
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="loginUser" component={LoginUser} />
          <Stack.Screen name="loginInspector" component={LoginInspector} />
          <Stack.Screen name="homeView" component={TabNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
      <NavigationContainer>
    </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
