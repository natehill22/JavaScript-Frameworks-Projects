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