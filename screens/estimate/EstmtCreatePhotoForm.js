import React from 'react';
import {ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,} from 'react-native'
  import Exponent, { Constants, ImagePicker, registerRootComponent } from 'expo';

export default class EstmtCreatePhotoForm extends React.Component{
  state = {
    image: null,
    uploading: false,
  };


  render() {
    let {image} = this.state;

    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>
          Example: Upload ImagePicker Result
        </Text>

        <Button onPress={this._pickImage} title="Pick an image from camera roll"/>

        <Button onPress={this._takePhoto} title="Take a photo" />

        {this._maybeRenderImage()}
        {this._maybeRenderUploadingOverlay()}

        <StatusBar barStyle="default" />
      </View>
    );
  }


  _maybeRenderUploadingOverlay = () => {
    if(this.state.uploading) {
      return (
        <View>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let {image} = this.state;

    if(!image) {return ;}

    return (
      <View>
        <View>
          <Image source={{uri: image}} style={{width: 250, height: 250}} />
        </View>

        <Text>
          {image}
        </Text>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title:'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async() => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect:[4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect:[4, 3],
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({uploading: true});

      if(!pickerResult.cancelled) {
        uploadResponse  = await uploadImageAsync(pickerResult.uri);
        uploadResult    = await uploadResponse.json();
        this.setState({image: uploadResult.location});
      }
    }catch(e){
      console.log({uploadResponse});
      console.log({uploadResult});
      console.log({e});
      alert('upload failed, sorry :');
    } finally {
      this.setState({ uploading: false});
    }
  };
}


async function uploadImageAsync(uri) {
  let apiUrl = "https://file-upload-example-backend-dkhqoilqqn.now.sh/upload";

  // Note:
  // Uncomment this if you want to experiment with local server
  //
  // if (Constants.isDevice) {
  //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
  // } else {
  //   apiUrl = `http://localhost:3000/upload`
  // }

  let uriParts = uri.split('.');
  let fileType = uri[uri.length - 1];

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(apiUrl, options);
}