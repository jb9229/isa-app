import React from 'react';
import {Alert, Image, Dimensions } from 'react-native';
import {Card, CardItem, Container, Content, Col, Header, Grid, Row, Text} from 'native-base'


export default class EstimateDetail extends React.Component {
  constructor (props){
    super(props);

    this.state = {
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
        <Content>
          <Grid>
            <Row>
              <Col><Text>고객명</Text></Col>
              <Col><Text>{this.state.estimate.userName}</Text></Col>
            </Row>
            <Row>
              <Col><Text>이사 날짜</Text></Col>
              <Col><Text>{this.state.estimate.mvDate}</Text></Col>
            </Row>
            <Row>
              <Col><Text>예상물량</Text></Col>
              <Col><Text>{this.state.estimate.amount}톤</Text></Col>
            </Row>
            <Row>
              <Col><Text>거주지</Text></Col>
              <Col><Text>{this.state.estimate.cmAddress}, {this.state.estimate.cmAddressDetail}</Text></Col>
            </Row>
            <Row>
              <Col><Text>현거주지 거주형태</Text></Col>
              <Col><Text>{this.state.estimate.cmRegidentType}</Text></Col>
            </Row>
            <Row>
              <Col><Text>층수</Text></Col>
              <Col><Text>{this.state.estimate.cmFloor}</Text></Col>
            </Row>
            <Row>
              <Col><Text>평수</Text></Col>
              <Col><Text>{this.state.estimate.cmSpace}</Text></Col>
            </Row>
            <Row>
              <Col><Text>작업조건</Text></Col>
              <Col><Text>{this.state.estimate.cmWorkCondition}</Text></Col>
            </Row>
            <Row>
              <Col><Text>이사지</Text></Col>
              <Col><Text>{this.state.estimate.nmAddress}, {this.state.estimate.nmAddressDetail}</Text></Col>
            </Row>
            <Row>
              <Col><Text>이사지 거주형태</Text></Col>
              <Col><Text>{this.state.estimate.nmRegidentType}</Text></Col>
            </Row>
            <Row>
              <Col><Text>층수</Text></Col>
              <Col><Text>{this.state.estimate.nmFloor}</Text></Col>
            </Row>
            <Row>
              <Col><Text>평수</Text></Col>
              <Col><Text>{this.state.estimate.nmSpace}</Text></Col>
            </Row>
            <Row>
              <Col><Text>작업조건</Text></Col>
              <Col><Text>{this.state.estimate.nmWorkCondition}</Text></Col>
            </Row>
            <Row>
              <Col><Text>에어컨</Text></Col>
              <Col><Text>{this.state.estimate.airconditioner} {this.state.estimate.airconditionerType}</Text></Col>
            </Row>
            <Row>
              <Col><Text>고객 요청사항</Text></Col>
              <Col><Text>{this.state.estimate.clientAsk}</Text></Col>
            </Row>
            <Row>
              <Col><Text>현관 사진</Text></Col>
              <Col></Col>
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
