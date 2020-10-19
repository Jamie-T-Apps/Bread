import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  FlatList,
  PermissionsAndroid,
  Platform
} from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { deleteDatabase, openDatabase } from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/Entypo';
import RNFetchBlob from 'rn-fetch-blob'


//import custom components
import { styles, Break } from './MasterStyles';


var db = openDatabase({name: 'bread', createFromLocation: '~www/bread.db' });

function loafHistory( { navigation }) {

  const [loafList, setLoafList] = useState('');

  // insert query that checks the number of rows in the database and updates the page

  function dbcall() {
  // create DB console log map here?
  console.log(`function start`);

    db.transaction(tx => {
      console.log(`db. run`);

      tx.executeSql("SELECT * FROM bread", [], (tx, results) => {
        console.log(`Rows:`, results.rows.length);
        let temp =[];
        for(let i = 0; i < results.rows.length; ++i){
          temp.push(results.rows.item(i));
        }
        setLoafList(temp);
        return
      }, 
      
      tx => {console.log(`error, query didn't run`)});

      console.log(`db. end`);
      return
    });

    console.log(`function end`);
  }

  function dbdelete() {
    console.log(`function start`);

    deleteDatabase({
      name: "bread",        
      location: "~www/bread.db"  
    }, function (res) {
      if(res == "database removed") {
        console.log(`database removed`)
        openDatabase({name: 'bread', createFromLocation: '~www/bread.db' })
      }
    });
  }

  const dbexport = async () => {
      try {
        if(Platform.OS === 'ios'){
          dbcall()
          createCSV()
        }else{
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: "Bread App File Storage Permission",
              message:
                "Bread App needs access to your file storage " +
                "to create a CSV backup.",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              dbcall()
              createCSV()
            } else {
              console.log("WRITE_EXTERNAL_STORAGE permissions denied");
            }
          }
      } catch (err) {
        console.warn(err);
      }
    };


  function createCSV() {

    console.log(loafList)

    // construct csvString
    //const headerString = 'AllPurposeFlour,Butter,Colour,Comment,Container,Crust,Density,FirstProve,ID,KneadTime,Milk,MyDate,MyTime,Name,Oil,OvenTemp1,OvenTemp2,OvenTime1,OvenTime2,Photo,Rating,Salt,Sandwich,SecondProve,Size,StarterorYeast,Sugar,Taste,Texture,Toast,TypeOfBreadSourdoughLoaf,Water,WaterVolume,WhiteFlour,WhiteWholewheatFlour,WholewheatFlour\n';
    const dirPath = Platform.OS === 'ios' ? RNFetchBlob.fs.dirs.DocumentDir : RNFetchBlob.fs.dirs.DownloadDir;
    const headerString = loafList.map(d => `${Object.keys(d)}\n`).join('');
    const rowString = loafList.map(d => `${Object.values(d)}\n`).join('');
    const csvString = `${headerString}${rowString}`;

    // write the current list of answers to a local csv file
    const pathToWrite = `${dirPath}/BreadBackup.csv`;
    console.log('pathToWrite', pathToWrite);
    // pathToWrite /storage/emulated/0/Download/BreadBackup.csv
    RNFetchBlob.fs
      .writeFile(pathToWrite, csvString, 'utf8')
      .then(() => {
        console.log(`wrote file ${pathToWrite}`);
        // wrote file /storage/emulated/0/Download/data.csv
      })
      .catch(error => console.error(error));
  }

  function debug() {

    let newArray = [...loafList]

    console.log(newArray)


    newArray.map(item => {
      console.log(Object.values(item));
    })

  }

  
  function LoafLibrary() {
    
    return(
      <View style={{flex: 1}}>
        <FlatList
          data={loafList}
          horizontal={false}
          numColumns={2}
          contentContainerStyle={{justifyContent: 'space-evenly'}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableHighlight
              key={item.ID}>

              <View style={styles.loafContainer}>
                <TouchableOpacity 
                  style={styles.loafTiles}
                  onPress={()=>{
                    navigation.navigate('View Loaf', {ID: item.ID})
                    }
                  }>

                  <View>
                    <Text style={styles.loafText}>{item.Name}</Text>
                  </View>

                  <View style={{alignItems: 'center'}}>
                    <Icon name='image' size={50} color='white'/>
                  </View>

                  <View>
                    <Text style={styles.loafText}>{item.TypeOfBread}</Text>
                  </View>

                </TouchableOpacity>
              </View>

            </TouchableHighlight>
            
          )}
        />
      </View>
    );
  }

  /*
  <Button title='DB Call' onPress={dbcall} />
        <Break />
        <Button title='LoafList' onPress={()=>{console.log(loafList)}} />
        <Break />
  */

  /*
  DEBUG BUTTON - DELETE DB

  <View style={{flex:1, padding: 5}}>
            <Button title='DB Delete' onPress={dbdelete} />
          </View>

  */

  /*
  DEBUG BUTTON - LOAFLIST

  <View style={{flex:1, padding: 5}}>
            <Button title='loafList' onPress={debug} />
          </View>

  */

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.page}>
        <Text style={styles.titleText}>Previous Loaves</Text>
        <Break />

        <View style={{flexDirection: 'row'}}>
          
          <View style={{flex:1, padding: 5}}>
            <Button title='DB Refresh' onPress={dbcall} />
          </View>
          <View style={{flex:1, padding: 5}}>
            <Button title='DB Export' onPress={dbexport} />
          </View>
        
        </View>
        
        <Break />
        <LoafLibrary />
      </View>
    </SafeAreaView>
  );
}


export { loafHistory }