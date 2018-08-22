import React from 'react';
import {Image,View} from 'react-native';
import {Icon, LinearGradient } from 'expo'
import {Button, Body, Container, Content, Card, CardItem, Header, Left, Label, Item, Right, Subtitle, Text, Title} from 'native-base';

import EstmtCreateForm from './estimate/EstmtCreateForm'
import EstmtList from './estimate/EstmtList';


//#3c0c4d(다크 보라), #30184a(좀 어두운 보라), #451066(좀 밝은 보라) #7a3999(젤 밝은 보라) #4a3752(subtitle, 회색보라)
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

       <Header style={{marginTop: 0, paddingTop:50, paddingBottom:40, backgroundColor: '#ffffff'}}  >
         <Left>
           <Button transparent>
             <Icon.FontAwesome name={'truck'} size={28} style={{  }} color={'#3c0c4d'} />
           </Button>
         </Left>
         <Body>
         </Body>
         <Right>
           <Button transparent onPress={() => this.props.navigation.navigate('EstmtCreate')}>
             <Icon.Foundation name={'page-add'} size={28} style={{  }} color={'#3c0c4d'} />
           </Button>
         </Right>
        </Header>


        <Content>
          <Card style={{marginTop:0}}>
            <LinearGradient
              colors={['#ffffff', '#ffffff']}
              style={{ }}>

              <CardItem header  style={{height:40, paddingTop:10, backgroundColor:'transparent'}}>
                <Body style={{alignItems: 'center'}}><Text>한번의 견적으로, 수 많은 이사업체의 경매 시스템</Text></Body>
              </CardItem>

            </LinearGradient>

            <CardItem cardBody>
                <Image source={require('../assets/images/main_bg.jpg')} style={{height: 170, width: null, flex: 1}}/>
            </CardItem>
         </Card>

          <Card>
            <LinearGradient
              colors={['#d49c9b', '#ffffff']}
              style={{ }}>

              <CardItem header  style={{height:40, paddingTop:10, backgroundColor:'transparent'}}>
                <Body style={{alignItems: 'center'}}><Icon.Entypo name={'documents'} size={23} style={{  }} color={'#3c0c4d'} /></Body>
              </CardItem>
            </LinearGradient>

            <CardItem cardBody >
              <EstmtList detailedEstimate={this.detailedEstimate} />
            </CardItem>

         </Card>
        </Content>
      </Container>
    );
  }
}
