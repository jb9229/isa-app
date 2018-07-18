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
     date: '',
     dateError: false,
     dateErrorMessage: '',

     amount: '',
    };

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
    if (!this.state.isReady) {return <Expo.AppLoading />;}


    return (
      <Container>
        <Content padder>
          <Item floatingLabel error={this.state.dateError} style={[styles.inputItem, this.state.enterError?styles.inputItemError:null]}>
            <Label>이사 예정일</Label>
            <Input
              autoCorrect={false}
              onChangeText={(text) => {
                this.setState({date: text});
                let v = validate('text', text);
                this.setState({dateError: !v[0], dateErrorMessage: v[1]});
              }}
            />
          </Item>
          <Text style={styles.errorMessage}>{this.state.dateErrorMessage}</Text>
          <Item stackedLabel style={{borderBottomWidth: 0}}>
            <Label>예상물량</Label>
            <Input name="amount" component={this.renderInput} placeholder="5t" onChangeText={(text) => this.setState({amount})}/>
          </Item>
          <Item picker>
            <Label>거주 형태</Label>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={{ width: undefined }}
            >
              <Picker.Item label="아파트" value="key0" />
              <Picker.Item label="빌라" value="key1" />
              <Picker.Item label="단독주택" value="key2" />
            </Picker>
          </Item>
          <Item stackedLabel style={{borderBottomWidth: 0}}>
            <Label>층수</Label>
            <Input name="floor" placeholder="First Name"/>
          </Item>
          <Item stackedLabel style={{borderBottomWidth: 0}}>
            <Label>평수</Label>
            <Input name="size" placeholder="First Name"/>
          </Item>
          <Item stackedLabel style={{borderBottomWidth: 0}}>
            <Label>작업조건</Label>
            <Input name="size" placeholder="First Name"/>
          </Item>
          <Item stackedLabel style={{borderBottomWidth: 0}}>
            <Label>특이사항</Label>
            <Textarea rowSpan={5} colSpan={100} bordered placeholder="Textarea" style={{width: 250}} />
          </Item>

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
  handleSubmit() {
    let isValid = this.isValidEstmtBasicInfo();

    if(!isValid){return;}

    var estmt = {date: this.state.date, amount: this.state.amount};

    this.props.saveBasicInfo(estmt);
  }


  //Method of Check Validation of submit
  isValidEstmtBasicInfo() {
    let v = validate('text', this.state.date);
    if(!v[0])
    {
        this.setState({dateError: !v[0], dateErrorMessage: v[1]});
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
