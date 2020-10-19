//import library components
import 'react-native-gesture-handler';
import React from 'react';

// custom imports
import { HomeScreen } from './Components/HomeScreen';
import { addNewLoaf } from './Components/addLoafScreen';
import { loafHistory } from './Components/LoafHistoryScreen';
import { viewLoaf } from './Components/viewLoafScreen';
import { editLoaf } from './Components/editLoaf';
import { CameraPage } from './Components/cameraPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// start main body of application

const AddLoafStack = createStackNavigator();

function AddLoafStackScreen() {
  return (
    <AddLoafStack.Navigator
      headerMode='none'>

      <AddLoafStack.Screen name="New Loaf" component={addNewLoaf} />
      
    </AddLoafStack.Navigator>
  );
}

const LoafHistoryStack = createStackNavigator();

function LoafHistoryStackScreen() {
  return (
    <LoafHistoryStack.Navigator 
      headerMode='none'>

      <LoafHistoryStack.Screen name="Past Loaves" component={loafHistory}/>
      <LoafHistoryStack.Screen name="View Loaf" component={viewLoaf} />
      <LoafHistoryStack.Screen name="Edit Loaf" component={editLoaf} />
      <LoafHistoryStack.Screen name="Camera" component={CameraPage} />

    </LoafHistoryStack.Navigator>
  );
}

export default function App() {

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
            activeBackgroundColor: '#231f32',
            inactiveBackgroundColor: '#231f32',
            activeTintColor: 'white',
            inactiveTintColor: '#556353',
            style: {
                // insert style for the icons here?
            },
            keyboardHidesTabBar: true,
            labelPosition: 'beside-icon',
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="New Loaf" component={AddLoafStackScreen} />
            <Tab.Screen name="Past Loaves" component={LoafHistoryStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}
