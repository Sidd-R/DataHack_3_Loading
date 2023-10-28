import {View, StyleSheet, ScrollView, Image} from 'react-native';
import React from 'react';
import {Layout, Button, Text} from '@ui-kitten/components';

const ExcerisesScreen = () => {
  return (
    <ScrollView>
      <Layout style={styles.exercisesScreen} level='1'>
        <Layout level='2' style={styles.exceriseCard}>
          <Layout level='2' style={{width:'50%'}}>
            <Text style={styles.text}>Bicep Curl</Text>
            <Button style={styles.button}>
              <Text style={styles.text}>START</Text>
            </Button>
          </Layout>
          <Image style={styles.image} source={require('../images/bicep_curl.jpg')} /> 
        </Layout>
        <Layout level='2' style={styles.exceriseCard}>
          <Layout level='2' style={{width:'50%'}}>
            <Text style={styles.text}>Squats</Text>
            <Button style={styles.button}>
              <Text style={styles.text}>START</Text>
            </Button>
          </Layout>
          <Image style={styles.image} source={require('../images/squats.jpg')} /> 
        </Layout>
        <Layout level='2' style={styles.exceriseCard}>
          <Layout level='2' style={{width:'50%'}}>
            <Text style={styles.text}>Push-Ups</Text>
            <Button style={styles.button}>
              <Text style={styles.text}>START</Text>
            </Button>
          </Layout>
          <Image style={styles.image} source={require('../images/push-ups.jpg')} /> 
        </Layout>
        <Layout level='2' style={styles.exceriseCard}>
          <Layout level='2' style={{width:'50%'}}>
            <Text style={styles.text}>Shoulder Press</Text>
            <Button style={styles.button}>
              <Text style={styles.text}>START</Text>
            </Button>
          </Layout>
          <Image style={styles.image} source={require('../images/shoulder-press.jpg')} /> 
        </Layout>
        <Layout level='2' style={styles.exceriseCard}>
          <Layout level='2' style={{width:'50%'}}>
            <Text style={styles.text}>Lunges</Text>
            <Button style={styles.button}>
              <Text style={styles.text}>START</Text>
            </Button>
          </Layout>
          <Image style={styles.image} source={require('../images/lunges.jpg')} /> 
        </Layout>
      </Layout>
    </ScrollView>
  );
};

export default ExcerisesScreen;

const styles = StyleSheet.create({
  exercisesScreen: {
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 10,
    alignItems: 'center',
  },
  image: {
    borderRadius: 8,
    width: 100,
    height: 100,
  },
  exceriseCard: {
    borderRadius: 12,
    padding: 12,
    width: '100%',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 5,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '900',
  },
  button: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
    width: '80%',
  },
});
