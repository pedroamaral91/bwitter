import React, { Component } from 'react';
import './timeline.css';
import twitterLogo from '../../assets/twitter.svg';
import api from './../../services/api';
import Tweet from './../../components/Tweet';
import socket from 'socket.io-client';


export default class Timeline extends Component {
  state = {
    tweets: [],
    newTweet: '',
  }
  async componentDidMount() {
    this.subscribeToEvents();
    const response = await api.get('tweets');
    this.setState({ tweets: response.data });
  }

  handleChange = (e) => this.setState({[e.target.name]: e.target.value})
  handleNewTweet = async (e) => {
    if (e.keyCode !== 13) return;
    const { newTweet } = this.state;
    const author = localStorage.getItem('@Bwitter:username');
    console.log(newTweet, author);
    await api.post('tweets', { content: newTweet, author });
    this.setState({ newTweet: '' });

  };
  handleLike = async (tweet) => {
    const { _id } = tweet;
    await api.post(`likes/${_id}`);
  }

  subscribeToEvents = () => {
    const io = socket('http://localhost:3000');

    io.on('tweet', data => { this.setState({ tweets: [data, ...this.state.tweets] }) });
    io.on('like', data => {
      this.setState({ tweets: this.state.tweets.map(tweet => 
        tweet._id === data._id ? data : tweet
      )})
    });
  }

  render() {
    return (
      <div className="timeline-wrapper">
        <img height={24} src={twitterLogo} alt="Twitter Logo" />
        <form>
          <textarea
            name="newTweet"
            value={this.state.newTweet}
            onChange={this.handleChange}
            onKeyDown={this.handleNewTweet}
            placeholder="O que está acontecendo?"
          />
        </form>
        <ul className="tweet-list">
          {this.state.tweets.map(tweet => (
            <Tweet key={tweet._id} tweet={tweet} handleLike={this.handleLike} />
          ))}
        </ul>
      </div>
    );
  }

}