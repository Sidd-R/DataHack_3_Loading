import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import React from 'react';
import {Layout, Button} from '@ui-kitten/components';

const ExcerisesScreen = () => {
  return (
    <ScrollView>
      <Layout style={styles.exercisesScreen}>
        <Layout style={styles.exceriseCard}>
          <Layout style={{backgroundColor: '#0F67FE', width:'50%'}}>
            <Text style={styles.text}>Bicep Curl</Text>
            <Button style={styles.button} status="success">
              <Text style={styles.text}>START</Text>
            </Button>
          </Layout>
          <Image style={styles.image} source={require('../images/bicep_curl.jpg')} /> 
        </Layout>
        <Layout style={styles.exceriseCard}>
          <Layout style={{backgroundColor: '#0F67FE', width:'50%'}}>
            <Text style={styles.text}>Bicep Curl</Text>
            <Button style={styles.button} status="success">
              <Text style={styles.text}>START</Text>
            </Button>
          </Layout>
          <Image style={styles.image} source={require('../images/bicep_curl.jpg')} /> 
        </Layout>
        <Layout style={styles.exceriseCard}>
          <Layout style={{backgroundColor: '#0F67FE', width:'50%'}}>
            <Text style={styles.text}>Bicep Curl</Text>
            <Button style={styles.button} status="success">
              <Text style={styles.text}>START</Text>
            </Button>
          </Layout>
          <Image style={styles.image} source={require('../images/bicep_curl.jpg')} /> 
        </Layout>
        <Layout style={styles.exceriseCard}>
          <Layout style={{backgroundColor: '#0F67FE', width:'50%'}}>
            <Text style={styles.text}>Bicep Curl</Text>
            <Button style={styles.button} status="success">
              <Text style={styles.text}>START</Text>
            </Button>
          </Layout>
          <Image style={styles.image} source={require('../images/bicep_curl.jpg')} /> 
        </Layout>
        <Layout style={styles.exceriseCard}>
          <Layout style={{backgroundColor: '#0F67FE', width:'50%'}}>
            <Text style={styles.text}>Bicep Curl</Text>
            <Button style={styles.button} status="success">
              <Text style={styles.text}>START</Text>
            </Button>
          </Layout>
          <Image style={styles.image} source={require('../images/bicep_curl.jpg')} /> 
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
    backgroundColor: '#0F67FE',
    width: '100%',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: '900',
    color: '#fff',
  },
  button: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
    width: '80%',
  },
});
