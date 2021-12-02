import React, { Component } from 'react'
import './Joke.css'

class Joke extends Component {
  handleClick(s) {
    this.props.changeScore(s, this.props.id)
  }
  getColor() {
    let color = ''
    if (this.props.score > 8) {
      color = '#4CAF50'
    } else if (this.props.score > 6) {
      color = '#8BC34A'
    } else if (this.props.score > 4) {
      color = '#CDDC39'
    } else if (this.props.score > 2) {
      color = '#FFEB3B'
    } else if (this.props.score > 0) {
      color = '#FFC107'
    } else if (this.props.score > -2) {
      color = '#FF9800'
    } else {
      color = '#f44336'
    }
    return color
  }
  getEmoji() {
    let emoji = ''
    if (this.props.score > 6) {
      emoji = 'ec ec-smiley'
    } else if (this.props.score > 4) {
      emoji = 'ec ec-wink'
    } else if (this.props.score > 2) {
      emoji = 'ec-slightly-smiling-face'
    } else if (this.props.score >= 0) {
      emoji = 'ec ec-roll-eyes'
    } else if (this.props.score >= -2) {
      emoji = 'ec ec-slightly-frowning-face'
    } else if (this.props.score >= -4) {
      emoji = 'ec ec-flushed'
    } else {
      emoji = 'ec ec-fearful'
    }
    return emoji
  }
  render() {
    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <i className="fas fa-arrow-down" onClick={() => this.handleClick(-1)}></i>
          <span className="Joke-score" style={{borderColor: this.getColor()}}>{this.props.score}</span>
          <i className="fas fa-arrow-up" onClick={() => this.handleClick(1)}></i>
        </div>
        <div className="Joke-text">
          <p>{this.props.text}</p>
        </div>
        <div className="Joke-smiley">
          <span className={this.getEmoji()}></span>
        </div>
      </div>
    )
  }
}

export default Joke