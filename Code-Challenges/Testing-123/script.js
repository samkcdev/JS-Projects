//function that takes list of strings
let number = (...listofstring) => {
  let newStringList = [];
  for (let i = 0; i < listofstring.length; i++) {
    let combine = `${i + 1}: ${listofstring[i]}`;
    newStringList.push(combine);
  }
  console.log("newStringList", newStringList);
  return newStringList;
};
let arrayofstring = ["a", "b", "c", "d", "e"];

number(...arrayofstring);
//after checking some solution i could have written this code using map
