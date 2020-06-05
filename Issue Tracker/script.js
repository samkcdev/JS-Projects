//select form elements
let subjectInput = document.getElementById("subject");
let descInput = document.getElementById("desc");
let severitySelect = document.getElementById("severity");
let assignedInput = document.getElementById("assignedperson");
let submitBtn = document.getElementById("submitForm");
let resetBtn = document.getElementById("resetForm");

submitBtn.addEventListener("click", getFormData);

function getFormData() {
  let formValObj = [
    subjectInput.value,
    descInput.value,
    severitySelect.value,
    assignedInput.value,
  ];
  //   let subjectVal = subjectInput.value;
  //   let descVal = descInput.value;
  //   let severityOption = severitySelect.value;
  //   let asignedVal = assignedInput.value;
  let issueCard = document.querySelector(".issue-card");
  for (let i = 0; i < formValObj.length; i++) {
    var pTag = document.createElement("p");
    pTag.innerText += formValObj[i];
    issueCard.appendChild(pTag);
    console.log("pTag", pTag);
  }
}
