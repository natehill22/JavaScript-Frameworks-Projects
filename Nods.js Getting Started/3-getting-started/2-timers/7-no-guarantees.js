//Should print the message every 0.5 seconds, but it's derailed/delayed by a massive loop
setTimeout(
  () => console.log('Hello after 0.5 seconds. MAYBE!'),
  500,
);

for (let i = 0; i < 1e10; i++) {
  // Block Node Synchronously
}

//setTimeout is not a guaranteed thing, but rather a minimum thing (minimum of 500ms)