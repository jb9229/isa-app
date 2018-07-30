import React from 'react';
import Expo from 'expo';
import {StyleSheet, View} from 'react-native';
import {Container, Grid, Item, Label, Input, Header, Body, Content, Title, Button, Text, Picker, Icon, Textarea } from 'native-base';
import {validate} from '../../utils/validation'



export default class EstmtCreateBasicForm extends React.Component {
  //Constructor & Static
  constructor(props){
    super(props);

    this.state={
     isReady: false,
     basicData: {
        date: '',
        userName:'',
        amount: 0,
        regidentType: '',
        floor: 0,
        space: 0,
        condition: '',
     },

     dateError: false,
     dateErrorMessage: '',
     userNameError: false,
     userNameErrorMessage: '',
     amountError: false,
     amountErrorMessage: '',
     residentTypeError: false,
     residentTypeErrorMessage: '',
     floorError: false,
     floorErrorMessage: '',
     spaceError: false,
     spaceErrorMessage: '',
     conditionError: false,
     conditionErrorMessage: '',
    }

  }

  propTypes: {
      saveBasicInfo: React.PropTypes.func.isRequired,
  };


  //Life Cycle
  async componentWillMount() {

      this.setState({isReady: true});
    }


  //UI Render
  render(){
    const {basicData} = this.state

    if (!this.state.isReady) {return <Expo.AppLoading />;}


    return (
      <Container>
        <Content padder>
          <Item floatingLabel error={this.state.dateError} style={[styles.inputItem, this.state.dateError?styles.inputItemError:null]}>
            <Label>이사 예정일</Label>
            <Input
              autoCorrect={false}
              onChangeText={(text) => {
                basicData.date = text;
                this.setState({basicData: basicData});
                let v = validate('text', text);
                this.setState({dateError: !v[0], dateErrorMessage: v[1]});
              }}
            />
          </Item>
          <Text style={styles.errorMessage}>{this.state.dateErrorMessage}</Text>

          <Item floatingLabel error={this.state.userNameError} style={[styles.inputItem, this.state.userNameError?styles.inputItemError:null]}>
            <Label>고객명</Label>
            <Input
              autoCorrect={false}
              onChangeText={(text) => {
                basicData.userName = text;
                this.setState({basicData: basicData});
                let v = validate('text', text);
                this.setState({userNameError: !v[0], userNameErrorMessage: v[1]});
              }}
            />
          </Item>
          <Text style={styles.errorMessage}>{this.state.userNameErrorMessage}</Text>

          <Item floatingLabel error={this.state.amountError} style={[styles.inputItem, this.state.amountError?styles.inputItemError:null]}>
            <Label>예상물량</Label>
            <Input
              autoCorrect={false}
              onChangeText={(text) => {
                basicData.amount = text;
                this.setState({basicData: basicData});
                let v = validate('text', text);
                this.setState({amountError: !v[0], amountErrorMessage: v[1]});
              }}
            />
          </Item>
          <Text style={styles.errorMessage}>{this.state.amountErrorMessage}</Text>

          <Item picker error={this.state.amountError} style={[styles.inputItem, this.state.amountError?styles.inputItemError:null]}>
            <Label>거주 형태</Label>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              autoCorrect={false}
              onValueChange={(itemValue, itemIndex)  => {
                basicData.residentType = itemValue;
                this.setState({basicData: basicData});
                let v = validate('text', itemValue);
                this.setState({residentTypeError: !v[0], residentTypeErrorMessage: v[1]});
              }}
            >
              <Picker.Item label="아파트" value="1" />
              <Picker.Item label="빌라" value="2" />
              <Picker.Item label="단독주택" value="3" />
            </Picker>
          </Item>
          <Item stackedLabel error={this.state.floorError} style={[styles.inputItem, this.state.floorError?styles.inputItemError:null]}>
            <Label>층수</Label>
            <Input
              autoCorrect={false}
              onChangeText={(text) => {
                basicData.floor = text;
                this.setState({basicData: basicData});
                let v = validate('text', text);
                this.setState({floorError: !v[0], floorErrorMessage: v[1]});
              }}
            />
          </Item>
          <Text style={styles.errorMessage}>{this.state.floorErrorMessage}</Text>

          <Item stackedLabel error={this.state.spaceError} style={[styles.inputItem, this.state.spaceError?styles.inputItemError:null]}>
            <Label>평수</Label>
            <Input
              autoCorrect={false}
              onChangeText={(text) => {
                basicData.space = text;
                this.setState({basicData: basicData});
                let v = validate('text', text);
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
                basicData.condition = text;
                this.setState({basicData: basicData});
                let v = validate('text', text);
                this.setState({conditionError: !v[0], conditionErrorMessage: v[1]});
              }}
            />
          </Item>
          <Text style={styles.errorMessage}>{this.state.conditionErrorMessage}</Text>


          <Grid>
            <Button large success onPress={() => this.handleSubmit()}>
              <Text>다음</Text>
            </Button>
          </Grid>
        </Content>
      </Container>
    )
  }


  //Method of Save Estimate Basic Info
  handleSubmit = () => {
    let isValid = this.isValidEstmtBasicInfo();

    // if(!isValid){return;}


    this.props.saveBasicInfo(this.state.basicData);
  }


  //Method of Check Validation of submit
  isValidEstmtBasicInfo = () => {
    const {basicData} = this.state;
    let date = this.state.basicData.date;

    var v = validate('text', date);
    alert(date)
    if(!v[0])
    {
        this.setState({dateError: !v[0], dateErrorMessage: v[1]});
        return false;
    }

    var v = validate('text', this.state.basicData.userName);
    if(!v[0])
    {
        this.setState({userNameError: !v[0], userNameErrorMessage: v[1]});
        return false;
    }

    var v = validate('text', this.state.basicData.amount);
    if(!v[0])
    {
        this.setState({amountError: !v[0], amountErrorMessage: v[1]});
        return false;
    }

    var v = validate('text', this.state.basicData.residentType);
    if(!v[0])
    {
        this.setState({residentTypeError: !v[0], residentTypeErrorMessage: v[1]});
        return false;
    }

    var v = validate('text', this.state.basicData.floor);
    if(!v[0])
    {
        this.setState({floorError: !v[0], floorErrorMessage: v[1]});
        return false;
    }

    var v = validate('text', this.state.basicData.space);
    if(!v[0])
    {
        this.setState({spaceError: !v[0], spaceErrorMessage: v[1]});
        return false;
    }


    var v = validate('text', this.state.basicData.condition);
    if(!v[0])
    {
        this.setState({conditionError: !v[0], conditionErrorMessage: v[1]});
        return false;
    }

    return true;
  }
}


const styles = StyleSheet.create({
  errorMessage: {
    color: 'red'
  },
  inputItem: {

  },
  inputItemError: {
    borderColor: 'red'
  }
});
