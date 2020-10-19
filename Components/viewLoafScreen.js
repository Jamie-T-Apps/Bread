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
  const [array, setArray] = useState('');
  
  if(!loafData){
    dbcall()
  }
  
  function dbcall () {
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
      if(!units){
        units = ''
      }
      if(loafData[e]){
        return loafData[e] + units
      } else {
        let string = e.replace(/([A-Z])/g, ' $1').trim()
        return `Add ${string}`
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
        section: 'misc',
        editProp: 'none',
        units: 'none'
      },
      {
        key: 'Name',
        name: 'Name',
        value: getValue('Name'),
        specialattribute: null,
        section: 'misc',
        editProp: 'text',
        units: 'none'
      },
      {
        key: 'MyTime',
        name: 'Time',
        value: getValue('MyTime'),
        specialattribute: null,
        section: 'misc',
        editProp: 'none',
        units: 'none'
      },
      {
        key: 'MyDate',
        name: 'Date',
        value: getValue('MyDate'),
        specialattribute: null,
        section: 'misc',
        editProp: 'none',
        units: 'none'
      },
      //intro section with headline details for the loaf
      {
        key: 'Photo',
        name: 'Photo',
        value: getValue('Photo'),
        specialattribute: <Icon name='image' size={50} color='white'/>,
        section: 'intro',
        editProp: 'image',
        units: 'none'
      },
      {
        key: 'Comment',
        name: 'Comment',
        value: getValue('Comment'),
        specialattribute: null,
        section: 'intro',
        editProp: 'longtext',
        units: 'none'
      },
      {
        key: 'Rating',
        name: 'Rating',
        value: getValue('Rating', ' stars'),
        specialattribute: <Icon name='star' size={30} color='white'/>,
        section: 'intro',
        editProp: 'slider',
        units: 'stars'
      },
      {
        key: 'TypeOfBread',
        name: 'Type Of Loaf',
        value: getValue('TypeOfBread'),
        specialattribute: null,
        section: 'intro',
        editProp: 'picker',
        units: 'none'
      },
      
      // types of flour used
      {
        key: 'WhiteFlour',
        name: 'White Flour',
        value: getValue('WhiteFlour', ' gr'),
        specialattribute: null,
        section: 'flour',
        editProp: 'digits',
        units: 'grams'
      },
      {
        key: 'AllPurposeFlour',
        name: 'All Purpose Flour',
        value: getValue('AllPurposeFlour', ' gr'),
        specialattribute: null,
        section: 'flour',
        editProp: 'digits',
        units: 'grams'
      }, 
      {
        key: 'WholeWheatFlour',
        name: 'Whole Wheat Flour',
        value: getValue('WholeWheatFlour', ' gr'),
        specialattribute: null,
        section: 'flour',
        editProp: 'digits',
        units: 'grams'
      },
      {
        key: 'WhiteWholeWheatFlour',
        name: 'White Whole Wheat Flour',
        value: getValue('WhiteWholeWheatFlour', ' gr'),
        specialattribute: null,
        section: 'flour',
        editProp: 'digits',
        units: 'grams'
      },
      // other ingredients used
      {
        key: 'Salt',
        name: 'Salt',
        value: getValue('Salt', ' gr'),
        specialattribute: null,
        section: 'ingredients',
        editProp: 'digits',
        units: 'grams'
      },
      {
        key: 'StarterorYeast',
        name: 'Starter (or Yeast)',
        value: getValue('StarterorYeast', ' gr'),
        specialattribute: null,
        section: 'ingredients',
        editProp: 'digits',
        units: 'grams'
      },
      {
        key: 'Water',
        name: 'Water',
        value: getValue('Water', ' ml'),
        specialattribute: null,
        section: 'ingredients',
        editProp: 'digits',
        units: 'grams'
      },
      {
        key: 'Sugar',
        name: 'Sugar',
        value: getValue('Sugar', ' gr'),
        specialattribute: null,
        section: 'ingredients',
        editProp: 'digits',
        units: 'grams'
      },
      {
        key: 'Butter',
        name: 'Butter',
        value: getValue('Butter', ' gr'),
        specialattribute: null,
        section: 'ingredients',
        editProp: 'digits',
        units: 'grams'
      },
      {
        key: 'Milk',
        name: 'Milk',
        value: getValue('Milk', ' ml'),
        specialattribute: null,
        section: 'ingredients',
        editProp: 'digits',
        units: 'ml'
      },
      {
        key: 'Oil',
        name: 'Oil',
        value: getValue('Oil', ' ml'),
        specialattribute: null,
        section: 'ingredients',
        editProp: 'digits',
        units: 'ml'
      },
      {
        key: 'Eggs',
        name: 'Eggs',
        value: getValue('Eggs', ' eggs'),
        specialattribute: null,
        section: 'ingredients',
        editProp: 'digits',
        units: 'eggs'
      },
      // preparation information
      {
        key: 'FirstProve',
        name: '1st Prove',
        value: getValue('FirstProve', ' hours'),
        specialattribute: null,
        section: 'prep',
        editProp: 'digits',
        units: 'mins'
      },
      {
        key: 'SecondProve',
        name: '2nd Prove',
        value: getValue('SecondProve', ' hours'),
        specialattribute: null,
        section: 'prep',
        editProp: 'digits',
        units: 'mins'
      },
      {
        key: 'KneedTime',
        name: 'Kneed Time',
        value: getValue('KneedTime', ' mins'),
        specialattribute: null,
        section: 'prep',
        editProp: 'digits',
        units: 'mins'
      },
      // details relating to how the loaf was baked
      {
        key: 'OvenTemp1',
        name: '1st Oven Temp',
        value: getValue('OvenTemp1', ' C'),
        specialattribute: null,
        section: 'baking',
        editProp: 'digits',
        units: 'C'
      },
      {
        key: 'OvenTime1',
        name: '1st Time',
        value: getValue('OvenTime1', ' mins'),
        specialattribute: null,
        section: 'baking',
        editProp: 'digits',
        units: 'mins'
      },
      {
        key: 'OvenTemp2',
        name: '2nd Oven Temp',
        value: getValue('OvenTemp2', ' C'),
        specialattribute: null,
        section: 'baking',
        editProp: 'digits',
        units: 'C'
      },
      {
        key: 'OvenTime2',
        name: '2nd Time',
        value: getValue('OvenTime2', ' mins'),
        specialattribute: null,
        section: 'baking',
        editProp: 'digits',
        units: 'mins'
      },
      {
        key: 'WaterVolume',
        name: 'Water Volume',
        value: getValue('WaterVolume', ' ml'),
        specialattribute: null,
        section: 'baking',
        editProp: 'digits',
        units: 'ml'
      },
      // ratings information
      {
        key: 'Crust',
        name: 'Crust Rating',
        value: getValue('Crust', ' stars'),
        specialattribute: <Icon name='star' size={30} color='white'/>,
        section: 'ratings',
        editProp: 'slider',
        units: 'stars'
      },
      {
        key: 'Density',
        name: 'Density Rating',
        value: getValue('Density', ' stars'),
        specialattribute: <Icon name='star' size={30} color='white'/>,
        section: 'ratings',
        editProp: 'slider',
        units: 'stars'
      },
      {
        key: 'Colour',
        name: 'Colour Rating',
        value: getValue('Colour', ' stars'),
        specialattribute: <Icon name='star' size={30} color='white'/>,
        section: 'ratings',
        editProp: 'slider',
        units: 'stars'
      },
      {
        key: 'Taste',
        name: 'Taste Rating',
        value: getValue('Taste', ' stars'),
        specialattribute: <Icon name='star' size={30} color='white'/>,
        section: 'ratings',
        editProp: 'slider',
        units: 'stars'
      },
      {
        key: 'Size',
        name: 'Size Rating',
        value: getValue('Size', ' stars'),
        specialattribute: <Icon name='star' size={30} color='white'/>,
        section: 'ratings',
        editProp: 'slider',
        units: 'stars'
      },
      {
        key: 'Toast',
        name: 'Toast Rating',
        value: getValue('Toast', ' stars'),
        specialattribute: <Icon name='star' size={30} color='white'/>,
        section: 'ratings',
        editProp: 'slider',
        units: 'stars'
      },
      {
        key: 'Sandwich',
        name: 'Sandwich Rating',
        value: getValue('Sandwich', ' stars'),
        specialattribute: <Icon name='star' size={30} color='white'/>,
        section: 'ratings',
        editProp: 'slider',
        units: 'stars'
      },
      {
        key: 'Texture',
        name: 'Texture Rating',
        value: getValue('Texture', ' stars'),
        specialattribute: <Icon name='star' size={30} color='white'/>,
        section: 'ratings',
        editProp: 'slider',
        units: 'stars'
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
                      navigation.navigate('Edit Loaf', {ID: ID, Key: item.key, Trait: item.name, editProp: item.editProp, Units: item.units, })
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
        <TouchableOpacity
          onPress={()=>{
              navigation.navigate('Edit Loaf', {ID: ID, Key: 'Name', Trait: loaf.Name, editProp: 'text'})
            }
          }>
          <Text style={styles.titleText}>{loaf.Name}</Text>
        </TouchableOpacity>
      </View>
    )
  }


  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.page}>

        <Name />

        <Break />

        <ScrollView>

          <DisplayTiles section='intro' />

          <Break />

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

export { viewLoaf }