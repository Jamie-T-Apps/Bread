import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  ScrollView
} from 'react-native';
import { deleteDatabase, openDatabase } from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/Entypo';

//import custom components
import { styles, Break } from './MasterStyles';

var db = openDatabase({name: 'bread', createFromLocation: '~www/bread.db' });

function viewLoaf( { route, navigation } ){
  
  const { ID } = route.params; // pulls the loaf ID from the tile pressed to get to this page
  const [loafData, setLoafData] = useState('');
  const [modal, setModal] = useState(false);
  const [editableProp, setEditableProp] = useState('');
  

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
        return
      });
  }

  // type
  //image
  //ingredients
  //proving process
  //cooking method

  function Type() {
      let type;

      if(!loafData.TypeOfBread){
          type = "Hmm...We have a problem...your loaf has no type!"
      }else{
          type = loafData.TypeOfBread;
      }

      return <View><Text style={styles.loafText}>{type}</Text></View>
  }

  function Image() {
      let image;

      if(!loafData.Photo){
          image = <Icon name='image' size={50} color='white'/>
      }else{
          image = loafData.Photo;
      }

      return <View style={{alignItems: 'center'}}>{image}</View>
  }

  function Ingredients() {
      // create an array from the DB entries and section list this
      return <View><Text style={styles.loafText}>Thinking about how best to set up ingredients which will depend largely on how they are displayed</Text></View>
  }

  function Proving() {
      
      let prove1;
      let prove2;

      if(!loafData.FirstProve){
          prove1 = "None"
      }else{
          prove1 = loafData.FirstProve
      }

      if(!loafData.SecondProve){
          prove2 = "None"
      }else{
          prove2 = loafData.SecondProve
      }

      return(
          <View style={{flexDirection: 'row', flexWrap: 'wrap', padding: 5, justifyContent: 'space-evenly'}}>

            <View style={{backgroundColor: '#231f32',padding: 5}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{padding: 5}}>
                        <Icon name='clock' size={30} color='white' />
                    </View>
                    <View style={{flexDirection: 'column'}}>
                        <View>
                            <Text style={styles.loafText}>First Prove:</Text>
                        </View>
                        <View>
                            <Text style={styles.loafText}>{prove1} hour(s)</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{backgroundColor: '#231f32', padding: 5}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{padding: 5}}>
                        <Icon name='clock' size={30} color='white' />
                    </View>
                    <View style={{flexDirection: 'column'}}>
                        <View>
                            <Text style={styles.loafText}>Second Prove:</Text>
                        </View>
                        <View>
                            <Text style={styles.loafText}>{prove2} hour(s)</Text>
                        </View>
                    </View>
                </View>
            </View>

          </View>
      )   
  }

  function Method() {
 
      let kneed;
      let temp1;
      let time1;
      let temp2;
      let time2;
      let container;
      let water;

      if(!loafData.KneedTime){
          kneed = 'None'
      }else{
          kneed = loafData.KneedTime
      }

      if(!loafData.OvenTemp1){
          temp1 = 'None'
      }else{
          temp1 = loafData.OvenTemp1
      }

      if(!loafData.OvenTime1){
          time1 = 'None'
      }else{
          time1 = loafData.OvenTime1
      }

      if(!loafData.OvenTemp2){
        temp2 = 'None'
    }else{
        temp2 = loafData.OvenTemp2
    }

    if(!loafData.OvenTime2){
        time2 = 'None'
    }else{
        time2 = loafData.OvenTime2
    }

    if(!loafData.Container){
        container = 'None'
    }else{
        container = loafData.Container
    }

    if(!loafData.WaterVolume){
        water = 'None'
    } else {
        water = loafData.WaterVolume
    }

    return (

        <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', padding: 5, justifyContent: 'space-evenly'}}>

                <View style={{backgroundColor: '#231f32',padding: 5}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{padding: 5}}>
                            <Icon name='hand' size={30} color='white' />
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <View>
                                <Text style={styles.loafText}>Kneed Time:</Text>
                            </View>
                            <View>
                                <Text style={styles.loafText}>{kneed} mins</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{backgroundColor: '#231f32', padding: 5}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{padding: 5}}>
                            <Icon name='inbox' size={30} color='white' />
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <View>
                                <Text style={styles.loafText}>Container:</Text>
                            </View>
                            <View>
                                <Text style={styles.loafText}>{container}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{backgroundColor: '#231f32', padding: 5}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{padding: 5}}>
                            <Icon name='drop' size={30} color='white' />
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <View>
                                <Text style={styles.loafText}>Water Volume:</Text>
                            </View>
                            <View>
                                <Text style={styles.loafText}>{water} ml</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>


            <View style={{flexDirection: 'row', flexWrap: 'wrap', padding: 5, justifyContent: 'space-evenly'}}>
                <View style={{backgroundColor: '#231f32', padding: 5}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{padding: 5}}>
                            <Icon name='thermometer' size={30} color='white' />
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <View>
                                <Text style={styles.loafText}>First Cook Temp: {temp1} C</Text>
                            </View>
                            <View>
                                <Text style={styles.loafText}>First Cook Time: {time1} mins</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{flexDirection: 'row', flexWrap: 'wrap', padding: 5, justifyContent: 'space-evenly'}}>
                <View style={{backgroundColor: '#231f32', padding: 5}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{padding: 5}}>
                            <Icon name='thermometer' size={30} color='white' />
                        </View>
                        <View style={{flexDirection: 'column'}}>
                            <View>
                                <Text style={styles.loafText}>Second Cook Temp: {temp2} C</Text>
                            </View>
                            <View>
                                <Text style={styles.loafText}>Second Cook Time: {time2} mins</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

          </View>
    )
      
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.page}>
        <Text style={styles.titleText}>{loafData.Name}</Text>
        <Break />

        <ScrollView>
            <View style={{flex: 1}}>

                
                <Type />
                
                    <Break />

                <Image />

                    <Break /> 

                <Ingredients />

                    <Break />

                <Proving />

                    <Break />

                <Method />

            </View>
        </ScrollView>

        <Break />
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <View><Button title='Back' onPress={() => navigation.navigate('Past Loaves')} /></View>
            <View><Button title='Print loafdata' onPress={()=>console.log(loafData)} /></View>
        </View>

      </View>
    </SafeAreaView>
  )
}

export { viewLoaf }