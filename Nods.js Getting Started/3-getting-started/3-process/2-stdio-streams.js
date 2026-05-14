process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write(chunk); //Echos whatever is input
  }
});

//stdin = input
//stdout = output (console.log prints to this stream)
//stderr = errors

//or process.stdin.pipe)process.stdout) - does the same thing