import React, { useState, Children } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  ScrollView,
  FlatList,
  TextInput,
  Modal,
  PermissionsAndroid
} from 'react-native';
import { deleteDatabase, openDatabase } from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/Entypo';
import Slider from '@react-native-community/slider';
import Picker from '@react-native-community/picker';

//import custom components
import { styles, Break } from './MasterStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ingredients } from './inputData';
import { CameraPage } from './cameraPage';

var db = openDatabase({name: 'bread', createFromLocation: '~www/bread.db' });

function editLoaf( { route, navigation } ){
  
  const { ID } = route.params; // pulls the loaf ID from the tile pressed to get to this page
  const { Key } = route.params; // pulls the SQLite column heading based on the array key
  const { Trait } = route.params; // pulls the name of the trait
  const { editProp } = route.params; // pulls the type of field that is required on edit
  const { Units } = route.params; // pulls the units for the field being editted
  const [loafData, setLoafData] = useState('');
  const [newInfo, setNewInfo] = useState(0);
  const [editModalVisibility, setEditModalVisibility] = useState('');

  if(!loafData){
    db.transaction(tx => {
        console.log(`db. run`);
    
        tx.executeSql("SELECT * FROM bread WHERE ID=?", [ID], (tx, results) => {
          console.log(`Rows:`, results.rows.length);
          let len = results.rows.length;
          if(len > 0){
            setLoafData(results.rows.item(0));
          }
        }, 
        
        tx => {console.log(`error, query didn't run`)});
    
        console.log(`db. end`);
      });

  }

  function CurrentInfo (props) {
    let NewUnits = '';

    if(Units){
      NewUnits = Units;
    }

    let value = !loafData[Key]? "None" : `${loafData[Key]} ${NewUnits}`;
   
    return (
      <View>
        <View>
          <Text style={styles.titleText}>{Trait}</Text>
        </View>
        <View>
          <Text style={styles.loafText}>{value}</Text>
        </View>
      </View>
    )
  }


  function EditInfo (props) {
    
    // picker
    // sliding scale for star rating 1 - 5
    // numeric input for ingredietns
    // add photo element for photo
    // large text input for comments

    //navigation.navigate('Camera', {ID: ID})
   
    if(editProp === 'slider'){
      return mySlider()
    }else if(editProp === 'digits'){
      return myTextInput('digits')
    }else if(editProp === 'text'){
      return myTextInput('text')
    }else if(editProp === 'longtext'){
      return myTextInput('longtext')
    }else if(editProp === 'image'){
      return myPhotoButton()
    }else{

      return (
        <View>
          <Text style={styles.loafText}>
            If you can see this...something has yet to be added!
          </Text>
        </View>
      )
    }
  }

  function mySlider(){
    
    return (
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{flex:0.5}}>
            <Text style={styles.loafText}>0</Text>
          </View>
          <View style={{flex:4}}>
            <Slider
              style={{height: 40}}
              minimumValue={0}
              maximumValue={5}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              step={1}
              value={newInfo}
              onValueChange={value => setNewInfo(value)}
              
            />
          </View>
          <View style={{flex:0.5}}>
            <Text style={styles.loafText}>5</Text>
          </View>
        </View>

        <View>
          <Text style={styles.loafText}>New Rating: {newInfo} {Units}</Text>
        </View>
      </View>
    )  
  }

  function myTextInput(e){
    let type = 'default'
    let multiline = false
    let lines = 1

    if(e === 'digits'){
      type = 'numeric'
    }

    if(e === 'longtext'){
      multiline = true
      lines = 5
    }

    let defaultAmount = {editingIndex:-1,text:''}
    let [tempAmount, setTempAmount] = useState(defaultAmount);

    return (
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{flex:1}}>
            <TextInput
              style={styles.inputText}
              keyboardType={type}
              placeholder='What would you like to change this to?'
              value={tempAmount.editingIndex === ID ? tempAmount.text : newInfo}
              onFocus={()=>setTempAmount({editingIndex:ID,text:e.amount})}
              onBlur={()=>{
                setNewInfo(tempAmount.text)
                setTempAmount(defaultAmount)
              }}
              onChangeText={text => setTempAmount({text,editingIndex:ID})}
              multiline={multiline}
              numberOfLines={lines}
            />
          </View>
        </View>
      </View>
    )  
  }

  function myPhotoButton () {
    //<Button title="Open Camera" onPress={() => navigation.navigate('Camera', {ID: ID})} />
    return (
      <View style={{flex: 1}}>
        <CameraPage ID={ID} />
      </View>
    )
  }


  const validateInputs = () => {
    //insert input validations followed by a (setmodalvisibile)
    // this needs refining at a later stage - currently the alert does not activate
    
    if(loafData[Key] === newInfo ){
      Alert.alert(
        '',
        `You can only update ${Trait} to a new value!`,
        [
          
          { text: 'OK' },
        ],
        { cancelable: false }
      );
    } else {
      setEditModalVisibility(!editModalVisibility)
    }
  }

  function updateDB () {

    let sql = String(`UPDATE bread SET ${Key}=? WHERE ID=?`)

    db.transaction(function(tx){
      console.log(`db.run`)
           
      tx.executeSql(
        sql, [newInfo, ID], 
        (tx, results) => {
          if(results.rowsAffected > 0){
            console.log('results', results.rowsAffected);
            navigation.navigate('View Loaf', {ID: ID})
          }else{
            console.log(`error`)
          }
        }
      )

    })
  }

  return(
    <SafeAreaView style={styles.container}>

      <Modal
        visible={editModalVisibility}
      >
        <SafeAreaView style={styles.container}>
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
              
                  <Text style={styles.titleText}>Success!</Text>

                  <Text style={styles.metricText}>{Trait} has been updated to {newInfo} {Units}</Text>
      
                  <Button 
                    title="Close"
                    onPress={() => {
                      setEditModalVisibility(!editModalVisibility)
                      updateDB()
                    }}
                  />
                </View>
              </View>
        </SafeAreaView>
      </Modal>

      <View style={styles.page}>

        <CurrentInfo />
        <Break />

        <EditInfo />

        <Break />
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <View>
              <Button title='Back' onPress={() => navigation.navigate('View Loaf', {ID: ID})} />
            </View>
            
            <View>
              <Button title='Update' onPress={() => validateInputs()} />
            </View>

          </View>

      </View>
    </SafeAreaView>
  )
}

/* PRINT LOAF LIST BUTTON
<View><Button title='Print loafdata' onPress={()=>{
              console.log(loafData)
              console.log(array)
              console.log(Object.entries(loafData))
              }} /></View>
*/

/* DEBUG BUTTONS

<View>
              <Button title='loafData' onPress={() => console.log(loafData)} />
            </View>
            <View>
              <Button title='ID' onPress={() => console.log(ID)} />
            </View>
            <View>
              <Button title='loafTrait' onPress={() => console.log(Trait)} />
            </View>
            <View>
              <Button title='newInfo' onPress={() => console.log(newInfo)} />
            </View>

  */

export { editLoaf }