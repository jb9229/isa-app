import React from 'react';
import {StyleSheet,} from 'react-native';
import {Button, Container, Col, Content, Form, Grid, Header, Item, Row, Text, Textarea } from 'native-base';



//class
export default class EstmtCreateCommForm extends React.Component{
  constructor() {
    super();

    this.state = {
      errorMessage: '',
      commentData: {
        clientAsk: ''
      }
    }
  }

  render() {
    return(
      <Form>
     
        <Textarea
          onChangeText={(text) =>
            this.setState({
              ...this.state,
              commentData: {
                clientAsk: text
              }
            })}
          rowSpan={5} bordered placeholder="고객요청 사항" />

        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>


        <Grid style={{marginTop: 100}}>
          <Col>
            <Button block  primary onPress={() => this.props.previousePage()}>
              <Text>이전</Text>
            </Button>
          </Col>
          <Col>
            <Button block success onPress={() => this.handleSubmit()}>
              <Text>저장</Text>
            </Button>
          </Col>
        </Grid>
      </Form>
    );
  }

  //Method of Submit Info Validation
  isValidSubmitInfo = () => {
    if(this.state.commentData.clientAsk == ''){this.setState({errorMessage: '고객 요청사항이 없으면 (없음)으로 입력해 주세요!'}); return false;}

    return true;
  }

  handleSubmit() {
    let isValid = this.isValidSubmitInfo();

    if(!isValid){return;}

    this.props.saveCommInfo(this.state.commentData);
  }
}

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red'
  },
});
