//select form elements
let subjectInput = document.getElementById("subject");
let descInput = document.getElementById("desc");
let severitySelect = document.getElementById("severity");
let assignedInput = document.getElementById("assignedperson");
let submitBtn = document.getElementById("submitForm");
let resetBtn = document.getElementById("resetForm");
let storeLocally = window.localStorage;

let randomNumber = Math.floor(Math.random() * 1500) + 1;

submitBtn.addEventListener("click", getFormData);

console.log(subjectInput.value.length);
// document.addEventListener("DOMContentLoaded", showData);

// showData();
subjectInput.addEventListener("keydown", limitChars);
function limitChars(e) {
  let charCount = document.querySelector(".count");
  charCount.innerText = subjectInput.value.length + "/50";
  let formMsg = document.querySelector(".form-error");
  console.log(e.keyCode);
  if (e.keyCode == 8) {
    formMsg.style.display = "none";
  }

  if (subjectInput.value.length >= 50 && e.keyCode != 8) {
    formMsg.innerText = "Chars more than 50 not allowed";
    formMsg.style.display = "block";
    e.preventDefault();
  }
}

function getFormData(e) {
  let valObj = {
    subjectVal: subjectInput.value,
    descVal: descInput.value,
    severityVal: severitySelect.value,
    assignedVal: assignedInput.value,
    caseStatus: "Open",
    id: randomNumber,
  };

  setDataLocally(storeLocally, valObj);

  e.preventDefault();
}

function setDataLocally(localData, valObj) {
  let dataFromLocal = localData.getItem("formData");
  if (dataFromLocal === null) {
    let formDatas = [];
    formDatas.push(valObj);
    localData.setItem("formData", JSON.stringify(formDatas));
  } else {
    let existingIssues = JSON.parse(localData.getItem("formData"));
    existingIssues.push(valObj);
    localData.setItem("formData", JSON.stringify(existingIssues));
  }
  showData();
}

function showData() {
  let arrayInlocal = JSON.parse(storeLocally.getItem("formData"));
  let ticketContainer = document.querySelector(".issue-container");
  ticketContainer.innerHTML = "";

  for (let i = 0; i < arrayInlocal.length; i++) {
    var divTag = document.createElement("div");

    var uniqueId = arrayInlocal[i].id;

    var arrayIndex = i;

    // var cardActionCloseBtn = document.createElement("button");
    // var cardActionDeleteBtn = document.createElement("button");

    // cardActionCloseBtn.setAttribute("class", "close-btn");
    // cardActionDeleteBtn.setAttribute("class", "delete-btn");
    // cardActionCloseBtn.innerText = "Close Case";
    // cardActionDeleteBtn.innerText = "Delete Case";

    // cardActionCloseBtn.addEventListener("click", function () {

    // });

    // cardActionDeleteBtn.addEventListener("click", function () {
    //   console.log("arrayIndex", arrayIndex);
    //   console.log("uniqueID", uniqueId);
    //   // if (uniqueId) {
    //   //   arrayInlocal.splice(arrayIndex, 1);
    //   //   console.log("arrayInlocal", arrayInlocal);
    //   //   storeLocally.setItem("formData", JSON.stringify(arrayInlocal));
    //   // }
    //   // showData();
    // });

    var ticketNumber = i + 1;

    divTag.setAttribute("class", "issue-card");

    divTag.innerHTML +=
      "<p>" +
      "<span>" +
      "ID: " +
      "</span>" +
      uniqueId +
      "</p>" +
      "<p>" +
      "<span>" +
      "Case Status:" +
      "</span>" +
      arrayInlocal[i].caseStatus +
      "</p>" +
      "<p>" +
      "<span>" +
      "Subject: " +
      "</span>" +
      arrayInlocal[i].subjectVal +
      "</p>" +
      "<p>" +
      "<span>" +
      "Desc: " +
      "</span>" +
      arrayInlocal[i].descVal +
      "</p>" +
      "<p>" +
      "<span>" +
      "Severity: " +
      "</span>" +
      arrayInlocal[i].severityVal +
      "</p>" +
      "<p>" +
      "<span>" +
      "Assigned: " +
      "</span>" +
      arrayInlocal[i].assignedVal +
      "</p>" +
      "<div>" +
      "<button onclick =\"closeStatus('" +
      uniqueId +
      "')\">" +
      "Close Issuse" +
      "</button>" +
      "<button onclick=\"deleteIssue('" +
      uniqueId +
      "')\" class='delete-btn'>" +
      "Delete Case" +
      "</button>" +
      "</div>";

    // divTag.appendChild(cardActionCloseBtn);
    // divTag.appendChild(cardActionDeleteBtn);

    // let closeBtn = document.getElementById("close-btn");
    // let delBtn = document.getElementById("delete-btn");
    // console.log("closeBtn", closeBtn);
    // closeBtn.addEventListener("click", closeStatus);

    ticketContainer.appendChild(divTag);
  }
}

function closeStatus(id) {
  let issuesArr = JSON.parse(storeLocally.getItem("formData"));
  for (let i = 0; i < issuesArr.length; i++) {
    if (issuesArr[i].id == id) {
      issuesArr[i].caseStatus = "Closed";
    }
  }
  storeLocally.setItem("formData", JSON.stringify(issuesArr));
  showData();
}

function deleteIssue(id) {
  let issuesArr = JSON.parse(storeLocally.getItem("formData"));
  for (let i = 0; i < issuesArr.length; i++) {
    if (issuesArr[i].id == id) {
      issuesArr.splice(i, 1);
    }
  }
  storeLocally.setItem("formData", JSON.stringify(issuesArr));
  showData();
}
