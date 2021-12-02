import React, { Component } from 'react'
import axios from 'axios'
import Joke from './Joke'
import './JokeList.css'
import img from'./img/elmo-head-002.svg'


class JokeList extends Component {
  constructor(props) {
    super(props)

    // this.state = {
    //   jokes: [],
    //   isLoading: true
    // }

    this.state = {
      jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),
      isLoading: true
    }

    this.changeScore = this.changeScore.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.clear = this.clear.bind(this)
  }
  static defaultProps = {
    numJokes: 8
  }
  componentDidMount() {
    if (this.state.jokes.length === 0) {
      this.getJokes()
    } else {
      this.setState({isLoading: false})
    }
  }
  async getJokes() {
    try {
      this.setState({isLoading: true})
      let url = 'https://icanhazdadjoke.com/'
      let jokesArr = []
      while (jokesArr.length < this.props.numJokes) {
        let resp = await axios.get(url, {headers: {Accept: 'application/json'}})
        let data = resp.data
        let curJoke = {id: data.id, joke: data.joke, score: 0}
        let containId = this.state.jokes.some(el => el.id === curJoke.id)
        if (!containId) {
          jokesArr.push(curJoke)
        }
      }
      // this.setState({jokes: jokesArr})
      this.setState(st => ({
        jokes: [...st.jokes, ...jokesArr]
      }))
      this.setState({isLoading: false})
      window.localStorage.setItem(
        'jokes',
        JSON.stringify(this.state.jokes)
      )
    } catch(e) {
      alert('net error')
    }
  }
  handleClick() {
    this.getJokes()
  }
  async changeScore(s, id) {
    let saveToLs = () => {window.localStorage.setItem('jokes', JSON.stringify(this.state.jokes))};
    await this.setState(st => ({
      jokes: st.jokes.map(j => {
        if (j.id === id) {
          return {...j, score: j.score + s}
        }
        return j
      })
    })); 
    saveToLs();
  }
  clear() {
    window.localStorage.clear()
    this.setState({jokes: []})
  }
  render() {
    let sorted = this.state.jokes.sort((a,b) => b.score - a.score)
    let jokesList = sorted.map(j => <Joke 
      text={j.joke} 
      key={j.id} 
      id={j.id} 
      score={j.score}
      changeScore={this.changeScore}
      sort={this.sort}
    />)
    let loader = <section className="container">
      <div className="loader loader-1">
          <div className="loader-outter"></div>
          <div className="loader-inner"></div>
      </div>
    </section>
    return (
      <div className="JokeList">
        <div className="JokeList-sidebar">
          <h1 className="JokeList-title"><span>Bad</span> Jokes</h1>
          <img src={img} className="JokeList-img" alt="face"/>
          <button className="JokeList-btn" onClick={this.handleClick}>Add Jokes</button>
          <button className="JokeList-btn" onClick={this.clear}>Clear</button>
        </div>
        <div className="JokeList-main">
          {
            (this.state.isLoading) 
            ? loader 
            : <div>
                  {jokesList}
              </div>
          }
        </div>
      </div>
    )
  }
}

export default JokeList