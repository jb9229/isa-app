import React from 'react';
import {StyleSheet, View, WebView, Alert} from 'react-native';
import {Button, Container, Content, Grid, Icon, Text} from 'native-base';


export default class EstmtCreateAddrForm extends React.Component {
  //Constructor & Static
  constructor(props){
    super(props);

    this.state={
      errorMessage: '',
      postData: {
        cmAddress : '',
        cmAddressDetail : '',
        nmAddress : '',
        nmAddressDetail : ''
      }
    };
  }
  propTypes: {
    saveAddrInfo: React.PropTypes.func.isRequired,
    previousePage: React.PropTypes.func.isRequired,
  };

  render() {
      return (
        <Container>
          <Content padder>
          <WebView
              source={{uri: 'https://jb9229.github.io/postcode/'}}
              style={{flex: 1, width: 300, height: 400}}
              mixedContentMode='always'
              onMessage={(event)=> this.savePostData(event.nativeEvent.data) }
          />

          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
          <Grid>
            <Button large  primary onPress={() => this.props.previousePage()}>
              <Text>이전</Text>
            </Button>
            <Button large success onPress={() => this.handleSubmit()}>
              <Text>다음</Text>
            </Button>
          </Grid>
        </Content>
      </Container>
      );
  }

  savePostData = (postDataJson) => {
    var postDataObj = JSON.parse(postDataJson);

    console.log('Debug postDataJson: '+ postDataJson)
    this.setState({
      postData: {
        cmAddress : postDataObj.cmAddress,
        cmAddressDetail : postDataObj.cmAddressDetail,
        nmAddress : postDataObj.nmAddress,
        nmAddressDetail : postDataObj.nmAddressDetail
      }
    });
  }

  //Method of Submit Info Validation
  isValidSubmitInfo = () => {
    let postDataObj = this.state.postData;

    if(postDataObj.cmAddress == ''){this.setState({errorMessage: '현거주지 주소는 필수 항목 입니다, 주소를 입력해 주세요.'}); return false;}
    if(postDataObj.cmAddressDetail == ''){this.setState({errorMessage: '현거주지 상세주소는 필수 항목 입니다, 주소를 입력해 주세요.'}); return false;}
    if(postDataObj.nmAddress == ''){this.setState({errorMessage: '이사지 주소는 필수 항목 입니다, 주소를 입력해 주세요.'}); return false;}
    if(postDataObj.nmAddressDetail == ''){this.setState({errorMessage: '이사지 상세주소는 필수 항목 입니다, 주소를 입력해 주세요.'}); return false;}


    return true;
  }

  //Method of Save Estimate Address Info
  handleSubmit() {
    let isValid = this.isValidSubmitInfo();


    // if(!isValid){return;}

    this.props.saveAddrInfo(this.state.postData);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: 350,
    height:450,
  },
  errorMessage: {
    color: 'red'
  },
});
