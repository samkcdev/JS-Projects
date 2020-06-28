let inputForm = document.querySelector("input");
let btn = document.querySelector("button");

btn.addEventListener("click", reverseNum);

function reverseNum() {
  if (inputForm.value.length === 5) {
    let inputVal = inputForm.value.split("");
    let reverseNum = "";
    for (let i = inputVal.length - 1; i >= 0; i--) {
      let lastVal = inputVal.pop();
      reverseNum += lastVal;
    }
    let resultspan = document.querySelector("div");
    resultspan.innerHTML = "<p>" + `Result is ${Number(reverseNum)}` + "</p>";
  } else if (inputForm.value.length > 5) {
    btn.disabled = true;
  }
}
