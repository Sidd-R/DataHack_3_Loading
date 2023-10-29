import {ScrollView, StyleSheet, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import {Button, Layout, Text} from '@ui-kitten/components';
import {InputText} from '../Components/Input';
import {PieChart, LineChart} from 'react-native-chart-kit';
import axios from 'axios';

const DietScreen = () => {
  const [food, setFood] = React.useState('');
  const [nutrition, setNutrition] = React.useState([]);
  const [caloriesData, setCaloriesData] = React.useState([
    2200, 2300, 2100, 2800, 2150, 2050, 2000,
  ]);
  const handleFoodRequest = async () => {
    console.log(food);
    const options = {
      method: 'GET',
      url: 'https://api.calorieninjas.com/v1/nutrition?query=' + food,
      headers: {
        'X-API-Key': 'CK+IRH4dw9fUs7wP/52xhg==iudybu03M6Ghr4pj',
      },
    };

    try {
      const response = await axios.request(options).then(data => data.data);
      setNutrition(response.items);
      console.log(nutrition);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const totalCalories = nutrition.reduce(
      (total, item) => total + item.calories,
      0,
    );
    setCaloriesData(prevData => {
      const newData = [...prevData];
      newData[newData.length - 1] += totalCalories;
      return newData;
    });
  }, [nutrition]);

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <Layout style={styles.dietScreen}>
          <InputText
            label="What did you recently have?"
            placeholder="Enter food"
            changeFunction={setFood}
            variable={food}
          />
          <Button onPress={handleFoodRequest}>Get Nutrition</Button>

          {nutrition && nutrition.length > 0 && (
            <Layout>
              {nutrition.map((item, index) => (
                <Layout key={index} style={styles.nutritionItem}>
                  <Text category="h5">{item.name}</Text>
                  <Text category="s1">
                    Serving Size: {item.serving_size_g} gm
                  </Text>
                  <Text category="s1">Calories: {item.calories} gm</Text>
                  <PieChart
                    data={[
                      {
                        name: 'Protein',
                        population: item.protein_g,
                        color: '#9999cc',
                        legendFontColor: '#7F7F7F',
                        legendFontSize: 15,
                      },
                      {
                        name: 'Total Fat',
                        population: item.fat_total_g,
                        color: '#ff8888',
                        legendFontColor: '#7F7F7F',
                        legendFontSize: 15,
                      },
                      {
                        name: 'Carbs',
                        population: item.carbohydrates_total_g,
                        color: '#99cc99',
                        legendFontColor: '#7F7F7F',
                        legendFontSize: 15,
                      },
                      {
                        name: 'Sugar',
                        population: item.sugar_g,
                        color: '#cc99cc',
                        legendFontColor: '#7F7F7F',
                        legendFontSize: 15,
                      },
                    ]}
                    width={300}
                    height={150}
                    chartConfig={{
                      backgroundColor: '#e1e1e1',
                      backgroundGradientFrom: '#ff8888',
                      backgroundGradientTo: '#ff7755',
                      color: (opacity = 1) => `rgba(200, 50, 50, ${opacity})`,
                    }}
                    accessor={'population'}
                    backgroundColor={'transparent'}
                    paddingLeft={'20'}
                    absolute
                  />
                </Layout>
              ))}
            </Layout>
          )}
          <Layout style={styles.nutritionItem}>
            <Text category="h6" style={{marginTop: 20}}>
              7 Days Calorie Consumption
            </Text>
            <LineChart
              data={{
                labels: [' 1', ' 2', ' 3', ' 4', ' 5', ' 6', ' 7'],
                datasets: [
                  {
                    data: caloriesData,
                  },
                ],
              }}
              width={Dimensions.get('window').width - 20}
              height={200}
              yAxisSuffix="cal"
              yAxisInterval={1}
              chartConfig={{
                backgroundColor: '#e1e1e1',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                color: (opacity = 1) => `rgba(200, 50, 50, ${opacity})`,
                decimalPlaces: 0,
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 12,
                paddingLeft: -20,
              }}
            />
          </Layout>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  dietScreen: {
    padding: 24,
    flexDirection: 'column',
    height: '100%',
    flex: 1,
  },
  nutritionItem: {
    marginBottom: 10,
    width: '100%',
    paddingTop: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DietScreen;
