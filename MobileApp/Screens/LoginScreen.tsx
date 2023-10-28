import { View, Text } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthStackParamList } from '../App'
import { Button } from '@ui-kitten/components'

type Props = NativeStackScreenProps<AuthStackParamList, 'LOGIN'>

const LoginScreen = ({navigation}:Props) => {
  return (
    <View style={{flex:1}}>
      {/* <Text className='h-52 text-red-600'>LoginScreen</Text>
      <Text className='h-52'>LoginScreen</Text>
      <Text className='h-52'>LoginScreen</Text> */}
      <Button onPress={() => navigation.replace('APP')}>abutth</Button>
    </View>
  )
}

export default LoginScreen