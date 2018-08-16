import React from 'react';
import {StyleSheet, View, WebView, Alert} from 'react-native';
import {Button, Container, Content, Col, Grid, Label, Input, Icon, Item, Text, Picker} from 'native-base';
import {validate} from '../../utils/validation';


export default class EstmtCreateCMInfoForm extends React.Component {
  //Constructor & Static
  constructor(props){
    super(props);

    this.state={
      errorMessage: '',
      regidentTypeError: false,
      regidentTypeErrorMessage: '',
      floorError: false,
      floorErrorMessage: '',
      spaceError: false,
      spaceErrorMessage: '',
      conditionError: false,
      conditionErrorMessage: '',
      cmData: {
        cmAddress : '',
        cmAddressDetail : '',
        cmRegidentType: '아파트',
        cmFloor: 0,
        cmSpace: 0,
        cmWorkCondition: '',
      }
    };
  }
  propTypes: {
    saveCMInfo: React.PropTypes.func.isRequired,
    previousePage: React.PropTypes.func.isRequired,
  };

  render() {
      return (
        <Container>
          <Content padder>
            <WebView
                source={{uri: 'https://jb9229.github.io/postcode/'}}
                style={{flex: 1, height: 370}}
                mixedContentMode='always'
                onMessage={(event)=> this.savePostData(event.nativeEvent.data) }
            />
            <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>

            <Item picker error={this.state.regidentTypeError} style={[styles.inputItem, this.state.regidentTypeError?styles.inputItemError:null]}>
              <Label>거주 형태</Label>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                selectedValue={this.state.cmData.cmRegidentType}
                autoCorrect={false}
                onValueChange={(itemValue, itemIndex)  => {
                  this.setState({...this.state, cmData: {...this.state.cmData, cmRegidentType: itemValue}});
                  let v = validate('text', itemValue, true);
                  this.setState({regidentTypeError: !v[0], regidentTypeErrorMessage: v[1]});
                }}
              >
                <Picker.Item label="아파트" value="아파트" />
                <Picker.Item label="빌라" value="빌라" />
                <Picker.Item label="단독주택" value="단독주택" />
              </Picker>
            </Item>
            <Item stackedLabel error={this.state.floorError} style={[styles.inputItem, this.state.floorError?styles.inputItemError:null]}>
              <Label>층수</Label>
              <Input
                autoCorrect={false}
                keyboardType='numeric'
                onChangeText={(text) => {
                  this.setState({...this.state, cmData: {...this.state.cmData, cmFloor: text}});
                  let v = validate('decimal', text, true);
                  this.setState({floorError: !v[0], floorErrorMessage: v[1]});
                }}
              />
            </Item>
            <Text style={styles.errorMessage}>{this.state.floorErrorMessage}</Text>

            <Item stackedLabel error={this.state.spaceError} style={[styles.inputItem, this.state.spaceError?styles.inputItemError:null]}>
              <Label>평수</Label>
              <Input
                autoCorrect={false}
                keyboardType='numeric'
                onChangeText={(text) => {
                  this.setState({...this.state, cmData: {...this.state.cmData, cmSpace: text}});
                  let v = validate('decimal', text, true);
                  this.setState({spaceError: !v[0], spaceErrorMessage: v[1]});
                }}
              />
            </Item>
            <Text style={styles.errorMessage}>{this.state.spaceErrorMessage}</Text>

            <Item stackedLabel error={this.state.conditionError} style={[styles.inputItem, this.state.conditionError?styles.inputItemError:null]}>
              <Label>작업조건</Label>
              <Input
                autoCorrect={false}
                onChangeText={(text) => {
                  this.setState({...this.state, cmData: {...this.state.cmData, cmWorkCondition: text}});
                  let v = validate('text', text, true);
                  this.setState({conditionError: !v[0], conditionErrorMessage: v[1]});
                }}
              />
            </Item>
            <Text style={styles.errorMessage}>{this.state.conditionErrorMessage}</Text>

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
        </Container>
      );
  }

  savePostData = (postDataJson) => {
    var postDataObj = JSON.parse(postDataJson);

    console.log('Debug postDataJson: '+ postDataJson)
    this.setState({
      ...this.state,
      cmData: {
        ...this.state.cmData,
        cmAddress : postDataObj.address,
        cmAddressDetail : postDataObj.addressDetail,
      }
    });
  }

  //Method of Submit Info Validation
  isValidSubmitInfo = () => {
    let postDataObj = this.state.cmData;

    if(postDataObj.cmAddress == ''){this.setState({errorMessage: '현거주지 주소는 필수 항목 입니다, 주소를 입력해 주세요.'}); return false;}
    if(postDataObj.cmAddressDetail == ''){this.setState({errorMessage: '현거주지 상세주소는 필수 항목 입니다, 주소를 입력해 주세요.'}); return false;}

    var v = validate('text', this.state.cmData.cmRegidentType, true);
    if(!v[0])
    {
      console.log('invalid cmRegidentType');
      this.setState({residentTypeError: !v[0], residentTypeErrorMessage: v[1]});
      return false;
    }

    var v = validate('text', this.state.cmData.cmFloor, true);
    if(!v[0])
    {
      console.log('invalid cmFloor');
      this.setState({floorError: !v[0], floorErrorMessage: v[1]});
      return false;
    }

    var v = validate('text', this.state.cmData.cmSpace, true);
    if(!v[0])
    {
      console.log('invalid cmSpace');
      this.setState({spaceError: !v[0], spaceErrorMessage: v[1]});
      return false;
    }


    return true;
  }

  //Method of Save Estimate Address Info
  handleSubmit() {
    let isValid = this.isValidSubmitInfo();

    if(!isValid){return;}

    this.props.saveCMInfo(this.state.cmData);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: 350,
    height:450,
  },
  errorMessage: {
    color: 'red'
  },
  inputItemError: {
    borderColor: 'red'
  },
});
