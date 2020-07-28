let writingArea = document.querySelector("textarea");

writingArea.addEventListener("keypress", (event) => {
  console.log(event);
  let counter = document.getElementById("count-bar");
  counter.innerHTML = `Number of Characters are ${writingArea.value.length}`;
  //  if(event.keyCode!==){}
});
