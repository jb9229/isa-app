import React from 'react';
import {Dimensions, Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View, Text, Alert} from 'react-native';
import { ViewPager, IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import { Container, Content, Button, Form, Icon, Toast} from 'native-base';
import StepIndicator from 'react-native-step-indicator';
import EstmtCreateBasicForm from './EstmtCreateBasicForm'
import EstmtCreateCMInfoForm from './EstmtCreateCMInfoForm'
import EstmtCreateNMInfoForm from './EstmtCreateNMInfoForm'
import EstmtCreatefurnitureForm from './EstmtCreatefurnitureForm'
import EstmtCreatePhotoForm from './EstmtCreatePhotoForm'
import EstmtCreateCommForm from './EstmtCreateCommForm'


//Const
const PAGES = ['아파트/빌라/단독?, 포장이사?','예상물량/이사 예정일?/거주형태/평수/층수/','현거주지','이사 주소지(현거주지 -> 이사지)','가구정보','포토'];

const firstIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize:40,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 5,
  separatorFinishedColor: '#4aae4f',
  separatorUnFinishedColor: '#a4d4a5',
  stepIndicatorFinishedColor: '#4aae4f',
  stepIndicatorUnFinishedColor: '#a4d4a5',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 12,
  currentStepLabelColor: '#4aae4f'
}


//class
export default class EstmtCreateForm extends React.Component {

  //Constructor
  constructor() {
    super();

    this.state = {
      currentPage: 0,
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

  //Life Cycle
  componentWillReceiveProps(nextProps,nextState) {
    if(nextState.currentPage != this.state.currentPage) {
      if(this.viewPager) {
        this.viewPager.setPage(nextState.currentPage)
      }
    }
  }


  //Estimate Redux Form
  render(){
    var {height, width} = Dimensions.get('window');
    const { handleSubmit } = this.props;
    return (
      <Container>
        <Content>
          <View style={styles.stepIndicator}>
            <StepIndicator
              customStyles={firstIndicatorStyles}
              currentPosition={this.state.currentPage}
              stepCount={6}
              labels={["기본 정보","현거주지","이사지","집기 정보","포토","코멘트"]} />
          </View>

          <ViewPager
            style={{flex: 1, flexGrow:1, width: width, height: height-200}}
            ref={(viewPager) => {this.viewPager = viewPager}}
            onPageSelected={(page) => {this.setState({currentPage:page.position})}}
            peekEnabled = {true}
            horizontalScroll = {false}
            >

            {PAGES.map((page, i) => this.renderViewPagerPage(page, i))}

          </ViewPager>
        </Content>
      </Container>
    )
  }



 //Method of Previous Step Page
  previousePage = () => {
    let prePageNum  = this.state.currentPage;

    this.setState({currentPage: prePageNum - 1});
    this.viewPager.setPage(prePageNum - 1);
  }

  //Method of Next Step Page
  nextPage = () => {
    let prePageNum  = this.state.currentPage;

    this.setState({currentPage: prePageNum + 1});
    this.viewPager.setPage(prePageNum+1);
  }

  //Method of Save Basic Info
  saveEstmtBasicInfo = (data) => {
    this.setState({
      ...this.state,
      estimate: {
        ...this.state.estimate,
        mvDate: data.mvDate,
        userName: data.userName,
        amount: data.amount,
      }
    });

    this.nextPage();
  }

  //Method of Save Current Move Info
  saveEstmtCMInfo = (data) => {
    this.setState({
      ...this.state,
      estimate: {
        ...this.state.estimate,
        cmAddress : data.cmAddress,
        cmAddressDetail : data.cmAddressDetail,
        cmRegidentType: data.cmRegidentType,
        cmFloor: data.cmFloor,
        cmSpace: data.cmSpace,
        cmWorkCondition: data.cmWorkCondition,
      }
    });

    this.nextPage();
  }

  //Method of Save New Move Place Info
  saveEstmtNMInfo = (data) => {
    this.setState({
      ...this.state,
      estimate: {
        ...this.state.estimate,
        nmAddress : data.nmAddress,
        nmAddressDetail : data.nmAddressDetail,
        nmRegidentType: data.nmRegidentType,
        nmFloor: data.nmFloor,
        nmSpace: data.nmSpace,
        nmWorkCondition: data.nmWorkCondition,
      }
    });

    this.nextPage();
  }

  //Method of Save furniture Info
  saveFrntrInfo = (data) => {
    this.setState({
      ...this.state,
      estimate: {
        ...this.state.estimate,
        airconditioner: data.airconditioner,
        airconditionerType: data.airconditionerType,
        bed: data.bed,
        bedType: data.bedType,
        drawer: data.drawer,
        drawerType: data.drawerType,
        sofa: data.sofa,
        sofaType: data.sofaType,
        tv: data.tv,
        tvType: data.tvType,
        piano: data.piano,
        pianoType: data.pianoType,
        waterpurifier: data.waterpurifier,
        waterpurifierType: data.waterpurifierType,
        bidet: data.bidet,
        bidetType: data.bidetType,
      }
    });

    this.nextPage();
  }

  //Method of Save Photo Info
  savePhotoInfo = (data) => {
    this.setState({
      ...this.state,
      estimate: {
        ...this.state.estimate,
        entrPhoto: data.entrPhoto,
        lrPhoto: data.lrPhoto,
        kchPhoto: data.kchPhoto,
        rm1Photo: data.rm1Photo,
        rm2Photo: data.rm2Photo,
        rm3Photo: data.rm3Photo,
        rm4Photo: data.rm4Photo,
        rm5Photo: data.rm5Photo,
      }
    });

    this.nextPage();
  }


  //Method of Save Photo Info
  saveCommInfo = (data) => {
    this.setState({
      ...this.state,
      estimate: {
        ...this.state.estimate,
        clientAsk: data.clientAsk,
      }
    });

    this.submitEstmt();
  }


  submit = () => {
    // print the form values to the console
    let values  = JSON.stringify(this.state.estimate);

    console.log(values);
    alert(values);
  }

  submitEstmt = () => {
    let apiUrl = "http://moduisa.ap-northeast-2.elasticbeanstalk.com/api/v1/estimate";
    // let apiUrl = "http://192.168.0.102/api/v1/estimate";

    fetch(apiUrl,
    {   method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.estimate)
    })
    .then(res => {
      if (res.ok)
      {
        Toast.show({
          text: "견적서 저장 성공",
          buttonText: "Okay",
          type: "success",
          duration: 3000
        });

        this.props.compleatedCreate();
      }else{
        Alert.alert('Error','유효하지 않은 전송 데이터 입니다, 전송 데이터 값을 확인 해 주세요('+res.status+', '+res.text()+')'); return;
      }
    })
    .catch( err => console.error(err))
  }


  renderViewPagerPage = (data, i) => {
    if(i == 0)
    {
      return(
        <View style={styles.page} key={i} >
           <EstmtCreateBasicForm saveBasicInfo={this.saveEstmtBasicInfo} />
        </View>
      );
    }
    else if(i == 1)
    {
      return(
        <View style={styles.page} key={i}>
          <EstmtCreateCMInfoForm saveCMInfo={this.saveEstmtCMInfo} previousePage={this.previousePage} />
        </View>
      );
    }
    else if(i == 2)
    {
      return(
        <View style={styles.page} key={i}>
          <EstmtCreateNMInfoForm saveNMInfo={this.saveEstmtNMInfo} previousePage={this.previousePage} />
        </View>
      );
    }
    else if(i == 3)
    {
      return(
        <View style={styles.page} key={i}>
          <EstmtCreatefurnitureForm saveFrntrInfo={this.saveFrntrInfo} previousePage={this.previousePage}/>
        </View>
      );
    }
    else if(i == 4)
    {
      return(
        <View style={styles.page} key={i}>
          <EstmtCreatePhotoForm savePhotoInfo={this.savePhotoInfo} previousePage={this.previousePage}/>
        </View>
      );
    }
    else if(i == 5)
    {
      return(
        <View style={styles.page} key={i}>
          <EstmtCreateCommForm saveCommInfo={this.saveCommInfo} previousePage={this.previousePage}/>
        </View>
      );
    }
  }
}


//StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  stepIndicator: {
    marginVertical:20,
  },
  page: {
    flex: 1,
  }
});
