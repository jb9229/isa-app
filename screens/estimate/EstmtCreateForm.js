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



export default class EstmtCreateForm extends React.Component {

  //Constructor
  constructor() {
    super();

    this.state = {
        currentPage: 0,
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

  saveEstmtBasicInfo = (submit) => {
    this.props.onSubmit(submit);

    this.nextPage();
  }

  //Method of Save Address Info
  saveAddrInfo = (addrInfo) => {

    this.nextPage();
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
    else
    {
      return(
        <View style={styles.page} key={i}>
          <EstmtCreatefurnitureForm />
            <Text>test3</Text>
        </View>
      );
    }
  }
}

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
