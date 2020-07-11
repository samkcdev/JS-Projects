//function to check min and max

function minMax(...array) {
  // array.map((ele) => {
  //   console.log("Ele", ele);
  //   console.log("Ele", ele == ele);
  //   if (ele == ele) {
  //     console.log("I am working");
  //   }
  // });
  let minVal = array[0];
  let maxVal = array[0];

  for (let i = 0; i < array.length; i++) {
    let value = array[i];
    minVal = value < minVal ? value : minVal;
    maxVal = value > maxVal ? value : maxVal;
  }
  console.log(minVal, maxVal);
  return [minVal, maxVal];
  // for (let i = 0; i < array.length; i++) {
  //   let valFromArr = array[i];
  //   // console.log("valFromArr", valFromArr);
  //   for (let j = 0; j < array.length; j++) {
  //     let innerLoop = array[j];
  //     console.log("valFromArr inside", valFromArr);
  //     console.log("innerLoop", innerLoop);
  //     if (valFromArr < innerLoop) {
  //       if (minVal.indexOf(valFromArr) === -1) {
  //         minVal.push(valFromArr);
  //       }
  //     }
  //     console.log("minVal", minVal);
  //   }
  // }
}

let sampleArray = [1, 2, 3, 4, 5];
minMax(...sampleArray);
