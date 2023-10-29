import {View, StyleSheet, ScrollView, Image} from 'react-native';
import React, { useState } from 'react';
import {Layout, Button, Text, Select, SelectItem} from '@ui-kitten/components';
import axios from 'axios';

const ExcerisesScreen = () => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const typeOptions = ['Strength', 'Stretching'];
  const bodyPartOptions = ['Bicep','Chest'];
  const equipmentOptions = ['Body Only','Dumbbell'];
  const levelOptions = ['Beginner', 'Intermediate', 'Advanced'];

  const handleSearchRequest =async () => {
    const options = {
      method: 'POST',
      url: 'http://127.0.0.1:80',
      data: {
        type: selectedType,
        bodyPart: selectedBodyPart,
        equipment: selectedEquipment,
        level: selectedLevel,
      }
    };

    try {
      const response = await axios.request(options).then(data => data.data);
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ScrollView>
      <Layout style={{flex: 1, alignItems: 'center'}}>
        <Text category="h5" style={{marginBottom: 10}}>
          Search Excerises
        </Text>
        <Layout>
        <Select
          style={styles.dropdowns}
          placeholder="Select Type"
          value={selectedType}
          onSelect={index => setSelectedType(typeOptions[index.row])}>
          {typeOptions.map((type, index) => (
            <SelectItem title={type} key={index} />
          ))}
        </Select>

        <Select
          style={styles.dropdowns}
          placeholder="Select Body Part"
          value={selectedBodyPart}
          onSelect={index => setSelectedBodyPart(bodyPartOptions[index.row])}>
          {bodyPartOptions.map((bodyPart, index) => (
            <SelectItem title={bodyPart} key={index} />
          ))}
        </Select>

        <Select
          style={styles.dropdowns}
          placeholder="Select Equipment"
          value={selectedEquipment}
          onSelect={index => setSelectedEquipment(equipmentOptions[index.row])}>
          {equipmentOptions.map((equipment, index) => (
            <SelectItem title={equipment} key={index} />
          ))}
        </Select>

        <Select
          style={styles.dropdowns}
          placeholder="Select Level"
          value={selectedLevel}
          onSelect={index => setSelectedLevel(levelOptions[index.row])}>
          {levelOptions.map((level, index) => (
            <SelectItem title={level} key={index} />
          ))}
        </Select>

        <Button style={{width: 330, margin: 16}} onPress={handleSearchRequest}>
          <Text style={styles.text}>SEARCH</Text>
        </Button>
      </Layout>
      </Layout>
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
  dropdowns: {
    margin: 16,
    width: 330,
  },
});
