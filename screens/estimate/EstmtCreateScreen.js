import React from 'react';
import {View} from 'react-native';
import {Container} from 'native-base';
import EstmtCreateForm from './EstmtCreateForm';



export default class EstmtCreateScreen extends React.Component {
  static navigationOptions = {
    title: '견적서 작성'
  };



  compleatedCreate = () => {
    this.props.navigation.navigate('Home');
  }

  cancelledCreate = () => {

  }

  //UI Render
  render() {
    return (
      <EstmtCreateForm compleatedCreate={this.compleatedCreate} previousePage={this.cancelledCreate}/>
    )
  }
}
