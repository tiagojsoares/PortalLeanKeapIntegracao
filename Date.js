



function format(s) {
  s = padLeft(s, '0', 2);
  // console.log(s);
  return s;
}

function padLeft(text, padChar, size) {
  return (String(padChar).repeat(size) + text).substr(size * -1, size);
}