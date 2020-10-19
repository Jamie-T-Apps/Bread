
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

function Break() {
    // this is the line break that can be used to separate components on the main page
    return <View style={styles.break} />
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#342e29',
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
      flex: 1,
      padding: 10,
    },
    page: {
      alignContent: 'center',
      backgroundColor: '#556353',
      flex: 1,
      padding: 10,
    },
    titleText: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'white',
    },
    inputText:{
      backgroundColor: 'white',
      padding: 5,
      borderColor: '#231f32',
      borderWidth: 2,
      marginVertical: 5,
      textAlign: 'center',
    },
    pageText: {
      fontStyle: 'italic',
      textAlign: 'center',
    },
    metricContainer: {
      backgroundColor: '#231f32',
      padding: 5,
      marginVertical: 5,
      flexDirection: 'row',
    },
    metricTitle: {
      fontWeight: 'bold',
      marginVertical: 10,
      fontSize: 15,
      color: 'white',
    },
    metricText: {
      color: 'white',
    },
    break: {
      marginVertical: 8,
      borderBottomColor: 'white',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    circle: {
		height: 20,
		width: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#ACACAC',
		alignItems: 'center',
		justifyContent: 'center',
	},
	checkedCircle: {
		width: 14,
		height: 14,
		borderRadius: 7,
		backgroundColor: '#794F9B',
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "#556353",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
    },
    ingredientsContainer: {
        backgroundColor: '#231f32',
        padding: 5,
        marginVertical: 5,
        flexDirection: 'column',
    },
    ingredientsText: {
      color: 'white',
      textAlign: 'center',
    },
    loafContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: 5,
    },
    loafTiles: {
      backgroundColor: '#231f32',
      width: (width / 2)  - 30,
      padding: 5,
    },
    loafText: {
      color: 'white',
      textAlign: 'center',
    },
});

  export { styles, Break }
  