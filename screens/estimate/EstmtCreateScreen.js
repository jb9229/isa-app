import React from 'react';
import {View} from 'react-native';
import EstmtCreateForm from './EstmtCreateForm';



export default class EstmtCreateScreen extends React.Component {
  static navigationOptions = {
    title: '견적서 작성'
  };




  //UI Render
  render() {
    return (
      <EstmtCreateForm />
    )
  }
}
