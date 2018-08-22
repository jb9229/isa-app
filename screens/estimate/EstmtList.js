import React from "react";
import {Dimensions, View, FlatList } from "react-native";
import {Grid} from "native-base"
import { List, ListItem, SearchBar } from 'react-native-elements';

import ListFooter from '../../components/ListFooter';

export default class EstmtList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      last: false,
      data: [],
      page:0,
      error: null,
      refreshing: false
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page } = this.state;
    const url = `http://moduisa.ap-northeast-2.elasticbeanstalk.com/api/v1/estimates?page=${page}`;
    // const url = `http://192.168.0.102:80/api/v1/estimates?page=${page}`;
    this.setState({loading: true});

    fetch(url)
    .then(res => res.json())
    .then(res => {
        this.setState({
          data: page === 0 ? res.content : [...this.state.data, ...res.content],
          last: res.last,
          error: res.error || null,
          loading: false,
          refreshing: false
        });
    })
    .catch(error => {
      this.setState({error, loading:false});
    });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 0,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
          // marginLeft: '14%',
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };


  render() {
    var {height, width} = Dimensions.get('window');
    return (

      <List containerStyle={{borderTopWidth:0, borderBottomWidth:0, marginTop:5, marginBottom:5, width: width-10}}>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => (
            <ListItem
              roundAvatar
              button onPress={() => {this.props.detailedEstimate(item.id)}}
              title={item.userName}
              titleStyle={{ color: '#451066', fontWeight: 'bold' }}
              subtitleStyle={{ color: '#b19cba' }}
              subtitle={`${item.mvDate}, ${item.amount}톤`}
              containerStyle={{borderBottomWidth: 0, }}
              avatar={require('../../assets/images/userIcon.png')}
            />
          )}
          ListFooterComponent={
            <ListFooter hasMore={!this.state.last} isLoading={this.state.loading} />
          }
          keyExtractor={ (item, index) => index.toString() }
          ItemSeparatorComponent={this.renderSeparator}
          ListHeader={this.renderHeader}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={10}
        />
      </List>

    )
  }
}
