import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = (email, password) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/register`, {
        email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        setIsLoading(false);
        console.log(userInfo);
      })
      .catch(e => {
        console.log(`register error ${e}`);
        setIsLoading(false);
      });
  };

  const login = (email, password) => {
    if (email.length > 0 || password.length > 0) {
      setIsLoading(true);
      axios
        .post(`${BASE_URL}/login`, {
          email,
          password,
        })
        .then(res => {
          // console.log(res);
          if (res.data.message == 'logeado') {
            let userInfo = res.data.usuario.role;
            setUserInfo(userInfo);

            console.log('usuario es:  ', userInfo);

            AsyncStorage.setItem('userInfo', userInfo);

            setIsLoading(false);
          } else {
            let userInfo = res.data.message;
            setUserInfo(userInfo);

            console.log('usuario es:  ', userInfo);

            AsyncStorage.setItem('userInfo', userInfo);

            setIsLoading(false);

            alert(userInfo);
          }
        })
        .catch(e => {
          console.log(`login error ${e}`);
          setIsLoading(false);
          // throw e;
        });
    } else {
      alert(
        'No se están recibiendo datos, favor de ingresar datos en los campos: "email" y "password"',
      );
    }
  };

  const logout = () => {
    setIsLoading(true);
    setUserInfo(null);
    AsyncStorage.removeItem('userInfo');
    console.log(userInfo);
    setIsLoading(false);
    // axios
    //   .post(
    //     `${BASE_URL}/logout`,
    //     {},
    //     {
    //       headers: {Authorization: `Bearer ${userInfo.access_token}`},
    //     },
    //   )
    //   .then(res => {
    //     console.log(res.data);
    //     AsyncStorage.removeItem('userInfo');
    //     setUserInfo({});
    //     setIsLoading(false);
    //   })
    //   .catch(e => {
    //     console.log(`logout error ${e}`);
    //     setIsLoading(false);
    //   });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      setUserInfo(userInfo);
      // userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
        setUser(userInfo);
        console.log('CONSOLE INFO', userInfo);
        // console.log('ROL INFO', userInfo.usuario.rol);

        // console.log('CONSOLE USUARIO', userInfo.email);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
        logeo,
        nologeo,
        strings,
        setstrings,
        letter,
        userToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
