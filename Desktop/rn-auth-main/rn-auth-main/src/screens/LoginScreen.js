import React, {useContext, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  useRef,
  Share,
  Alert,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import ViewShot from 'react-native-view-shot';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const ref = React.useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {isLoading, login, userInfo, logout, user, logeo, userToken} =
    useContext(AuthContext);

  async function captureViewShot() {
    const imageURI = await ref.current.capture();
    Share.share({title: 'Image', url: imageURI});
  }

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />

      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Enter email"
          autoCapitalize="none"
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          // autoFocus={true}

          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        <Button
          title="Login"
          onPress={() => {
            login(email, password);
          }}
        />
        <Button onPress={logout} title={'ScreenShot'}></Button>
        <Button
          onPress={() => {
            console.log(userInfo);
          }}
          title={'ss'}></Button>

        <ViewShot ref={ref} options={{format: 'jpg', quality: 0.9}}>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>Register</Text>
            </TouchableOpacity>
          </View>
        </ViewShot>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '85%',
    backgroundColor: '#E6E6E6',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 5,
    shadowOpacity: 0.23,
    shadowRadius: 0,
    padding: 10,
  },
  input: {
    marginBottom: 12,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(208,208,208,0.3)',
    borderWidth: 1,
    borderRadius: 8,
  },
  link: {
    color: 'blue',
  },
});

export default LoginScreen;
