import React from 'react';
import {
  Image,
} from 'react-native';

import {Button, Container, Content, Header, Label, Icon, Item} from 'native-base';

import EstmtCreateForm from './estimate/EstmtCreateForm'


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();

      this.state = {

      }
  }

  render() {
    return (
      <Container>
        <Header >
          <Icon name='home' />
          <Icon ios='ios-menu' android="md-menu" style={{fontSize: 20, color: 'red'}}/>
          <Icon type="FontAwesome" name="home" />
            <Item inlineLabel last>
              <Label>견적서 생성</Label>
            </Item>
        </Header>
        <Content>
            <Item inlineLabel last>
              <Label>견적서 리스트</Label>
            </Item>
        </Content>
      </Container>
    );
  }
}
