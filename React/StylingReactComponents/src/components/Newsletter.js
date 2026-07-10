import React from "react";

import css from "./Newsletter.module.css";

export default function Newsletter() {
  const [email, setEmail] = React.useState(""); //Stores raw string from input field
  const emailPartsCount = countEmailParts(email); //Calculates score from 0-5 on every keystroke
  return (
    <Container>
      <Spectrum aria-hidden>
        {/* Maps over 5 indicator bars and renders a row of them, if conditions are met */}
        {Array.from(Array(5)).map((_, i) => (
          <Bar active={i + 1 <= emailPartsCount} key={i}></Bar>
        ))}
      </Spectrum>
      <Header>
        <h2>Get the newsletter</h2>
      </Header>
      {/* Renders the input field that updates email state upon change */}
      <Email
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(evt) => setEmail(evt.target.value)}
      />
      {/* Renders the sign-up button (it will switch CSS classes to active state when emailPartsCount reaches 5) */}
      <Submit active={emailPartsCount >= 5}>Sign up</Submit>
    </Container>
  );
}

//Creates React components that capture any elements within them and apply CSS class names
function Container(props) {
  return <section className={css.container}>{props.children}</section>;
}

function Header(props) {
  return <header className={css.header}>{props.children}</header>;
}

function Email(props) {
  return <input className={css.email} {...props} />;
}

function Submit(props) {
  return (
    <button className={props.active ? css.submitActive : css.submit}>
      {props.children}
    </button>
  );
}

function Spectrum(props) {
  return (
    <div className={css.spectrum} {...props}>
      {props.children}
    </div>
  );
}

function Bar(props) {
  return <div className={props.active ? css.barActive : css.bar}></div>;
}

//Determines how many steps of the email pattern are completed using Regex
function countEmailParts(email) {
  if (/@.+\..{2,}$/.test(email)) {
    return 5;
  } else if (/@.+\..?$/.test(email)) {
    return 4;
  } else if (/@.+$/.test(email)) {
    return 3;
  } else if (/@/.test(email)) {
    return 2;
  } else if (/.+/.test(email)) {
    return 1;
  } else {
    return 0;
  }
}
