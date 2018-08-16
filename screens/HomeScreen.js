import React from 'react';
import {
  Image,
  View,
} from 'react-native';

import {Button, Body, Container, Content, Header, Left, Label, Icon, Item, Right, Subtitle, Text, Title} from 'native-base';

import EstmtCreateForm from './estimate/EstmtCreateForm'
import EstmtList from './estimate/EstmtList';


//#3c0c4d
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
        <Header>

          <Body style={{marginTop:40}}>
            <Title>모두의 집사</Title>
            <Subtitle>한번의 견적으로, 수많은 이사업체들의 경매</Subtitle>
          </Body>

        </Header>

        <Content>
          <Item style={{marginTop:10}}>
            <Right>
              <Button rounded info onPress={() => this.props.navigation.navigate('EstmtCreate')}>
                <Text>견적서 추가</Text>
              </Button>
            </Right>
          </Item>

          <EstmtList detailedEstimate={this.detailedEstimate}/>

        </Content>
      </Container>
    );
  }
}
