import React from 'react';
import {
  Image,
} from 'react-native';

import {Button, Container, Content, Header, Label, Icon, Item, Text} from 'native-base';

import EstmtCreateForm from './estimate/EstmtCreateForm'
import EstmtList from './estimate/EstmtList';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

      this.state = {
      }
  }

  detailedEstimate = (id) => {
    this.props.navigation.navigate('EstmtDetail', {
      itemId: id,
    });
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
              <Text>견적서 추가</Text>
            </Button>
          </Item>

          <EstmtList detailedEstimate={this.detailedEstimate}/>
        </Content>
      </Container>
    );
  }
}
