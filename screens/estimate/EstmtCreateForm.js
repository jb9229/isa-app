import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { ViewPager, IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import { Content, Button, Icon} from 'native-base';
import StepIndicator from 'react-native-step-indicator';
import EstmtCreateBasicForm from './EstmtCreateBasicForm'
import EstmtCreateAddrForm from './EstmtCreateAddrForm'
import EstmtCreatefurnitureForm from './EstmtCreatefurnitureForm'
import EstmtCreatePhotoForm from './EstmtCreatePhotoForm'
import EstmtCreateCommForm from './EstmtCreateCommForm'


//Const
const PAGES = ['아파트/빌라/단독?, 포장이사?','예상물량/이사 예정일?/거주형태/평수/층수/','이사 주소지(현거주지 -> 이사지)','가구정보','포토'];

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
         date: '',
         userName:'',
         amount: 0,
         regidentType: '',
         floor: 0,
         space: 0,
         condition: '',

        cmAddress : '',
        cmAddressDetail : '',
        nmAddress : '',
        nmAddressDetail : '',

        airConditioner: false,
        airConditionerType: '',
        bed: false,
        bedType: '',
        drawer: false,
        drawerType: '',
        sofa: false,
        sofatType: '',
        tv: false,
        tvType: '',
        piano: false,
        pianoType: '',
        waterPurifier: false,
        waterPurifierType: '',
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
    const { handleSubmit } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.stepIndicator}>
          <StepIndicator customStyles={firstIndicatorStyles} currentPosition={this.state.currentPage} labels={["기본 정보","이사지","집기 정보","포토","코멘트"]} />
        </View>



        <ViewPager
          style={{flexGrow:1}}
          ref={(viewPager) => {this.viewPager = viewPager}}
          onPageSelected={(page) => {this.setState({currentPage:page.position})}}
          peekEnabled = {true}
          horizontalScroll = {false}

          >

          {PAGES.map((page, i) => this.renderViewPagerPage(page, i))}
        </ViewPager>

      </View>
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
      ...state,
      estimate: {
        ...obj.estimate,
        date: data.date,
        userName: data.userName,
        amount: data.amount,
        regidentType: data.regidentType,
        floor: data.floor,
        space: data.space,
        condition: data.condition,
      }
    });

    this.nextPage();
  }

  //Method of Save Address Info
  saveAddrInfo = (data) => {
    this.setState({
      ...obj,
      estimate: {
        ...obj.estimate,
        cmAddress : data.cmAddress,
        cmAddressDetail : data.cmAddressDetail,
        nmAddress : data.nmAddress,
        nmAddressDetail : data.cmAddressDetail,
      }
    });

    this.nextPage();
  }

  //Method of Save furniture Info
  saveFrntrInfo = (data) => {
    this.setState({
      ...obj,
      estimate: {
        ...obj.estimate,
        airConditioner: data.airConditioner,
        airConditionerType: data.airConditionerType,
        bed: data.bed,
        bedType: data.bedType,
        drawer: data.drawer,
        drawerType: data.drawerType,
        sofa: data.sofa,
        sofatType: data.sofaType,
        tv: data.tv,
        tvType: data.tvType,
        piano: data.piano,
        pianoType: data.pianoType,
        waterPurifier: data.waterPurifier,
        waterPurifierType: data.waterPurifierType,
        bidet: data.bidet,
        bidetType: data.bidetType,
      }
    });

    this.nextPage();
  }

  //Method of Save Photo Info
  savePhotoInfo = (data) => {
    this.setState({
      ...obj,
      estimate: {
        ...obj.estimate,
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
      ...obj,
      estimate: {
        ...obj.estimate,
        clientAsk: '',
      }
    });

    this.submitEstmt();
  }


  submit = values => {
    // print the form values to the console

    console.log(values)
  }

  submitEstmt() {
    JSON.stringify(this.state.estimate);

    fetch('http://localhost:8080/api/students',
    {   method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify(this.state.estimate)
    })
    .then(
        res => {
          this.loadEstmtFromServer();
          this.props.navigation.navigate('Home');
        }
    )
    .catch( err => cosole.error(err))



    let uriParts = uri.split('.');
    let fileType = uri[uri.length - 1];

    let formData = new FormData();
    formData.append('photo1', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
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
          <EstmtCreateAddrForm saveAddrInfo={this.saveAddrInfo} previousePage={this.previousePage} />
        </View>
      );
    }
    else if(i == 2)
    {
      return(
        <View style={styles.page} key={i}>
          <EstmtCreatefurnitureForm saveFrntrInfo={this.saveFrntrInfo} previousePage={this.previousePage}/>
        </View>
      );
    }
    else if(i == 3)
    {
      return(
        <View style={styles.page} key={i}>
          <EstmtCreatePhotoForm savePhotoInfo={this.savePhotoInfo} previousePage={this.previousePage}/>
        </View>
      );
    }
    else if(i == 4)
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
    marginVertical:50,
  },
  page: {
    flex:2,
    justifyContent:'center',
    alignItems:'center'
  },
  address: {
    width: 300,
    height: 300,
  }
});
