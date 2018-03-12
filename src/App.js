import React, { Component } from 'react';
import Pulse from './Components/Loaders/Pulse'

// url for json quotes
// https://spreadsheets.google.com/feeds/list/1wZlQC3Mc4hlSrigbKSbfwZCVJQo1HdOkr442ojiWBBI/od6/public/values?alt=json

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      quotes: [],
      authors: [],
      hasQuotes: false,
      index: -1,
    }
    this.changeQuote = this.changeQuote.bind(this);
  }
  componentDidMount(){
    fetch('https://spreadsheets.google.com/feeds/list/1wZlQC3Mc4hlSrigbKSbfwZCVJQo1HdOkr442ojiWBBI/od6/public/values?alt=json')
      .then((response)=>{
        return response.json()
      })
      .then((data)=>{
        // clean data (also cause react doesnt like objects in child?!?!)
        const quotes = [];
        const authors = [];
        for(let i = 0 ; i < data.feed.entry.length; i++){
          quotes.push(data.feed.entry[i]['gsx$quotes']['$t']);
          authors.push(data.feed.entry[i]['gsx$author']['$t']);
        }
        this.setState({
          quotes: quotes,
          authors: authors,
          index: getRandomInt(0, quotes.length),
          hasQuotes: true,
        })
      })
  }
  changeQuote(){
    this.setState({
      index: getRandomInt(0, this.state.quotes.length),
    })
  }
  render() {
    const index = this.state.index;
    const styles = {
      wrapper: {
        display: 'table',
        minHeight: '50vh',
        maxWidth: '90vw',
        margin: 'auto',
        textAlign: 'center',
        letterSpacing: '.02rem',
      },
      loader: {
        display: this.state.hasQuotes ? 'none' : 'block',
      },
      datawrapper: {
        display: this.state.hasQuotes ? 'block' : 'none',
      },
      quote: {
        fontSize: '1.5rem',
        marginBottom: '10px',
        paddingTop: '10px',
      },
      author: {
        fontSize: '1.2rem',
        fontWeight: '800',
        marginBottom: '50px',
      },
      button: {
        height: '1rem',
        color: 'rgb(233, 233, 233)',
        border: '1px solid rgb(233, 233, 233)',
        padding: '15px',
        cursor: 'pointer',
        transition: '400ms',
      }
    }
    return (
      <div style={styles.wrapper}>
        <div style={styles.loader}>
          <Pulse
            maxSize={125}
            minSize={7}
            borderSize={7}
            color={'white'}
            delay={700}/>
        </div>
        <div style={styles.datawrapper}>
          <div style={styles.quote}>
            "{this.state.quotes[index]}"
          </div>
          <div style={styles.author}>
            - {this.state.authors[index]}
          </div>
          <span className='button' style={styles.button} onClick={this.changeQuote}>
            Change Quote
          </span>
        </div>
      </div>
    );
  }
}

export default App;
