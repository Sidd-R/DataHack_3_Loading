import {StyleSheet, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../App';
import {Button, Layout, Text} from '@ui-kitten/components';
import {InputPassword, InputText} from '../Components/Input';

type Props = NativeStackScreenProps<AuthStackParamList, 'LOGIN'>;

const LoginScreen = ({navigation}: Props) => {
  const [username, setUsername] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [age, setAge] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignUp = () => {
    AsyncStorage.setItem('username', username);
    AsyncStorage.setItem('fullName', fullName);
    AsyncStorage.setItem('height', height);
    AsyncStorage.setItem('weight', weight);
    AsyncStorage.setItem('age', age);
    AsyncStorage.setItem('gender', gender);
    navigation.navigate('APP');
  };
  return (
    <ScrollView style={{flex:1}}>
      <Layout style={styles.container}>
        <Text category="h1" style={{marginBottom: 10}}>
          FitBuddy
        </Text>
        <InputText
          label="Username"
          placeholder="Enter your user name"
          changeFunction={setUsername}
          variable={username}
        />
        <InputText
          label="Full Name"
          placeholder="Enter your full name"
          changeFunction={setFullName}
          variable={fullName}
        />
        <InputText
          label="Height (in cms)"
          placeholder="Enter your height"
          changeFunction={setHeight}
          variable={height}
        />
        <InputText
          label="Weight (in kgs)"
          placeholder="Enter your weight"
          changeFunction={setWeight}
          variable={weight}
        />
        <InputText
          label="Age"
          placeholder="Enter your age"
          changeFunction={setAge}
          variable={age}
        />
        <InputText
          label="Gender"
          placeholder="Enter your gender"
          changeFunction={setGender}
          variable={gender}
        />
        <InputPassword />
        <Button style={styles.button} onPress={handleSignUp}>
          Sign Up
        </Button>
      </Layout>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    paddingLeft: 24,
    paddingRight: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 12,
    width: '100%',
    backgroundColor: '#0F67FE',
    fontSize: 16,
    fontWeight: 700,
  },
});
