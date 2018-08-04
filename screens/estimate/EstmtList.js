import React from "react";
import { View, FlatList } from "react-native";
import { List, ListItem, SearchBar } from 'react-native-elements';

import ListFooter from '../../components/ListFooter';

export default class EstmtList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
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
    // const url = `http://moduisa.ap-northeast-2.elasticbeanstalk.com/api/v1/estimates?page=${page}`;
    const url = `http://192.168.0.102:80/api/v1/estimates?page=${page}`;
    this.setState({loading: true});

    fetch(url)
    .then(res => res.json())
    .then(res => {
        this.setState({
          data: page === 0 ? res.content : [...this.state.data, ...res.content],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
    })
    .catch(error => {
      this.setState({error, loading:false});
    });
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
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };


  render() {
    return (
      <List containerStyle={{borderTopWidth:0, borderBottomWidth:0}}>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => (
            <ListItem
              button onPress={() => {this.props.detailedEstimate(item.id)}}
              title={`${item.id}/${item.userName}`}
              subtitle={item.mvDate}
              containerStyle={{borderBottomWidth: 0}}

            />
          )}
          ListFooterComponent={
            <ListFooter hasMore={true} isLoading={this.state.loading} />
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
