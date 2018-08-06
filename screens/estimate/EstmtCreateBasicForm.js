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
        mvDate: '',
        userName:'',
        amount: 0,
        regidentType: '',
        floor: 0,
        space: 0,
        workCondition: '',
     },

     dateError: false,
     dateErrorMessage: '',
     userNameError: false,
     userNameErrorMessage: '',
     amountError: false,
     amountErrorMessage: '',
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
                this.setState({...this.state, basicData: {...this.state.basicData, mvDate: text}});
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
                this.setState({...this.state, basicData: {...this.state.basicData, userName: text}});
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
                this.setState({...this.state, basicData: {...this.state.basicData, amount: text}});
                let v = validate('text', text);
                this.setState({amountError: !v[0], amountErrorMessage: v[1]});
              }}
            />
          </Item>
          <Text style={styles.errorMessage}>{this.state.amountErrorMessage}</Text>


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

    if(!isValid){return;}


    this.props.saveBasicInfo(this.state.basicData);
  }


  //Method of Check Validation of submit
  isValidEstmtBasicInfo = () => {

    var v = validate('text', this.state.basicData.mvDate);
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
