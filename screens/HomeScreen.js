import React from 'react';
import {
  Image,
} from 'react-native';

import {Button, Container, Content, Header, Label, Icon, Item, Text} from 'native-base';

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
        </Header>
        <Content>
          <Icon ios='ios-menu' android="md-menu" style={{fontSize: 20, color: 'red'}}/>
          <Item inlineLabel last>

            <Button iconRight onPress={() => this.props.navigation.navigate('EstmtCreate')}>
              <Icon name='home' />
              <Text>견적서 생성</Text>
            </Button>
          </Item>

          <Item inlineLabel last>
            <Label>견적서 리스트</Label>
          </Item>
        </Content>
      </Container>
    );
  }
}
