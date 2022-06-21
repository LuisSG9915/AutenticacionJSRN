import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';

const HomeScreen = () => {
  const {
    userInfo,
    isLoading,
    logout,
    nologeo,
    userToken,
    strings,
    setstrings,
    letter,
  } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      {/* <Text style={styles.welcome}>Welcome {typeof userInfo}</Text> */}
      <Text style={styles.welcome}>Welcome "{userInfo.role}" </Text>
      <Text style={styles.welcome}>Welcome "{strings}" </Text>
      <Text style={styles.welcome}>Welcome "{letter}" </Text>
      <Button
        title="Logout"
        color="red"
        onPress={() => {
          logout();
        }}
      />
      <Button
        title="a"
        onPress={() => {
          setstrings('jijijaja');
        }}></Button>
      <Button
        onPress={() => {
          console.log(userInfo);
        }}
        title={'ss'}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default HomeScreen;
