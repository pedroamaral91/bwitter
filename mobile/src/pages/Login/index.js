import React, { Component } from 'react';
import { 
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

class Login extends Component {
  state = {
    username: ''
  }

  handleChange = username => this.setState({ username })
  handleSubmit = async () => {
    const { username } = this.state;
    if (!username.length) return;
    await AsyncStorage.setItem("@Bwitter:username", username);
    this.props.navigation.navigate('App');
  }
  async componentDidMount() {
    const username = await AsyncStorage.getItem('@Bwitter:username');
    if (username) {
      this.props.navigation.navigate("App");
    }
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.content}>
        <Icon name="twitter" size={64} color="#4BB0EE" />
        <TextInput 
          style={styles.input}
          placeholder="Username"
          returnKeyType="send"
          value={this.state.username}
          onChangeText={this.handleChange}
          onSubmitEditing={this.handleSubmit}
        />
        <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )       
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    height: 44,
    paddingHorizontal: 15,
    alignSelf: "stretch",
    marginTop: 30
  },

  button: {
    height: 44,
    alignSelf: "stretch",
    marginTop: 10,
    backgroundColor: "#4BB0EE",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default Login;