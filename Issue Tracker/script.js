//select form elements
let form = document.querySelector("form-container");
let subjectInput = document.getElementById("subject");
let descInput = document.getElementById("desc");
let severitySelect = document.getElementById("severity");
let assignedInput = document.getElementById("assignedperson");
let submitBtn = document.getElementById("submitForm");
let resetBtn = document.getElementById("resetForm");
let storeLocally = window.localStorage;

let randomNumber = Math.floor(Math.random() * 1500) + 1;

submitBtn.addEventListener("click", getFormData);

// document.addEventListener("DOMContentLoaded", showData);

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
  form.reset();

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
    var status = arrayInlocal[i].caseStatus;
    var subject = arrayInlocal[i].subjectVal;
    var decprition = arrayInlocal[i].descVal;
    var priority = arrayInlocal[i].severityVal;
    var assignedPreson = arrayInlocal[i].assignedVal;

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
      status +
      "</p>" +
      "<p>" +
      "<span>" +
      "Subject: " +
      "</span>" +
      subject +
      "</p>" +
      "<p>" +
      "<span>" +
      "Desc: " +
      "</span>" +
      decprition +
      "</p>" +
      "<p>" +
      "<span>" +
      "Severity: " +
      "</span>" +
      priority +
      "</p>" +
      "<p>" +
      "<span>" +
      "Assigned: " +
      "</span>" +
      assignedPreson +
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
  modalGenerator(id);
}

//modal for delete confirmation
//click modal generated dynamically
var divModalParent = document.querySelector(".modal-body-overlay");
function modalGenerator(id) {
  divModalParent.classList.add("show-modal");
  let createModalBody = document.createElement("div");

  createModalBody.setAttribute("class", "modal-body");
  createModalBody.innerHTML =
    "<h3>" +
    "Are you sure?" +
    "</h3>" +
    "<div>" +
    "<button>" +
    "No" +
    "</button>" +
    "<button onclick=\"deleteIssueFromModal('" +
    id +
    "')\">" +
    "Yes" +
    "</button>" +
    "</div>";
  divModalParent.appendChild(createModalBody);
}

function dismissModal(divModalParent) {
  divModalParent.classList.remove("show-modal");
}

function deleteIssueFromModal(id) {
  let issuesArr = JSON.parse(storeLocally.getItem("formData"));
  for (let i = 0; i < issuesArr.length; i++) {
    if (issuesArr[i].id == id) {
      issuesArr.splice(i, 1);
    }
  }
  storeLocally.setItem("formData", JSON.stringify(issuesArr));
  dismissModal(divModalParent);

  showData();
}
