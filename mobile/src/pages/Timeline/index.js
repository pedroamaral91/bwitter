import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Tweet from './../../components/Tweet';
import socket from 'socket.io-client';
import * as api from './../../helpers/ApiHelpers';
class Timeline extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('NewTweet')}>
        <Icon 
          name="add-circle-outline" 
          size={24} 
          color="#4BB0EE" 
          style={{ marginRight: 20 }}
        />
      </TouchableOpacity>
    )
  })

  state = {
    tweets: []
  }

  subscribeToEvents = () => {
    const io = socket(`${api.url}`);
    io.on("tweet", data => {
      this.setState({ tweets: [data, ...this.state.tweets] });
    })
    io.on("like", data => {
      this.setState({ tweets: this.state.tweets.map(tweet => 
        tweet._id === data._id ? data : tweet  
      )})
    });
  }

  async componentDidMount() {
    this.subscribeToEvents();
    const fetchApi = await fetch(`${api.url}/tweets`);
    const response = await fetchApi.json();
    return this.setState({ tweets: response });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList 
          data={this.state.tweets}
          keyExtractor={tweet => tweet._id}
          renderItem={({ item }) => <Tweet tweet={item} />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  }
});

export default Timeline;