import React, { useState, Children } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  ScrollView,
  FlatList
} from 'react-native';
import { deleteDatabase, openDatabase } from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/Entypo';

//import custom components
import { styles, Break } from './MasterStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';

var db = openDatabase({name: 'bread', createFromLocation: '~www/bread.db' });

function viewLoaf( { route, navigation } ){
  
  const { ID } = route.params; // pulls the loaf ID from the tile pressed to get to this page
  const [loafData, setLoafData] = useState('');
  const [modal, setModal] = useState(false);
  const [editableProp, setEditableProp] = useState('');
  const [array, setArray] = useState('');
  
  
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

  if(loafData && !array){
    // update array to sturcutre the loafData in a format that is capable of being mapped

    function getValue (e, units) {
      if(loafData[e]){
        return loafData[e] + units
      } else {
        return `Add ${e}`
      }
    }

    const dbExtract = [
      /*
        key: the database heading
        name: the name to display to user
        value: getValue('the database heading'),
        specialattribute: null unless there is a special icon or other item to display
        section: category that the info will be displayed in
      */

      // misc section for info that is not visible to the user
      {
        key: 'ID',
        name: 'ID',
        value: getValue('ID'),
        specialattribute: null,
        section: 'misc'
      },
      {
        key: 'Name',
        name: 'Name',
        value: getValue('Name'),
        specialattribute: null,
        section: 'misc'
      },
      {
        key: 'MyTime',
        name: 'Time',
        value: getValue('MyTime'),
        specialattribute: null,
        section: 'misc'
      },
      {
        key: 'MyDate',
        name: 'Date',
        value: getValue('MyDate'),
        specialattribute: null,
        section: 'misc'
      },
      //intro section with headline details for the loaf
      {
        key: 'Photo',
        name: 'Photo',
        value: getValue('Photo'),
        specialattribute: <Icon name='image' size={50} color='white'/>,
        section: 'intro'
      },
      {
        key: 'Comment',
        name: 'Comment',
        value: getValue('Comment'),
        specialattribute: null,
        section: 'intro'
      },
      {
        key: 'Rating',
        name: 'Rating',
        value: getValue('Rating', ' stars'),
        specialattribute: <Icon name='star' size={30} color='white'/>,
        section: 'intro'
      },
      {
        key: 'TypeOfBread',
        name: 'Type Of Loaf',
        value: getValue('TypeOfBread'),
        specialattribute: null,
        section: 'intro'
      },
      
      // types of flour used
      {
        key: 'WhiteFlour',
        name: 'White Flour',
        value: getValue('WhiteFlour', ' gr'),
        specialattribute: null,
        section: 'flour'
      },
      {
        key: 'AllPurposeFlour',
        name: 'All Purpose Flour',
        value: getValue('AllPurposeFlour', ' gr'),
        specialattribute: null,
        section: 'flour'
      }, 
      {
        key: 'WholeWheatFlour',
        name: 'Whole Wheat Flour',
        value: getValue('Whole Wheat Flour', ' gr'),
        specialattribute: null,
        section: 'flour'
      },
      {
        key: 'WhiteWholeWheatFlour',
        name: 'White Whole Wheat Flour',
        value: getValue('WhiteWholeWheatFlour', ' gr'),
        specialattribute: null,
        section: 'flour'
      },
      // other ingredients used
      {
        key: 'Salt',
        name: 'Salt',
        value: getValue('Salt', ' gr'),
        specialattribute: null,
        section: 'ingredients'
      },
      {
        key: 'StarterorYeast',
        name: 'Starter (or Yeast)',
        value: getValue('StarterorYeast', ' gr'),
        specialattribute: null,
        section: 'ingredients'
      },
      {
        key: 'Water',
        name: 'Water',
        value: getValue('Water', ' ml'),
        specialattribute: null,
        section: 'ingredients'
      },
      {
        key: 'Sugar',
        name: 'Sugar',
        value: getValue('Sugar', ' gr'),
        specialattribute: null,
        section: 'ingredients'
      },
      {
        key: 'Butter',
        name: 'Butter',
        value: getValue('Butter', ' gr'),
        specialattribute: null,
        section: 'ingredients'
      },
      {
        key: 'Milk',
        name: 'Milk',
        value: getValue('Milk', ' ml'),
        specialattribute: null,
        section: 'ingredients'
      },
      {
        key: 'Oil',
        name: 'Oil',
        value: getValue('Oil', ' ml'),
        specialattribute: null,
        section: 'ingredients'
      },
      {
        key: 'Eggs',
        name: 'Eggs',
        value: getValue('Eggs', ' eggs'),
        specialattribute: null,
        section: 'ingredients'
      },
      // preparation information
      {
        key: 'FirstProve',
        name: '1st Prove',
        value: getValue('FirstProve', ' mins'),
        specialattribute: null,
        section: 'prep'
      },
      {
        key: 'SecondProve',
        name: '2nd Prove',
        value: getValue('SecondProve', ' mins'),
        specialattribute: null,
        section: 'prep'
      },
      {
        key: 'KneedTime',
        name: 'Kneed Time',
        value: getValue('KneedTime', ' mins'),
        specialattribute: null,
        section: 'prep'
      },
      // details relating to how the loaf was baked
      {
        key: 'OvenTemp1',
        name: '1st Oven Temp',
        value: getValue('OvenTemp1', ' C'),
        specialattribute: null,
        section: 'baking'
      },
      {
        key: 'OvenTime1',
        name: '1st Time',
        value: getValue('OvenTime1', ' mins'),
        specialattribute: null,
        section: 'baking'
      },
      {
        key: 'OvenTemp2',
        name: '2nd Oven Temp',
        value: getValue('OvenTemp2', ' C'),
        specialattribute: null,
        section: 'baking'
      },
      {
        key: 'OvenTime2',
        name: '2nd Time',
        value: getValue('OvenTime2', ' mins'),
        specialattribute: null,
        section: 'baking'
      },
      {
        key: 'WaterVolume',
        name: 'Water Volume',
        value: getValue('WaterVolume', ' ml'),
        specialattribute: null,
        section: 'baking'
      },
      // ratings information
      {
        key: 'Crust',
        name: 'Crust Rating',
        value: getValue('Crust', ' stars'),
        specialattribute: <Icon name='star' size={30} color='white'/>,
        section: 'ratings'
      },
      {
        key: 'Density',
        name: 'Density Rating',
        value: getValue('Density', ' stars'),
        specialattribute: <Icon name='star' size={30} color='white'/>,
        section: 'ratings'
      },
      {
        key: 'Colour',
        name: 'Colour Rating',
        value: getValue('Colour', ' stars'),
        specialattribute: <Icon name='star' size={30} color='white'/>,
        section: 'ratings'
      },
      {
        key: 'Taste',
        name: 'Taste Rating',
        value: getValue('Taste', ' stars'),
        specialattribute: <Icon name='star' size={30} color='white'/>,
        section: 'ratings'
      },
      {
        key: 'Size',
        name: 'Size Rating',
        value: getValue('Size', ' stars'),
        specialattribute: <Icon name='star' size={30} color='white'/>,
        section: 'ratings'
      },
      {
        key: 'Toast',
        name: 'Toast Rating',
        value: getValue('Toast', ' stars'),
        specialattribute: <Icon name='star' size={30} color='white'/>,
        section: 'ratings'
      },
      {
        key: 'Sandwich',
        name: 'Sandwich Rating',
        value: getValue('Sandwich', ' stars'),
        specialattribute: <Icon name='star' size={30} color='white'/>,
        section: 'ratings'
      },
      {
        key: 'Texture',
        name: 'Texture Rating',
        value: getValue('Texture', ' stars'),
        specialattribute: <Icon name='star' size={30} color='white'/>,
        section: 'ratings'
      },
      
    ]

    setArray(dbExtract)


  }

  // option 1: manually create a view for each property that needs to be presented on screen
  // option 2: find a work around
  // option 3: post manual option on stackoverflow and request support


  // option 1: a manual breakdown of each section to be presented, with edit using modal on touch

  // create a component that returns a flatlist based on the 'section' input. EG <Display section='name' />

  function DisplayTiles (props) {
    let temp = []
    let test = Array.from(array)

    test.map(item =>
      {if(item.section === props.section){
        temp.push(item)
      }
      }
    )

    return (
      <View>
        <FlatList
          data={temp}
          keyExtractor={(item, index) => item + index}
          horizontal={false}
          numColumns={2}
          contentContainerStyle={{justifyContent: 'space-evenly'}}
          renderItem={({ item }) =>
              (
                <View style={styles.loafContainer}>
                  <TouchableOpacity 
                    style={styles.loafTiles}
                    onPress={()=>{
                      //navigation.navigate('View Loaf', {ID: item.ID})
                      }
                    }>

                    <View>
                      <Text style={styles.loafText}>{item.name}</Text>
                    </View>

                    <View style={{alignItems: 'center'}}>
                      {item.specialattribute}
                    </View>

                    <View>
                      <Text style={styles.loafText}>{item.value}</Text>
                    </View>

                  </TouchableOpacity>
                </View>
              )
          }
        />
      </View>
    )
  }


  function Name () {
    let loaf = loafData;
  
    return(
      <View>
        <TouchableOpacity>
          <Text style={styles.titleText}>{loaf.Name}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  function Intro () {
    return(
      <View>
        <FlatList
          data={array}
          keyExtractor={(item, index) => item + index}
          horizontal={false}
          numColumns={2}
          contentContainerStyle={{justifyContent: 'space-evenly'}}
          renderItem={({ item }) =>
              (
                <View style={styles.loafContainer}>
                  <TouchableOpacity 
                    style={styles.loafTiles}
                    onPress={()=>{
                      //navigation.navigate('View Loaf', {ID: item.ID})
                      }
                    }>

                    <View>
                      <Text style={styles.loafText}>{item.name}</Text>
                    </View>

                    <View style={{alignItems: 'center'}}>
                      {item.specialattribute}
                    </View>

                    <View>
                      <Text style={styles.loafText}>{item.value}</Text>
                    </View>

                  </TouchableOpacity>
                </View>
              )
          }
        />
      </View>
    )
  }


  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.page}>

        <Name />

        <Break />

        <DisplayTiles section='intro' />

        <Break />

        <ScrollView>

          <DisplayTiles section='flour' />

          <Break />

          <DisplayTiles section='ingredients' />

          <Break />

          <DisplayTiles section='prep' />

          <Break />

          <DisplayTiles section='baking' />

          <Break />

          <DisplayTiles section='ratings' />

        </ScrollView>

        <Break />
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <View><Button title='Back' onPress={() => navigation.navigate('Past Loaves') && setArray('')} /></View>
            <View><Button title='Print loafdata' onPress={()=>{
              console.log(loafData)
              console.log(array)
              console.log(Object.entries(loafData))
              }} /></View>
        </View>

      </View>
    </SafeAreaView>
  )
}

export { viewLoaf }