import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, Layout} from '@ui-kitten/components';
import {ContributionGraph} from 'react-native-chart-kit';

const HomeScreen = () => {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const commitsData = [
    {date: '2023-10-02', count: 1},
    {date: '2023-10-03', count: 2},
    {date: '2023-10-04', count: 3},
    {date: '2023-10-05', count: 4},
    {date: '2023-10-06', count: 5},
    {date: '2023-10-30', count: 2},
    {date: '2023-10-31', count: 3},
    {date: '2023-10-01', count: 2},
    {date: '2023-10-02', count: 4},
    {date: '2023-10-05', count: 2},
    {date: '2023-10-30', count: 4},
  ];

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(220, 100, 100, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 0.5,
    decimalPlaces: 0,
  };

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('username');
        const value1: string | any = await AsyncStorage.getItem('fullName');
        const value2: string | any = await AsyncStorage.getItem('height');
        const value3: string | any = await AsyncStorage.getItem('weight');
        const value4: string | any = await AsyncStorage.getItem('age');
        const value5: string | any = await AsyncStorage.getItem('gender');
        if (value !== null) {
          setUsername(value);
          setFullName(value1);
          setHeight(value2);
          setWeight(value3);
          setAge(value4);
          setGender(value5);
          console.log(value, value1, value2, value3, value4, value5);
        }
      } catch (error) {
        console.log(error);
      }
    };
    retrieveData();
  }, []);

  return (
    <Layout style={styles.container}>
      <ScrollView style={styles.container}>
        <Layout style={styles.layout}>
          <Text style={styles.welcomeText}>Welcome, {fullName}</Text>
          <Text style={styles.infoText}>Username: {username}</Text>
          <Text style={styles.infoText}>Height: {height} cm</Text>
          <Text style={styles.infoText}>Weight: {weight} kg</Text>
          <Text style={styles.infoText}>Age: {age}</Text>
          <Text style={styles.infoText}>Gender: {gender}</Text>
        </Layout>
        <ContributionGraph
          values={commitsData}
          endDate={new Date('2023-10-29')}
          numDays={90}
          width={400}
          height={240}
          chartConfig={chartConfig}
        />
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    padding: 16,
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 8,
  },
});

export default HomeScreen;
