import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  SectionList,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

//import custom components

import { styles, Break } from './MasterStyles';
import { inputData } from './inputData';


function HomeScreen() {

    
    const [newLoaf, setNewLoaf] = useState('');
    const [loafNames, setLoafNames] = useState('');
    const [radio, setRadio] = useState('');
  
    const MetricRadio = ({title}) => {
      //this component sets out the title heading for each metric array with a radio button
      
      const radioHandler = () => {
        // this updates the state of newLoaf with every keystroke in the text input container
        if(radio === title){
          setRadio('');
        } else {
          setRadio(title);
          console.log(`${radio} set to ${title}`);
        }
      };
  
      return(
          <View style={styles.metricContainer}>
            <View style={{flex: 5}}>
              <Text style={styles.metricText}>{title}</Text>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity 
                style={styles.circle}
                onPress={() => {
                  radioHandler();
                }}
              >
              {radio === title && <View style={styles.checkedCircle} />}
              </TouchableOpacity>
            </View>
          </View>
        );
    };
  
    const loafNameInputHandler = (enteredText) => {
      // this updates the state of newLoaf with every keystroke in the text input container
      setNewLoaf(enteredText);
    };
  
    const addNewLoafHandler = () => {
      // this adds the text from teh text input to the newLoad array on click on the button
      setLoafNames(loafNames => [...loafNames, newLoaf]);
    };
  
    const arrayLoafNames = Array.from(loafNames);
    
    return(
      <SafeAreaView style={styles.container}>
        <View style={styles.page}>
          <Text style={styles.titleText}>Welcome to the Bread Recipe App </Text>
          <Break />
          <Text style={styles.pageText}>
            We're going to use this app to capture some of the different parts of the baking
            process to see how these influence the final loaf of bread that we eat.
          </Text>
          <Break />
          <SectionList
            sections={inputData}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => 
              <View style={styles.metricContainer}>
                <Text style={styles.metricText}>{item}</Text>
              </View> }
            renderSectionHeader={({section: { title } }) => (
              <Text style={styles.metricTitle}>{ title }</Text>
            )}
          />
          <Break />
        </View>
      </SafeAreaView>
    );
  };

  export { HomeScreen }