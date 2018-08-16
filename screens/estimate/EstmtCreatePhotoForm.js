import React from 'react';
import {ActivityIndicator,
  Clipboard,
  Image,
  StatusBar,
  StyleSheet,
  View,} from 'react-native'
import Exponent, { Constants, ImagePicker} from 'expo';
import {Body, Content, Card, CardItem, Container, Col, Form, Grid, Item, Label, Input, Header, Title, Button, Text, Picker, Textarea } from 'native-base';

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
    isLoadLrPhoto: false,
    isLoadKchPhoto: false,
    isLoadRm1Photo: false,
    isLoadRm2Photo: false,
    isLoadRm3Photo: false,
    isLoadRm4Photo: false,
    isLoadRm5Photo: false,
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
      <Content>
        <Card>
          <CardItem header button onPress={() => this._pickImage(LOCATION_ENTRANCE)}>
            <Text>현관사진 추가</Text>
          </CardItem>

          <CardItem bordered>
            <Body>
              {this.state.isLoadEntrPhoto ? (<Text> {this.state.photoData.entrPhoto} </Text>) : null}
            </Body>
          </CardItem>
        </Card>

        <Card>
          <CardItem cardBody>
            <Button primary onPress={() => this._pickImage(LOCATION_LIVINGROOM)} >
               <Text>거실사진 추가</Text>
            </Button>

            {this.state.isLoadLrPhoto ? (<Text> {this.state.photoData.lrPhoto} </Text>) : null}
          </CardItem>
        </Card>

        <Card>
          <CardItem cardBody>
            <Button primary onPress={() => this._pickImage(LOCATION_KETCHEN)} >
               <Text>부엌사진 추가</Text>
            </Button>

            {this.state.isLoadKchPhoto ? (<Text> {this.state.photoData.kchPhoto} </Text>) : null}
          </CardItem>
        </Card>

        <Card>
          <CardItem cardBody>
            <Button primary onPress={() => this._pickImage(LOCATION_ROOM1)} >
               <Text>방1사진 추가</Text>
            </Button>

            {this.state.isLoadRm1Photo ? (<Text> {this.state.photoData.rm1Photo} </Text>) : null}
          </CardItem>
        </Card>

        <Card>
          <CardItem cardBody>
            <Button primary onPress={() => this._pickImage(LOCATION_ROOM2)} >
               <Text>방2사진 추가</Text>
            </Button>

            {this.state.isLoadRm2Photo ? (<Text> {this.state.photoData.rm2Photo} </Text>) : null}
          </CardItem>
        </Card>

        <Card>
          <CardItem cardBody>
            <Button primary onPress={() => this._pickImage(LOCATION_ROOM3)} >
               <Text>방3사진 추가</Text>
            </Button>

            {this.state.isLoadRm3Photo ? (<Text> {this.state.photoData.rm3Photo} </Text>) : null}
          </CardItem>
        </Card>

        <Card>
          <CardItem cardBody>
            <Button primary onPress={() => this._pickImage(LOCATION_ROOM4)} >
               <Text>방4사진 추가</Text>
            </Button>

            {this.state.isLoadRm4Photo ? (<Text> {this.state.photoData.rm4Photo} </Text>) : null}
          </CardItem>
        </Card>

        <Card>
          <CardItem cardBody>
            <Button primary onPress={() => this._pickImage(LOCATION_ROOM5)} >
               <Text>방5사진 추가</Text>
            </Button>

            {this.state.isLoadRm5Photo ? (<Text> {this.state.photoData.rm5Photo} </Text>) : null}
          </CardItem>
        </Card>

        <Grid style={{marginTop: 100}}>
          <Col>
            <Button block  primary onPress={() => this.props.previousePage()}>
              <Text>이전</Text>
            </Button>
          </Col>
          <Col>
            <Button block success onPress={() => this.handleSubmit()}>
              <Text>다음</Text>
            </Button>
          </Col>
        </Grid>
        </Content>
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
      allowsEditing: false,
    });

    this._handleImagePicked(location, pickerResult);
  };

  _handleImagePicked = async (location, pickerResult) => {
    let imgUrl, uploadResponse;

    try {

      if(!pickerResult.cancelled)
      {
        uploadResponse  = await uploadImageAsync(pickerResult.uri);
        imgUrl          = await uploadResponse.text();

        console.log("Server return text: "+imgUrl);

        switch (location) {
          case LOCATION_ENTRANCE:
              this.setState({
                ...this.state,
                isLoadEntrPhoto: true,
                photoData: {
                  ...this.state.photoData,
                  entrPhoto: imgUrl
                }
              });
            break;
          case LOCATION_LIVINGROOM:
            this.setState({
              ...this.state,
              isLoadLrPhoto: true,
              photoData: {
                ...this.state.photoData,
                lrPhoto: imgUrl
              }
            });
            break;
          case LOCATION_KETCHEN:
            this.setState({
              ...this.state,
              isLoadKchPhoto: true,
              photoData: {
                ...this.state.photoData,
                kchPhoto: imgUrl
              }
            });
            break;
            case LOCATION_ROOM1:
              this.setState({
                ...this.state,
                isLoadRm1Photo: true,
                photoData: {
                  ...this.state.photoData,
                  rm1Photo: imgUrl
                }
              });
            break;
          case LOCATION_ROOM2:
            this.setState({
              ...this.state,
              isLoadRm2Photo: true,
              photoData: {
                ...this.state.photoData,
                rm2Photo: imgUrl
              }
            });
            break;
          case LOCATION_ROOM3:
            this.setState({
              ...this.state,
              isLoadRm3Photo: true,
              photoData: {
                ...this.state.photoData,
                rm3Photo: imgUrl
              }
            });
            break;
          case LOCATION_ROOM4:
            this.setState({
              ...this.state,
              isLoadRm4Photo: true,
              photoData: {
                ...this.state.photoData,
                rm4Photo: imgUrl
              }
            });
            break;
          case LOCATION_ROOM5:
            this.setState({
              ...this.state,
              isLoadRm5Photo: true,
              photoData: {
                ...this.state.photoData,
                rm5Photo: imgUrl
              }
            });
            break;
          default:
        }
      }
     }catch(e) {
       alert('Upload failed, sorry :('+e.message);
       this.setState({
         isLoadEntrPhoto: false
       });
     } finally {
     }
  };
}


  async function uploadImageAsync(uri) {
    //TODO URL properties로 빼기,
    let apiUrl = "http://moduisa.ap-northeast-2.elasticbeanstalk.com/api/v1/common/image/upload";

    // Note:
    // Uncomment this if you want to experiment with local server
    //
    // if (Constants.isDevice) {
    //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
    // } else {
    //   apiUrl = `http://localhost:8080/upload`
    // }

    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let now     = new Date();
    let nowTime = now.getTime();

    let formData = new FormData();
    formData.append('imgName', 'tobedelete');

    formData.append('img', {
      uri,
      name: `isa_photo_+${nowTime}.${fileType}`,
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
