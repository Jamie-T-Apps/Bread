import React, { useState, Children, PureComponent } from 'react';
import {
  View,
  Text,
  
} from 'react-native';
import { deleteDatabase, openDatabase } from 'react-native-sqlite-storage';
import { RNCamera } from 'react-native-camera';

//import custom components
import { styles, Break } from './MasterStyles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ingredients } from './inputData';

var db = openDatabase({name: 'bread', createFromLocation: '~www/bread.db' });

class CameraPage extends PureComponent {
    constructor(props) {
        super(props);
      }
    render() {
        console.log(this.props.ID)
    return (
    <View style={styles.page}>
        <RNCamera
        ref={ref => {
            this.camera = ref;
        }}
        style={styles.container}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
        }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
        </TouchableOpacity>
        </View>
    </View>
    );
}

takePicture = async () => {
    if (this.camera) {
    const options = { quality: 0.5, base64: true };
    const data = await this.camera.takePictureAsync(options);
    console.log(data.uri);
    }
};

}

export { CameraPage }