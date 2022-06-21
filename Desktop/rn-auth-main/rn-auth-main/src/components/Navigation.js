import React, {useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SplashScreen from '../screens/SplashScreen';
import {AuthContext} from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {userInfo, splashLoading, user, userToken} = useContext(AuthContext);
  const [logeado, setlogeado] = useState('');

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {splashLoading ? (
          <Stack.Screen
            name="Splash Screen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : userInfo == 'Admin' ? (
          // Si usertoken es diferente a nulo, entonces renderiza login

          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        ) : userInfo == 'normalUser' ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : userInfo == 'a' ? (
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
