/*import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();*/

/*

class A {
  constructor(props) {
    this.props = props
  }
}

class B extends A {
  constructor(props) {
    super(props)
    console.log(this.props)
  }
}

console.log(new B({title: 'hello world'}))
*/
/*
import { createRoot } from 'react-dom/client'

function Element(props) {
  return (
  <div>
    <h1>React is {5 + 5} times better with JSX!</h1>
    <p>I am also here!</p>
    <p>I like {props.color}!</p>
  </div>
  );
}

function Fave() {
  return (
    <>
      <p>What's my favorite color?!</p>
      <Element color='lavender' />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <Fave />,
) 
*/
import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './mysass.scss';

class Fruit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Durian",
      adj1: "repulsive",
      adj2: "yellow",
      origin: "Southeast Asia",
      show: true,
      isTargetOn: false
    };

  //Explicitly binds 'this' to the class method
  this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState((prevState) => ({
      isTargetOn: !prevState.isTargetOn
    }));
  }

  delSlander = () => {
    this.setState({show: false});
  }
  /*
  static getDerivedStateFromProps(props, state) {
    return {adj1: props.adjSwitch};
  }
  */
  
  shouldComponentUpdate() {
    return true;
  }
  changeAdjective = () => {
    this.setState({adj1: "spiky"});
  }
  
  componentDidMount() {
    setTimeout(() => {
      this.setState({adj1: "stinky"})
    }, 1000)
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    document.getElementById("div1").innerHTML = 
    "Before the update, the adjective was " + prevState.adj1;
  }
  componentDidUpdate() {
    document.getElementById("div2").innerHTML = 
    "The updated adjective is " + this.state.adj1;
  }
  render() {
    let durianopinions;
    if (this.state.show) {
      durianopinions = <Opinion />;
    };
    return (
      <div>
        <h1>My {this.state.name}</h1>
        <p>
          It is a {this.state.adj1}&nbsp;
          {this.state.adj2} fruit
          from {this.state.origin}.
        </p>
        <button 
          type="button" 
          onClick={this.changeAdjective}
        >Change Adjective</button>
        <div id="div1"></div>
        <div id="div2"></div>
        <div>
          {durianopinions}
          <button type="button" onClick={this.delSlander}>Take that back!</button>
        </div>
        <div>
        <p>The switch is {this.state.isTargetOn ? 'ON' : 'OFF'}</p>
        {/* Passes the bound method to the onClick attribute */}
        <button onClick={this.handleToggle}>
          Toggle
        </button>
      </div>
      </div>
    );
  }
}

class Opinion extends React.Component {
  componentWillUnmount() {
    alert("The component named Durian Opinion is about to be unmounted.");
  }
  render() {
    return (
      <h3>Durian is the worst!!</h3>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Fruit />);

// Create a root node and render your Fruit component into it
//createRoot(document.getElementById('root')).render(
//  <Fruit />, 
//);