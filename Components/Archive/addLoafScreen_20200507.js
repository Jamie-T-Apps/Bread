import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  SectionList,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { Picker} from '@react-native-community/picker';


//import custom components

import { styles, Break } from './MasterStyles';
import { inputData, ingredients } from './inputData';
import { FlatList } from 'react-native-gesture-handler';



function addNewLoaf() {

  
  const [newLoaf, setNewLoaf] = useState('');
  const [loafNames, setLoafNames] = useState('');
  const [loafType, setLoafType] = useState('');
  const [typeOfFlourVisible, setTypeOfFlourVisible] = useState(false); // sets model view
  const [flourArray, setFlourArray] = useState('');
  //const [ingredientsList, setIngredientsList] = useState(["Salt", "Yeast (or Starter)", "Water", "Suger", "Butter", "Eggs", "Milk"]);
  const [ingredientsList, setIngredientsList] = useState(ingredients);
  const [amount, setAmount] = useState('');

  const loafNameInputHandler = (enteredText) => {
    // this updates the state of newLoaf with every keystroke in the text input container
    setNewLoaf(enteredText);
  };

  const addNewLoafHandler = () => {
    // this adds the text from teh text input to the newLoad array on click on the button
    setLoafNames(loafNames => [...loafNames, newLoaf]);
    console.log(`Loaf Name: ${newLoaf}`);
    console.log(`Loaf Type: ${loafType}`)
    console.log(`flourArray: ${flourArray}`);
    console.log(`flourArray Length: ${flourArray.length}`);
    console.log(`Ingredients List Array: ${ingredientsList.map(item => item.name)}`);
    console.log(`Amount: ${amount}`);
    console.log(`Ingredients Object: ${ingredients}`);
  };

  const ingredientsAmountHandler = (enteredText) => {
    setAmount(enteredText);
  }

  const arrayLoafNames = Array.from(loafNames);

  function TypeOfBread() {

    return (
      <View style={styles.metricContainer}>
        <View style={{flex: 2}}>
          <Text style={styles.metricTitle}>
            Type of Bread:
          </Text>
        </View>
        <View style={{flex: 3}}>
          <Picker
            placeholder="Select type of loaf"
            selectedValue={loafType}
            style={styles.metricText}
            onValueChange={(itemValue, itemIndex) => {
              setLoafType(itemValue)
            }}
          >
                <Picker.Item label="Regular Loaf" value="regular" />
                <Picker.Item label="Sourdough Loaf" value="sourdough" />
                <Picker.Item label="Bagel(s)" value="bagel" />
                <Picker.Item label="English Muffin(s)" value="muffin" />
          </Picker>
        </View>
      </View>
    );
  }


  function TypeOfFlour() {

    function addFlourTypeHandler(name) {

      if(flourArray.indexOf(name) >= 0){
        setFlourArray(flourArray.filter(item => item !== name))
        setIngredientsList(ingredientsList.filter(item => item !== name))
      } else {
        setFlourArray(flourArray => [...flourArray, name])
        setIngredientsList(ingredientsList =>[name, ...ingredientsList])
      }

    }

    function FlourRadioButton(name) {

      return (

        <View style={styles.metricContainer}>
          <View style={{flex:9}}>
            <Text style={styles.metricText}>{name}</Text>
          </View>
          <View style={{flex:1}}>
            <TouchableOpacity
            style={styles.circle}
            onPress={()=> {
              addFlourTypeHandler(name);
            }}
            >
            {flourArray.indexOf(name) >= 0 && <View style={styles.checkedCircle} />}
          </TouchableOpacity>
          </View>
        </View>
      );
    }

    // multiselect option
    return(
      <View style={styles.metricContainer}>
        <View style={{flex: 2}}>
          <Text style={styles.metricTitle}>
            Type of Flour:
          </Text>
        </View>
        <View style={{flex: 3}}>
          <Modal
            visible={typeOfFlourVisible}
          >
            <SafeAreaView style={styles.container}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalView}>
                      <Text style={styles.titleText}>Select Flour Types</Text>

                      { FlourRadioButton('All Purpose Flour') }
                      { FlourRadioButton('Bread Flour') }
                      { FlourRadioButton('Whole Wheat Flour') }
                      { FlourRadioButton('White Whole Wheat Flour') }
          
                      <Button 
                        title="Close"
                        onPress={() => {
                          setTypeOfFlourVisible(!typeOfFlourVisible)
                        }}
                      />
                    </View>
                  </View>
            </SafeAreaView>
          </Modal>
          {flourArray.length === 0 ?
            <Button
                title="Add Flour"
                onPress={() => {
                  setTypeOfFlourVisible(!typeOfFlourVisible)
                }}
              />
            :
            <Button
                title="Insert Array"
                onPress={() => {
                  setTypeOfFlourVisible(!typeOfFlourVisible)
                }}
              /> 
          }
        </View>
      </View>
    );
  }

  function VolumeOfIngredients() {

    function GetIngredients(){
      
      return (
        ingredients.map(item => {
          if(item.isVisible === true){
            return (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flex:3}}>
                  <Text style={styles.metricText}>{item.name}:</Text>
                </View>
                <View style={{flex:2}}>
                  <TextInput
                    placeholder='amount'
                    style={styles.inputText}
                    keyboardType='number-pad'
                    value={item.amount}
                    onChangeText={ingredientsAmountHandler()}
                    key={item.id}
                  />
                </View>
                <View style={{flex:1}}>
                  <Text style={styles.ingredientsText}>{item.units}</Text>
                </View>
              </View>
            )
          }
        })
      )
    }

    return (
      <View style={styles.ingredientsContainer}>
        <View style={{flexDirection: 'column'}}>
          <View>
            <Text style={styles.metricTitle}>
              Volume of Ingredients:
            </Text>
          </View>
            <GetIngredients />
        </View>
      </View>
    );
  }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.page}>
          <Text style={styles.titleText}>Add a New Loaf</Text>
          <Break />
          <View style={{flexDirection: 'row'}}>
            <TextInput 
              placeholder='What would you like to call your loaf?' 
              style={styles.inputText}
              onChangeText={loafNameInputHandler}
              value={newLoaf}
            />
            <Button title='Create Loaf' color='#342e29' onPress={addNewLoafHandler} />
          </View>
          <Break />
          <ScrollView styles={styles.page}>
            <TypeOfBread />
            <TypeOfFlour />
            <VolumeOfIngredients />
          </ScrollView>
        </View>
        <Break />
      </SafeAreaView>
    );
  }

  export { addNewLoaf }