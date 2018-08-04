import React from 'react';
import {} from 'react-native';
import {Container, Content, Col, Header, Grid, Row, Text} from 'native-base'


export default class EstimateDetail extends React.Component {
  constructor (props){
    super(props);

    this.state = {
      estimate: {
         mvDate: '',
         userName:'',
         amount: 0,
         regidentType: '',
         floor: 0,
         space: 0,
         workCondition: '',

        cmAddress : '',
        cmAddressDetail : '',
        nmAddress : '',
        nmAddressDetail : '',

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
    const url = `http://192.168.0.102:80/api/v1/estimate`;
    this.setState({loading: true});

    fetch(url)
    .then(res => {
      if(!res.ok){Alert.alert('Error','유효하지 않은 전송 데이터 입니다, 전송 데이터 값을 확인해주세요('+res.statusText+')'); return;}

      const rspData   = res.json();
      const getEstmt  = rspData.content;
      this.setState({
        estimate: getEstmt
      });
    })
    .catch(error => {
      Alert.alert(
        'Error',
        '데이터 요청 오류입니다, 네트워크 상태를 확인해주세요.'
      );
    });
  };

  render() {
    return (
      <Container>
        <Header />
          <Grid>
            <Row>
              <Col style={{ height: 200 }}><Text>{this.state.userName}</Text></Col>
              <Col style={{ height: 200 }}><Text>{this.state.mvDate}</Text></Col>
            </Row>
          </Grid>
      </Container>
    )
  }
}
