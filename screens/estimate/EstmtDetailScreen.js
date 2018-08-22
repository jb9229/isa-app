import React from 'react';
import {Alert, Image, Dimensions, StyleSheet } from 'react-native';
import {Body, Card, CardItem, Container, Content, Col, Grid, Header, Left, Row, Text} from 'native-base';
import { Icon } from 'expo';

import Colors from '../../constants/Colors';


export default class EstimateDetail extends React.Component {
  static navigationOptions = {
    title: '견적서 정보',
  };

  constructor (props){
    super(props);

    this.state = {
      // bedIconUri: require('../../assets/images/icon_bidet.png'),
      estimate: {
         mvDate: '',
         userName:'',
         amount: 0,

        cmAddress : '',
        cmAddressDetail : '',
        cmRegidentType: '',
        cmFloor: 0,
        cmSpace: 0,
        cmWorkCondition: '',

        nmAddress : '',
        nmAddressDetail : '',
        nmRegidentType: '',
        nmFloor: 0,
        nmSpace: 0,
        nmWorkCondition: '',

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

        entrPhoto: '',
        lrPhoto: '',
        kchPhoto: '',
        rm1Photo: '',
        rm2Photo: '',
        rm3Photo: '',
        rm4Photo: '',
        rm5Photo: '',

        clientAsk: '',
      }
    }
  }


  componentDidMount() {
    const {navigation} = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');

    this.requestEstimate(itemId);
  }

  requestEstimate = (itemId)  => {
    const url = `http://moduisa.ap-northeast-2.elasticbeanstalk.com/api/v1/estimate/`+itemId+`/`;
    // const url = `http://192.168.0.102:80/api/v1/estimate/`+itemId+`/`;

    fetch(url)
    .then(res => res.json())
    .then(rspData => {

      console.log("rspData.content: "+rspData.content);
      console.log("rspData.id: "+rspData.id);
      console.log("rspData.userName: "+rspData.userName);
      this.setState({
        ...this.state,
        estimate: {
          userName: rspData.userName,
          mvDate: rspData.mvDate,
          amount: rspData.amount,
          cmAddress : rspData.cmAddress,
          cmAddressDetail : rspData.cmAddressDetail,
          cmRegidentType: rspData.cmRegidentType,
          cmFloor: rspData.cmFloor,
          cmSpace: rspData.cmSpace,
          cmWorkCondition: rspData.cmWorkCondition,
          nmAddress : rspData.nmAddress,
          nmAddressDetail : rspData.nmAddressDetail,
          nmRegidentType: rspData.nmRegidentType,
          nmFloor: rspData.nmFloor,
          nmSpace: rspData.nmSpace,
          nmWorkCondition: rspData.nmWorkCondition,
          airconditioner: rspData.airconditioner,
          airconditionerType: rspData.airconditionerType,
          bed: rspData.bed,
          bedType: rspData.bedType,
          drawer: rspData.drawer,
          drawerType: rspData.drawerType,
          sofa: rspData.sofa,
          sofaType: rspData.sofaType,
          tv: rspData.tv,
          tvType: rspData.tvType,
          piano: rspData.piano,
          pianoType: rspData.pianoType,
          waterpurifier: rspData.waterpurifier,
          waterpurifierType: rspData.waterpurifierType,
          bidet: rspData.bidet,
          bidetType: rspData.bidetType,
          entrPhoto: rspData.entrPhoto,
          lrPhoto: rspData.lrPhoto,
          kchPhoto: rspData.kchPhoto,
          rm1Photo: rspData.rm1Photo,
          rm2Photo: rspData.rm2Photo,
          rm3Photo: rspData.rm3Photo,
          rm4Photo: rspData.rm4Photo,
          rm5Photo: rspData.rm5Photo,
          clientAsk: rspData.clientAsk,
        }
      });
    })
    .catch(error => {
      Alert.alert(
        'Error',
        '데이터 요청 오류입니다, 네트워크 상태를 확인해주세요('+error.message+')'
      );
    });
  };

  render() {

    var {height, width} = Dimensions.get('window');
    return (
      <Container>
        <Content >
          <Grid bordered>
            <Row bordered>
              <Col bordered><Body><Text>고객명</Text></Body></Col>
              <Col><Body><Text>{this.state.estimate.userName}</Text></Body></Col>
            </Row>
            <Row>
              <Col><Body><Text>이사 날짜</Text></Body></Col>
              <Col><Body><Text>{this.state.estimate.mvDate}</Text></Body></Col>
            </Row>
            <Row>
              <Col><Body><Text>예상물량</Text></Body></Col>
              <Col><Body><Text>{this.state.estimate.amount}톤</Text></Body></Col>
            </Row>
            <Row>
              <Col><Text style={styles.tableTitle}>▣ 현재 거주지: </Text></Col>
            </Row>
            <Row>
              <Col><Body><Text>주소</Text></Body></Col>
              <Col><Body><Text>{this.state.estimate.cmAddress}, {this.state.estimate.cmAddressDetail}</Text></Body></Col>
            </Row>
            <Row>
              <Col><Body><Text>거주형태</Text></Body></Col>
              <Col><Body><Text>{this.state.estimate.cmRegidentType}</Text></Body></Col>
            </Row>
            <Row>
              <Col><Body><Text>층수</Text></Body></Col>
              <Col><Body><Text>{this.state.estimate.cmFloor}</Text></Body></Col>
            </Row>
            <Row>
              <Col><Body><Text>평수</Text></Body></Col>
              <Col><Body><Text>{this.state.estimate.cmSpace}</Text></Body></Col>
            </Row>
            <Row>
              <Col><Body><Text>작업조건</Text></Body></Col>
              <Col><Body><Text>{this.state.estimate.cmWorkCondition}</Text></Body></Col>
            </Row>
            <Row>
              <Col><Text style={styles.tableTitle}>▣ 이사 예정지: </Text></Col>
            </Row>
            <Row>
              <Col><Body><Text>주소</Text></Body></Col>
              <Col><Body><Text>{this.state.estimate.nmAddress}, {this.state.estimate.nmAddressDetail}</Text></Body></Col>
            </Row>
            <Row>
              <Col><Body><Text>거주형태</Text></Body></Col>
              <Col><Body><Text>{this.state.estimate.nmRegidentType}</Text></Body></Col>
            </Row>
            <Row>
              <Col><Body><Text>층수</Text></Body></Col>
              <Col><Body><Text>{this.state.estimate.nmFloor}</Text></Body></Col>
            </Row>
            <Row>
              <Col><Body><Text>평수</Text></Body></Col>
              <Col><Body><Text>{this.state.estimate.nmSpace}</Text></Body></Col>
            </Row>
            <Row>
              <Col><Body><Text>작업조건</Text></Body></Col>
              <Col><Body><Text>{this.state.estimate.nmWorkCondition}</Text></Body></Col>
            </Row>
            <Row>
              <Col><Text style={styles.tableTitle}>▣ 주요 집기 정보:</Text></Col>
            </Row>
            <Row>
              <Col><Icon.FontAwesome name={'bed'} size={56} style={{ marginBottom: -3 }} color={this.state.estimate.bed ? Colors.tabIconSelected : Colors.tabIconDefault} /></Col>
              <Col><Icon.MaterialCommunityIcons name={'air-conditioner'} size={56} style={{ marginBottom: -3 }} color={this.state.estimate.airconditioner? Colors.tabIconSelected : Colors.tabIconDefault} /></Col>
              <Col><Icon.SimpleLineIcons name={'drawer'} size={56} style={{ marginBottom: -3 }} color={this.state.estimate.drawer? Colors.tabIconSelected : Colors.tabIconDefault} /></Col>
              <Col><Icon.MaterialCommunityIcons name={'sofa'} size={56} style={{ marginBottom: -3 }} color={this.state.estimate.sofa? Colors.tabIconSelected: Colors.tabIconDefault} /></Col>
            </Row>
            <Row>
              <Col><Icon.Feather name={'tv'} size={56} style={{ marginBottom: -3 }} color={this.state.estimate.tv? Colors.tabIconSelected: Colors.tabIconDefault} /></Col>
              <Col><Icon.MaterialCommunityIcons name={'piano'} size={56} style={{ marginBottom: -3 }} color={this.state.estimate.piano? Colors.tabIconSelected: Colors.tabIconDefault} /></Col>

              <Col><Icon.MaterialCommunityIcons name={'cup-water'} size={56} style={{ marginBottom: -3 }} color={this.state.estimate.waterpurifier? Colors.tabIconSelected: Colors.tabIconDefault} /></Col>
              <Col><Icon.MaterialIcons name={'wc'} size={56} style={{ marginBottom: -3 }} color={this.state.estimate.bidet? Colors.tabIconSelected: Colors.tabIconDefault} /></Col>
            </Row>
            <Row>
              <Col>
                {this.state.estimate.bed ? (<Row><Text> ⊙침대타입: {this.state.estimate.bedType} </Text></Row>) : null}
                {this.state.estimate.airconditioner ? (<Row><Text> ⊙에어컨타입: {this.state.estimate.airconditionerType} </Text></Row>) : null}
                {this.state.estimate.drawer ? (<Row><Text> ⊙장농타입: {this.state.estimate.drawerType} </Text></Row>) : null}
                {this.state.estimate.sofa ? (<Row><Text> ⊙안마의자타입: {this.state.estimate.sofaType} </Text></Row>) : null}
                {this.state.estimate.tv ? (<Row><Text> ⊙TV타입: {this.state.estimate.tvType} </Text></Row>) : null}
                {this.state.estimate.piano ? (<Row><Text> ⊙피아노 타입: {this.state.estimate.pianoType} </Text></Row>) : null}
                {this.state.estimate.waterpurifier ? (<Row><Text> ⊙정수기 타입: {this.state.estimate.waterpurifierType} </Text></Row>) : null}
                {this.state.estimate.bidet ? (<Row><Text> ⊙비데타입: {this.state.estimate.bidetType} </Text></Row>) : null}
              </Col>
            </Row>
            <Row>
              <Col><Text style={styles.tableTitle}>▣ 고객 요청사항: </Text></Col>
            </Row>
            <Row>
              <Col><Text>{this.state.estimate.clientAsk}</Text></Col>
            </Row>
            <Row>
              <Col><Text style={styles.tableTitle} >▣ 현관 사진: </Text></Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <CardItem cardBody>
                    {this.state.estimate.entrPhoto !== ''? <Image source={{uri: this.state.estimate.entrPhoto}} style={{width:width,height: 400, marginTop:100}}/>: null}
                  </CardItem>
                </Card>
              </Col>
            </Row>
          </Grid>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  tableTitle: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
});
