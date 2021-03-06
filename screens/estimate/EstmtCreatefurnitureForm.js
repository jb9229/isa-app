import React from 'react';
import {StyleSheet, View, TouchableHighlight} from 'react-native';
import {Container, Col, Grid, Item, Label, Input, Header, Body, Content, Title, Button, Text, Picker, Row, Textarea } from 'native-base';
import { Icon } from 'expo';
import Colors from '../../constants/Colors';

export default class EstmtCreateFunitureForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      furniture:{
        airconditioner: false,
        airconditionerType: '',
        bed: false,
        bedType: '',
        drawer: false,
        drawerType: '',
        sofa: false,
        sofaType: '',
        tv: false,
        tvType: '',
        piano: false,
        pianoType: '',
        waterpurifier: false,
        waterpurifierType: '',
        bidet: false,
        bidetType: '',
      },
      errorMessage:'',
    }
  }

  render() {
    const {furniture} = this.state;

    return (
      <Container>
        <Content padder>
          <Grid>
            <Row>
              <Col>
                <TouchableHighlight onPress={() => {this._onPressButton('bed')}}>
                  <Icon.FontAwesome
                    name={'bed'}
                    size={96}
                    style={{ marginBottom: -3 }}
                    color={this.state.furniture.bed ? Colors.tabIconSelected : Colors.tabIconDefault}
                  />
                </TouchableHighlight>
              </Col>
              <Col>
                <TouchableHighlight onPress={() => {this._onPressButton('airconditioner')}}>
                  <Icon.MaterialCommunityIcons
                    name={'air-conditioner'}
                    size={96}
                    style={{ marginBottom: -3 }}
                    color={this.state.furniture.airconditioner ? Colors.tabIconSelected : Colors.tabIconDefault}
                  />
                </TouchableHighlight>
              </Col>
              <Col>
                <TouchableHighlight onPress={() => {this._onPressButton('drawer')}}>
                  <Icon.SimpleLineIcons
                    name={'drawer'}
                    size={96}
                    style={{ marginBottom: -3 }}
                    color={this.state.furniture.drawer ? Colors.tabIconSelected : Colors.tabIconDefault}
                  />
                </TouchableHighlight>
              </Col>
            </Row>
            <Row>
              <Col>{furniture.bed ? (<Item regular><Input
                  placeholder="베드 타입"
                  onChangeText={(text) => {this.setState({...this.state, furniture: {...this.state.furniture, bedType: text}});}}
                  /></Item>) : null}</Col>
                <Col>{furniture.airconditioner ? (<Item regular><Input
                  placeholder="에어컨 타입"
                  onChangeText={(text) => {this.setState({...this.state, furniture: {...this.state.furniture, airconditionerType: text}});}}
                  /></Item>) : null}</Col>
              <Col>{furniture.drawer ? (<Item regular><Input
                  placeholder="북박이장 타입"
                  onChangeText={(text) => {this.setState({...this.state, furniture: {...this.state.furniture, drawerType: text}});}}
                   /></Item>) : null}</Col>
            </Row>
            <Row>
              <Col>
                <TouchableHighlight onPress={() => {this._onPressButton('tv')}}>
                  <Icon.Feather
                    name={'tv'}
                    size={96}
                    style={{ marginBottom: -3 }}
                    color={this.state.furniture.tv ? Colors.tabIconSelected : Colors.tabIconDefault}
                  />
                </TouchableHighlight>
              </Col>
              <Col>
                <TouchableHighlight onPress={() => {this._onPressButton('piano')}}>
                  <Icon.MaterialCommunityIcons
                    name={'piano'}
                    size={96}
                    style={{ marginBottom: -3 }}
                    color={this.state.furniture.piano ? Colors.tabIconSelected : Colors.tabIconDefault}
                  />
                </TouchableHighlight>
              </Col>
              <Col>
                <TouchableHighlight onPress={() => {this._onPressButton('waterpurifier')}}>
                  <Icon.MaterialCommunityIcons
                    name={'cup-water'}
                    size={96}
                    style={{ marginBottom: -3 }}
                    color={this.state.furniture.waterpurifier ? Colors.tabIconSelected : Colors.tabIconDefault}
                  />
                </TouchableHighlight>
              </Col>
            </Row>
            <Row>
              <Col>{furniture.tv ? (<Item regular><Input
                  placeholder="TV 타입"
                  onChangeText={(text) => {this.setState({...this.state, furniture: {...this.state.furniture, tvType: text}});}}
                   /></Item>) : null}</Col>
              <Col>{furniture.piano ? (<Item regular><Input
                  placeholder="피아노 타입"
                  onChangeText={(text) => {this.setState({...this.state, furniture: {...this.state.furniture, pianoType: text}});}}
                  /></Item>) : null}</Col>
              <Col>{furniture.waterpurifier ? (<Item regular><Input
                  placeholder="정수기 타입"
                  onChangeText={(text) => {this.setState({...this.state, furniture: {...this.state.furniture, waterpurifierType: text}});}}
                  /></Item>) : null}</Col>
            </Row>
            <Row>
              <Col>
                <TouchableHighlight onPress={() => {this._onPressButton('sofa')}}>
                  <Icon.MaterialCommunityIcons
                    name={'sofa'}
                    size={96}
                    style={{ marginBottom: -3 }}
                    color={this.state.furniture.sofa ? Colors.tabIconSelected : Colors.tabIconDefault}
                  />
                </TouchableHighlight>
              </Col>
              <Col>
                <TouchableHighlight onPress={() => {this._onPressButton('bidet')}}>
                  <Icon.MaterialIcons
                    name={'wc'}
                    size={96}
                    style={{ marginBottom: -3 }}
                    color={this.state.furniture.bidet ? Colors.tabIconSelected : Colors.tabIconDefault}
                  />
                </TouchableHighlight>
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>{furniture.sofa ? (<Item regular><Input
                  placeholder="안마의자 타입"
                  onChangeText={(text) => {this.setState({...this.state, furniture: {...this.state.furniture, sofaType: text}});}}
                   /></Item>) : null}</Col>
              <Col>{furniture.bidet ? (<Item regular><Input
                  placeholder="비데 타입"
                  onChangeText={(text) => {this.setState({...this.state, furniture: {...this.state.furniture, bidetType: text}});}}
                  /></Item>) : null}</Col>
              <Col></Col>
            </Row>
            <Row><Text style={styles.errorMessage}>{this.state.errorMessage}</Text></Row>
          </Grid>

          <Grid style={{marginTop: 100}}>
            <Col>
              <Button block  primary onPress={() => this.props.previousePage()}>
                <Text>이전</Text>
              </Button>
            </Col>
            <Col>
              <Button block success onPress={() => this.handleSubmit()}>
                <Text>다음</Text>
              </Button>
            </Col>
          </Grid>
        </Content>
      </Container>
    )
  }

  _onPressButton = (type) => {
    const {furniture} = this.state;

    if(type == 'bed'){furniture.bed = !this.state.furniture.bed;}
    if(type == 'airconditioner'){furniture.airconditioner = !this.state.furniture.airconditioner;}
    if(type == 'drawer'){furniture.drawer = !this.state.furniture.drawer;}
    if(type == 'sofa'){furniture.sofa = !this.state.furniture.sofa;}

    if(type == 'tv'){furniture.tv = !this.state.furniture.tv;}
    if(type == 'piano'){furniture.piano = !this.state.furniture.piano;}
    if(type == 'waterpurifier'){furniture.waterpurifier = !this.state.furniture.waterpurifier;}
    if(type == 'bidet'){furniture.bidet = !this.state.furniture.bidet;}

    this.setState({
      furniture: furniture
    })
  }

  //Method of Submit Info Validation
  isValidSubmitInfo = () => {
    if(this.state.furniture.bed && this.state.furniture.bedType == ''){this.setState({errorMessage: '베드 타입을 입력해 주세요!'}); return false;}
    if(this.state.furniture.airconditioner && this.state.furniture.airconditionerType == ''){this.setState({errorMessage: '에어컨 타입을 입력해 주세요!'}); return false;}
    if(this.state.furniture.drawer && this.state.furniture.drawerType == ''){this.setState({errorMessage: '북박이장 타입을 입력해 주세요!'}); return false;}
    if(this.state.furniture.sofa && this.state.furniture.sofaType == ''){this.setState({errorMessage: '소파 타입을 입력해 주세요!'}); return false;}

    if(this.state.furniture.tv && this.state.furniture.tvType == ''){this.setState({errorMessage: '티브 타입을 입력해 주세요!'}); return false;}
    if(this.state.furniture.piano && this.state.furniture.pianoType == ''){this.setState({errorMessage: '피아노 타입을 입력해 주세요!'}); return false;}
    if(this.state.furniture.waterpurifier && this.state.furniture.waterpurifierType == ''){this.setState({errorMessage: '정수기 타입을 입력해 주세요!'}); return false;}
    if(this.state.furniture.bidet && this.state.furniture.bidetType == ''){this.setState({errorMessage: '비데 타입을 입력해 주세요!'}); return false;}

    return true;
  }


  //Method of Save Estimate Address Info
  handleSubmit() {
    let isValid = this.isValidSubmitInfo();

    if(!isValid){return;}

    this.props.saveFrntrInfo(this.state.furniture);
  }
}

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red'
  },
});
