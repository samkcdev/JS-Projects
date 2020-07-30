let writingArea = document.querySelector("textarea");
let counter = document.getElementById("count-bar");
// counter.innerHTML = `Number of Characters are ${writingArea.value.length}`;
writingArea.focus();
console.log(document.activeElement.tagName);
let wordCount = [];
writingArea.addEventListener(
  "input",
  (event) => {
    console.log(event);

    let wordcountSplit = writingArea.value
      //split based on regex that takes space \n\r\s
      .split(/[\n\r\s]+/g)
      //we get an array of chunks of what we type
      //we filter out only if array have value a new array is returned
      .filter((word) => {
        return word.length > 0;
      });

    console.log(wordcountSplit);

    // if (event.keyCode == 32) {
    //   wordCount++;
    // }
    counter.innerHTML = `Count is ${wordcountSplit.length} Number of Characters are ${writingArea.value.length} `;
  },
  false
);
