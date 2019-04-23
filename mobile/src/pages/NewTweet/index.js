import React, { Component } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  SafeAreaView 
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import  * as api from './../../helpers/ApiHelpers';

class NewTweet extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    newTweet: '',
  }
  handleBack = () => this.props.navigation.pop();
  handleChange = newTweet => this.setState({ newTweet }) 
  handeTweet = async () => {
    const { newTweet } = this.state;
    const author = await AsyncStorage.getItem('@Bwitter:username');
    await api.postJSON('tweets', { author: author, content: newTweet });
    this.handleBack();
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.handleBack}>
            <Icon name="close" size={24} color="#4BB0EE" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.handeTweet}>
            <Text style={styles.buttonText}>Tweet</Text>
          </TouchableOpacity>
        </View>
        <TextInput 
          style={styles.input}
          multiline
          placeholder="Whats happend?"
          placeholderTextColor="#999"
          value={this.state.newTweet}
          onChangeText={this.handleChange}
          returnKeyType="send"
          onSubmitEditing={this.handeTweet}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },

  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  button: {
    height: 32,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: "#4BB0EE",
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  },

  input: {
    margin: 20,
    fontSize: 16,
    color: "#333"
  }
});

export default NewTweet;