import React, { Component } from 'react';
import './index.css';
import twitterLogo from './../../assets/twitter.svg'
export default class Login extends Component {
  state = {
    username: '',
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value })
  handleSubmit = e => {
    e.preventDefault();
    const { username } = this.state;    
    if (!username.length) return;
    localStorage.setItem('@Bwitter:username', username);
    this.props.history.push('/timeline');
  }

  render() {
    return (
      <div className="login-wrapper">
        <img src={twitterLogo} alt="LogoTwitter" />
        <form onSubmit={this.handleSubmit}>
          <input
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />
        <button type="submit">Sign in</button>
        </form>
      </div>
    );
  }
}