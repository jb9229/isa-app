import React from 'react';
import {View, TouchableHighlight} from 'react-native';
import {Container, Grid, Item, Label, Input, Header, Body, Content, Title, Button, Text, Picker, Textarea } from 'native-base';
import { Icon } from 'expo';
import Colors from '../../constants/Colors';

export default class EstmtCreateFunitureForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      furniture:{
        bed: false,
        bedType: '',
      }
    }
  }

  _onPressButton = () => {
    this.setState({
      furniture:{
        bed: !this.state.bed,
        bedType: '',
      }
    })
  }

  render() {
    const {furniture} = this.state;

    return (
      <Container>
        <Content padder>
          <TouchableHighlight onPress={this._onPressButton}>
            <Icon.FontAwesome
              name={'bed'}
              size={26}
              style={{ marginBottom: -3 }}
              color={this.state.furniture.bed ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
          </TouchableHighlight>

          {furniture.bed ? (<Item><Input placeholder="베드 타입 기입" /></Item>) : null}



          <Icon.FontAwesome
            name={'bicycle'}
            size={26}
            style={{ marginBottom: -3 }}
            color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />

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
    )
  }

  //Method of Submit Info Validation
  isValidSubmitInfo = () => {
    if(this.state.furniture.bed && this.state.furniture.bedType == ''){this.setState({errorMessage: '베드 타입을 입력해 주세요!'}); return false;}


    return true;
  }


  //Method of Save Estimate Address Info
  handleSubmit() {
    let isValid = this.isValidSubmitInfo();


    // if(!isValid){return;}

    this.props.saveFrntrInfo(this.state.furniture);
  }
}
