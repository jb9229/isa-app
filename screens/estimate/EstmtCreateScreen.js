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
      <EstmtCreateForm onSubmit={this.submit} />
    )
  }

  submit = values => {
    // print the form values to the console
    console.log('Debug: Submit method!')
    console.log(values)
  }

  submitEstmt() {
    fetch('http://localhost:8080/api/students',
    {   method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.estimate)
    })
    .then(
        res => this.loadEstmtFromServer()
    )
    .catch( err => cosole.error(err))
  }
}
