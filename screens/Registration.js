import React from 'react';
import { Text, View, TextInput, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';


const Registration = ({
    params,
}) => (
        <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='First Name'
          autoCapitalize="none"
          placeholderTextColor='white'
        />
        <TextInput
          style={styles.input}
          placeholder='Last Name'
          autoCapitalize="none"
          placeholderTextColor='white'
        />
        <TextInput
          style={styles.input}
          placeholder='ID Number'
          autoCapitalize="none"
          placeholderTextColor='white'
          keyboardType='number-pad'
        />
        <TextInput
          style={styles.input}
          placeholder='Access Level'
          autoCapitalize="none"
          placeholderTextColor='white'
          keyboardType='number-pad'
        />
        <View style={styles.buttonContainer}>
        <Button
          title='Photo'
          color='#00adb5'
          
          />
          </View>
      </View>
);

const styles = StyleSheet.create({
    input: {
      width: 350,
      height: 55,
      backgroundColor: '#393e46',
      margin: 10,
      padding: 8,
      color: 'white',
      borderRadius: 14,
      fontSize: 18,
      fontWeight: '500',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:"white"
    },
    buttonContainer:{
        marginTop:10
    }
  })

export default Registration;
