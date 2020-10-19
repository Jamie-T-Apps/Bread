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
  Alert
} from 'react-native';
import { Picker} from '@react-native-community/picker';



//import custom components

import { styles, Break } from './MasterStyles';
import { inputData, ingredients } from './inputData';
import { FlatList } from 'react-native-gesture-handler';
import { openDatabase } from 'react-native-sqlite-storage';
import { loafHistory } from './LoafHistoryScreen';

var db = openDatabase({name: 'bread', createFromLocation: '~www/bread.db' });


function addNewLoaf( { navigation }) {

  const [ingredientsList, setIngredientsList] = useState(ingredients);
  const [selectedLoaf, setSelectedLoaf] = useState('Regular Loaf');
  const [flourModalVisibility, setFlourModalVisibility] = useState(false);
  const [newLoaf, setNewLoaf] = useState('');
  const [loafModalVisibility, setLoafModalVisibility] = useState(false);

  function LoafSelector() {

    /* this throws an odd error!
    ingredientsList.map(e => {
              if(e.type === 'loaf'){
                return(
                  <Picker.Item  key={e.id} label={e.name} value={e.name}/>
                );
              }
            })
            */

    return(
      <View style={styles.metricContainer}>
      <View style={{flex: 2}}>
        <Text style={styles.metricTitle}>
          Type of Bread:
        </Text>
      </View>
      <View style={{flex: 3}}>
        <Picker
          placeholder="Select type of loaf"
          selectedValue={selectedLoaf}
          style={styles.metricText}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedLoaf(itemValue)
          }}
        >
          <Picker.Item label="Regular Loaf" value="Regular Loaf"/>
          <Picker.Item label="Sourdough Loaf" value="Sourdough Loaf"/>
          <Picker.Item label="Bagel(s)" value="Bagel(s)"/>
          <Picker.Item label="English Muffin(s)" value="English Muffin(s)"/>
        </Picker>
      </View>
    </View>
    )
  }

  function FlourSelector() {

    function ModalFlourList(){
      //returns a list of all inregients tagged as flour, including their visibility setting
      /*
      onFocus={()=>setTempAmount({editingIndex:i,text:e.amount})}
      onBlur={()=>{
        ingredientsAmountHandler(tempAmount.text, e.id)
        setTempAmount(defaultAmount)
      }}
      onChangeText={text => setTempAmount({text,editingIndex:i})}
      */

      return(
        ingredientsList.map(e => {
          //insert variable to calls checked circle from templist
          if(e.type === 'flour'){
            return(
              <View style={styles.metricContainer} key={e.id}>
                <View style={{flex:9}}>
                  <Text style={styles.metricText}>{e.name}</Text>
                </View>
                <View style={{flex:1}}>
                  <TouchableOpacity
                  style={styles.circle}
                  onPress={()=> {
                    isVisibleHandler(e.id);
                  }}
                  >
                  {e.isVisible && <View style={styles.checkedCircle} />}
                </TouchableOpacity>
                </View>
              </View>
            )
          }
        })
      )
    }

    return(
      <View style={styles.metricContainer}>
        <View style={{flex: 2}}>
          <Text style={styles.metricTitle}>
            Type of Flour:
          </Text>
        </View>
        <View style={{flex: 3}}>
          <Modal
            visible={flourModalVisibility}
          >
            <SafeAreaView style={styles.container}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalView}>
                      <Text style={styles.titleText}>Select Flour Types</Text>

                      <ModalFlourList />
          
                      <Button 
                        title="Close"
                        onPress={() => {
                          setFlourModalVisibility(!flourModalVisibility)
                        }}
                      />
                    </View>
                  </View>
            </SafeAreaView>
          </Modal>
          
          {//change button button to reflect the flour types that have been added}
          <Button
              title="Add Flour"
              onPress={() => {
                setFlourModalVisibility(!flourModalVisibility)
              }}
            />
            
          }
        </View>
      </View>
    );

  }

  function IngredientsRecorder() {

    let defaultAmount = {editingIndex:-1,text:''}
    let [tempAmount, setTempAmount] = useState(defaultAmount);

    return (
      <View style={styles.ingredientsContainer}>
        <View style={{flexDirection: 'column'}}>
          <View>
            <Text style={styles.metricTitle}>
              Volume of Ingredients:
            </Text>
          </View>
          {
            ingredientsList.map((e, i) => {
              if(e.isVisible && e.ingredient){
                return (
                  <View style={{flexDirection: 'row', alignItems: 'center'}} key={e.id}>
                    <View style={{flex:2}}>
                      <Text style={styles.metricText}>{e.name}:</Text>
                    </View>
                    <View style={{flex:3}}>
                      <TextInput
                        placeholder={e.units}
                        style={styles.inputText}
                        keyboardType='number-pad'
                        value={tempAmount.editingIndex===i?tempAmount.text:e.amount}
                        onFocus={()=>setTempAmount({editingIndex:i,text:e.amount})}
                        onBlur={()=>{
                         ingredientsAmountHandler(tempAmount.text, e.id)
                         setTempAmount(defaultAmount)
                        }}
                        onChangeText={text => setTempAmount({text,editingIndex:i})}
                      />
                    </View>
                  </View>
                )
              }
            })
          }
        </View>
      </View>
    )
  }

  function ProveRecorder() {

    let defaultAmount = {editingIndex:-1,text:''}
    let [tempAmount, setTempAmount] = useState(defaultAmount);

    return (
      <View style={styles.ingredientsContainer}>
        <View style={{flexDirection: 'column'}}>
          <View>
            <Text style={styles.metricTitle}>
              Time to Prove:
            </Text>
          </View>
          {
            ingredientsList.map((e, i) => {
              if(e.type === 'proof' && e.isVisible){
                return (
                  <View style={{flexDirection: 'row', alignItems: 'center'}} key={e.id}>
                    <View style={{flex:2}}>
                      <Text style={styles.metricText}>{e.name}:</Text>
                    </View>
                    <View style={{flex:3}}>
                      <TextInput
                        placeholder={e.units}
                        style={styles.inputText}
                        keyboardType='number-pad'
                        value={tempAmount.editingIndex===i?tempAmount.text:e.amount}
                        onFocus={()=>setTempAmount({editingIndex:i,text:e.amount})}
                        onBlur={()=>{
                         ingredientsAmountHandler(tempAmount.text, e.id)
                         setTempAmount(defaultAmount)
                        }}
                        onChangeText={text => setTempAmount({text,editingIndex:i})}
                      />
                    </View>
                  </View>
                )
              }
            })
          }
        </View>
      </View>
    )
  }

  function BakingMethod() {

    let defaultAmount = {editingIndex:-1,text:''}
    let [tempAmount, setTempAmount] = useState(defaultAmount);

    return (
      <View style={styles.ingredientsContainer}>
        <View style={{flexDirection: 'column'}}>
          <View>
            <Text style={styles.metricTitle}>
              Baking Methods:
            </Text>
          </View>
          {
            ingredientsList.map((e, i) => {
              if(e.type === 'method' && e.isVisible){
                return (
                  <View style={{flexDirection: 'row', alignItems: 'center'}} key={e.id}>
                    <View style={{flex:2}}>
                      <Text style={styles.metricText}>{e.name}:</Text>
                    </View>
                    <View style={{flex:3}}>
                      <TextInput
                        placeholder={e.units}
                        style={styles.inputText}
                        keyboardType='number-pad'
                        value={tempAmount.editingIndex===i?tempAmount.text:e.amount}
                        onFocus={()=>setTempAmount({editingIndex:i,text:e.amount})}
                        onBlur={()=>{
                         ingredientsAmountHandler(tempAmount.text, e.id)
                         setTempAmount(defaultAmount)
                        }}
                        onChangeText={text => setTempAmount({text,editingIndex:i})}
                      />
                    </View>
                  </View>
                )
              }
            })
          }
        </View>
      </View>
    )
  }

  function isVisibleHandler(e) {

    let newArray = [...ingredientsList]
    let index = newArray.findIndex(element => element.id === e)

    newArray[index].isVisible = !newArray[index].isVisible // switches visibility
    newArray[index].amount = '' // resets amount to zero when visibility changes
    setIngredientsList(newArray)

  }

  const loafNameInputHandler = (enteredText) => {
    // this updates the state of newLoaf with every keystroke in the text input container
    setNewLoaf(enteredText);
  };

  function getAmount(e){
      
    let newArray = [...ingredientsList]
    let index = newArray.findIndex(element => element.name === e)

    return newArray[index].amount
  }

  const addNewLoafHandler = () => {

    // set database inputs
    const name = newLoaf
    const type = selectedLoaf
    const wflour = getAmount('Bread Flour')
    const apflour = getAmount('All Purpose Flour')
    const wwflour = getAmount('Whole Wheat Flour')
    const wwwflour = getAmount('White Whole Wheat Flour')
    const salt = getAmount('Salt')
    const yeast = getAmount('Yeast (or Starter)')
    const water = getAmount('Water')
    const sugar = getAmount('Sugar')
    const butter = getAmount('Butter')
    const oil  = getAmount('Oil')
    const eggs = getAmount('Eggs')
    const milk = getAmount('Milk')
    const fp = getAmount('First Prove')
    const sp = getAmount('Second Prove')
    const kt= getAmount('Kneed Time')
    const otemp1 = getAmount('1st Bake Temp')
    const otime1 = getAmount('1st Bake Time')
    const otemp2 = getAmount('2nd Bake Temp')
    const otime2 = getAmount('2nd Bake Time')
    const cont = getAmount('Container')
    const wvolume = getAmount('Water Volume')
    const mydate = new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate()
    const mytime = new Date().getHours() + ':' + new Date().getMinutes()


    db.transaction(function(tx){
      console.log(`db.run`)
      /*

          Backup of SQLite query

          tx.executeSql(
                  'INSERT INTO bread (Name, TypeOfBread, WhiteFlour, AllPurposeFlour, WholeWheatFlour, WhiteWholeWheatFlour, Salt, StarterorYeast, Water, Sugar, Butter, Milk, FirstProve, SecondProve, KneedTime,  OvenTemp1, OvenTime1, OvenTemp2, OvenTime2, Container, WaterVolume, MyDate, MyTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                  [name, type, wflour, apflour, wwflour, wwwflour, salt, yeast, water, sugar, butter, milk, fp, sp, kt, otemp1, otime1, otemp2, otime2, cont, wvolume, mydate, mytime],
                  (tx, results) => {
                    if(results.rowsAffected > 0){
                      console.log('results', results.rowsAffected);
                    }else{
                      console.log(`error`)
                    }
                  }
                )

      */
     
     tx.executeSql(
      'INSERT INTO bread (Name, TypeOfBread, WhiteFlour, AllPurposeFlour, WholeWheatFlour, WhiteWholeWheatFlour, Salt, StarterorYeast, Water, Sugar, Butter, Milk, FirstProve, SecondProve, KneedTime,  OvenTemp1, OvenTime1, OvenTemp2, OvenTime2, Container, WaterVolume, MyDate, MyTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, type, wflour, apflour, wwflour, wwwflour, salt, yeast, water, sugar, butter, milk, fp, sp, kt, otemp1, otime1, otemp2, otime2, cont, wvolume, mydate, mytime],
      (tx, results) => {
        if(results.rowsAffected > 0){
          console.log('results', results.rowsAffected);
        }else{
          console.log(`error`)
        }
      }
    )


    })

    //reset the ingredients list to the core values
    ingredients.map(item => {
      if(item.amount > 0){
        item.amount=''
      }
      if(item.type === 'flour'){
        item.isVisible = false
      }
    })

    //reset name field to blank
    setNewLoaf('')

    //reset the loaf selected to regular
    setSelectedLoaf('Regular Loaf')

    //update the state causing re-render of page
    setIngredientsList(ingredients)

    //check console to see if rreset
    //console.log(ingredientsList)


    //close the modal
    setLoafModalVisibility(!loafModalVisibility)

  };

  const validateInputs = () => {
    //insert input validations followed by a (setmodalvisibile)
    
    if(newLoaf === ''){
      Alert.alert(
        '',
        'Don\'t forget to name your loaf!',
        [
          
          { text: 'OK' },
        ],
        { cancelable: false }
      );
    } else {
      setLoafModalVisibility(!loafModalVisibility)
    }
  }

  const ingredientsAmountHandler = (text, id) => {
    // setAmount(enteredText);

    let newArray = [...ingredientsList]
    let index = newArray.findIndex(element => element.id === id)

    newArray[index].amount = text
    setIngredientsList(newArray)
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
          <Button title='Create' onPress={validateInputs} />

          <Modal
            visible={loafModalVisibility}
          >
            <SafeAreaView style={styles.container}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalView}>
                  
                      <Text style={styles.titleText}>Success!</Text>

                      <Text style={styles.metricText}>{newLoaf} has been added to your library</Text>
          
                      <Button 
                        title="Close"
                        onPress={() => {
                          setLoafModalVisibility(!loafModalVisibility)
                          addNewLoafHandler()
                        }}
                      />
                    </View>
                  </View>
            </SafeAreaView>
          </Modal>

        </View>
        <Break />
        <ScrollView styles={styles.page} keyboardShouldPersistTaps='handled'>
          <LoafSelector />
          <FlourSelector />
          <IngredientsRecorder />
          <ProveRecorder />
          <BakingMethod />
        </ScrollView>
      </View>
      <Break />
    </SafeAreaView>
  );
}

  export { addNewLoaf }