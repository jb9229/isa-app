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
import { Content, Button, Icon, Grid} from 'native-base';
import StepIndicator from 'react-native-step-indicator';

import EstmtCreateBasicForm from './estimateCreate/EstmtCreateBasicForm'
import EstmtCreateAddrForm from './estimateCreate/EstmtCreateAddrForm'
import EstmtCreatefurnitureForm from './estimateCreate/EstmtCreatefurnitureForm'
import EstmtCreatePhotoForm from './estimateCreate/EstmtCreatePhotoForm'


import { MonoText } from '../components/StyledText';




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

const secondIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize:40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013'
}

const thirdIndicatorStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#7eaec4',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#7eaec4',
  stepStrokeUnFinishedColor: '#dedede',
  separatorFinishedColor: '#7eaec4',
  separatorUnFinishedColor: '#dedede',
  stepIndicatorFinishedColor: '#7eaec4',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: 'transparent',
  stepIndicatorLabelFinishedColor: 'transparent',
  stepIndicatorLabelUnFinishedColor: 'transparent',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#7eaec4'
}

const html = `
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
        <div id="test-app">Hello world!</div>

    </body>
    </html>
`

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();

      this.state = {
          currentPage:1
      }
  }

  componentWillReceiveProps(nextProps,nextState) {
    if(nextState.currentPage != this.state.currentPage) {
      if(this.viewPager) {
        this.viewPager.setPage(nextState.currentPage)
      }
    }
  }

  render() {
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

        <Content>
          <Grid>
            <Button large  primary >
              <Text>이전</Text>
            </Button>
            <Button large success>
              <Text>다음</Text>
            </Button>
          </Grid>
        </Content>
      </View>
    );
  }

  renderViewPagerPage = (data, i) => {
    if(i == 0)
    {
      return(
        <View key={i} style={styles.page} style={{width:350, height:400}}>
          <EstmtCreatePhotoForm />
        </View>
      );
    }
    else if(i == 1)
    {
      return(
        <View style={styles.page} key={i}>
          <EstmtCreateAddrForm />
          <Text>test2</Text>
        </View>
      );
    }
    else
    {
      return(
        <View style={styles.page} key={i}>
            <EstmtCreateAddrForm />
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
  }
});
