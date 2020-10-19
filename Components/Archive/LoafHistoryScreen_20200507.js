import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  Modal,
  TouchableOpacity,
  TextInput
} from 'react-native';

//import custom components
import { styles, Break } from './MasterStyles';
import { ingredientsData, ingredients } from './inputData';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-community/picker';

function loafHistory() {

    const [ingredientsList, setIngredientsList] = useState(ingredients);
    const [selectedLoaf, setSelectedLoaf] = useState('Regular Loaf');
    const [flourModalVisibility, setFlourModalVisibility] = useState(false);

    function createLog(value) {
        return(
            ingredientsList.map(item => {
                if(item.type === 'flour'){
                  console.log(`${item.name} isVisible: ${item.isVisible}`)
                  console.log(`Loaf: ${selectedLoaf}`)
                }
            })
        );
    }

    function LoafSelector() {

      /*
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
        return(
          ingredientsList.map(e => {
            if(e.type === 'flour'){
              return(
                <View style={styles.metricContainer}key={e.id}>
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

      return (
        <View style={styles.ingredientsContainer}>
          <View style={{flexDirection: 'column'}}>
            <View>
              <Text style={styles.metricTitle}>
                Volume of Ingredients:
              </Text>
            </View>
            {
              ingredients.map(e => {
                if(e.isVisible && e.ingredient){
                  return (
                    <View style={{flexDirection: 'row', alignItems: 'center'}} key={e.id}>
                      <View style={{flex:2}}>
                        <Text style={styles.metricText}>{e.name}:</Text>
                      </View>
                      <View style={{flex:3}}>
                        <TextInput
                          placeholder='amount'
                          style={styles.inputText}
                          keyboardType='number-pad'
                          value={e.amount}
                          onChangeText={textInputHandler()}
                          key={e.id}
                        />
                      </View>
                      <View style={{flex:1}}>
                        <Text style={styles.ingredientsText}>{e.units}</Text>
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

      newArray[index].isVisible = !newArray[index].isVisible
      setIngredientsList(newArray)

    }

    function textInputHandler(enteredText){
      //hold this for the ingredientsList.map array the allows for the amount of ingredients
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.page}>
          <Text style={styles.titleText}>Previous Loaves</Text>
          <Break />
          <Text style={styles.pageText}>
            This screen will show a list of the previous entries that we have made with
            an interative list of the loaves listed by name, when pressed, links to a 
            new page that has a breakdown of the metrics that we are measuring and 
            the option to upload an image of the load with a rating and feedback input.
          </Text>
          <Break />
          <Button
            title="Create Log"
            onPress={() => {
                createLog('Type of Loaf')
                }
            }
            />
          <Break/>
          <Button
            title="On Press Handler"
            onPress={() => {
                isVisibleHandler(1)
                }
            }
            />
            <Break />
            <ScrollView style={styles.page}>
              <LoafSelector />
              <FlourSelector />
              <IngredientsRecorder />
            </ScrollView>
          
        </View>
      </SafeAreaView>
    );
  }

  export { loafHistory }