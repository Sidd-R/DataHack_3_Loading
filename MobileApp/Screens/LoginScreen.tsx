import {  StyleSheet, View } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackParamList } from '../App'
import { Button, Layout } from '@ui-kitten/components'
import { InputPassword, InputText } from '../Components/Input'

type Props = NativeStackScreenProps<AuthStackParamList, 'LOGIN'>

const LoginScreen = ({navigation}:Props) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <Layout style={styles.container}>
      <InputText />
      <InputPassword />
      <Button style={styles.button} onPress={() => navigation.replace('APP')}>Sign In</Button>
    </Layout>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    paddingLeft: 24,
    paddingRight: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F5F9',
  },
  button: {
    borderRadius: 12,
    width: '100%',
    backgroundColor: '#0F67FE',
    fontSize: 16,
    fontWeight: 700,
  },
});