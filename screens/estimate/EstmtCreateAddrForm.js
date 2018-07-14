import React from 'react';
import {StyleSheet, View, WebView} from 'react-native';
import {Button, Grid, Icon, Text} from 'native-base';


export default class EstmtCreateAddrForm extends React.Component {
    propTypes: {
        saveAddrInfo: React.PropTypes.func.isRequired,
        previousePage: React.PropTypes.func.isRequired,
    };

    render() {
        return (
          <View style={styles.container}>
            <WebView
                source={{uri: 'https://jb9229.github.io/postcode/'}}
                style={{flex: 1,}}
                mixedContentMode='always'
            />

            <Grid>
              <Button large  primary onPress={() => this.props.previousePage()}>
                <Text>이전</Text>
              </Button>
              <Button large success onPress={() => this.handleSubmit()}>
                <Text>다음</Text>
              </Button>
            </Grid>
          </View>
        );
    }


    //Method of Save Estimate Address Info
    handleSubmit() {
      // let isValid = this.isValidEstmtBasicInfo();
      //
      // if(!isValid){return;}

      this.props.saveAddrInfo();
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: 350,
    height:450,
  }
});
