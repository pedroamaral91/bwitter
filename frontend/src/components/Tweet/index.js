import React from 'react';
import like from './../../assets/like.svg';
import './tweet.css';

const Tweet = (props) => (
  <li className="tweet">
    <strong>{props.tweet.author}</strong>
    <p>{props.tweet.content}</p>
    <button type="button" onClick={() => props.handleLike(props.tweet)}>
      <img src={like} alt="Like" />
      {props.tweet.likes}
    </button>
  </li>
)

export default Tweet;