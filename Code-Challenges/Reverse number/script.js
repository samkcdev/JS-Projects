let inputForm = document.querySelector("input");
let btn = document.querySelector("button");
console.log(inputForm.value.length);

btn.addEventListener("click", reverseNum);

if (inputForm.value.length > 5) {
}

function reverseNum() {
  if (inputForm.value.length === 5) {
    let inputVal = inputForm.value.split("");
    console.log(inputVal.length);
    let reverseNum = "";
    for (let i = inputVal.length - 1; i >= 0; i--) {
      console.log("i", i);
      let lastVal = inputVal.pop();
      console.log("inputVal", inputVal);
      reverseNum += lastVal;
    }
    console.log("reverseNum", reverseNum);
  } else if (inputForm.value.length > 5) {
    btn.disabled = true;
  }
}
