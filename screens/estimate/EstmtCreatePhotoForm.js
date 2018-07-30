import React from 'react';
import {ActivityIndicator,
  Clipboard,
  Image,
  StatusBar,
  StyleSheet,
  View,} from 'react-native'
import Exponent, { Constants, ImagePicker} from 'expo';
import {Card, CardItem, Container, Grid, Item, Label, Input, Header, Body, Content, Title, Button, Text, Picker, Textarea } from 'native-base';

const LOCATION_ENTRANCE = "entr";
const LOCATION_LIVINGROOM = "lv";
const LOCATION_KETCHEN = "kch";
const LOCATION_ROOM1 = "rm1";
const LOCATION_ROOM2 = "rm2";
const LOCATION_ROOM3 = "rm3";
const LOCATION_ROOM4 = "rm4";
const LOCATION_ROOM5 = "rm5";

export default class EstmtCreatePhotoForm extends React.Component{
  state = {
    isLoadEntrPhoto: false,
    photoData: {
      entrPhoto: '',
      lrPhoto: '',
      kchPhoto: '',
      rm1Photo: '',
      rm2Photo: '',
      rm3Photo: '',
      rm4Photo: '',
      rm5Photo: '',
    }
  };


  render() {
    return(
      <Container>
        <Content padder>
          <Button primary onPress={() => this._pickImage('entr')} >
             <Text>현관사진 추가</Text>
          </Button>


          {this.state.isLoadEntrPhoto ? (<Image source={{uri: this.state.photoData.entrPhoto}} />) : null}



          {this._maybeRenderUploadingOverlay()}

          <StatusBar barStyle="default" />

          <Grid>
            <Button large  primary onPress={() => this.props.previousePage()}>
              <Text>이전</Text>
            </Button>
            <Button large success onPress={() => this.handleSubmit()}>
              <Text>다음</Text>
            </Button>
          </Grid>
        </Content>
      </Container>
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

  //Method of Save Estimate Photo Info
  handleSubmit() {

    this.props.savePhotoInfo(this.state.photoData);
  }

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _pickImage = async (location) => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect:[4, 3],
    });

    this._handleImagePicked(location, pickerResult);
  };

  _handleImagePicked = async (location, pickerResult) => {
    let uploadUrl;


    if(!pickerResult.cancelled)
    {
      uploadUrl  = await uploadImageAsync(pickerResult.uri);

      console.log(uploadUrl);
      switch (location) {
        case LOCATION_ENTRANCE:
            this.setState({
              isLoadEntrPhoto: true,
              photoData: {
                entrPhoto: uploadUrl
              }
            });
          break;
        default:

      }
    }
  };
}


async function uploadImageAsync(uri) {
  let apiUrl = "http://localhost:8080/api/v1/common/image/upload";

  // Note:
  // Uncomment this if you want to experiment with local server
  //
  // if (Constants.isDevice) {
  //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
  // } else {
  //   apiUrl = `http://localhost:8080/upload`
  // }

  let uriParts = uri.split('.');
  let fileType = uri[uri.length - 1];

  var now = new Date();

  let formData = new FormData();
  // formData.append('img', uri);
  formData.append('imgName', "estimateEntrPhoto_"+now.getMilliseconds()+".jpg");

  formData.append('img', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });



  fetch(apiUrl,
  {   method: 'POST',
      contentType: false,
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }
  })
  .then(
      res => console.log(res)
  )
  .catch( err => console.error(err))
}
