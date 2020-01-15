window.onload = function() {
  let listInput = document.querySelector("input");
  let addBtn = document.querySelector("button");
  let listParent = document.querySelector("ul");
  let errorMsg = document.querySelector(".error");

  let check =
    '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>';

  let trashIcon =
    '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path></svg>';

  addBtn.addEventListener("click", addListItems);
  //adding the and setting it to localstorage
  function addListItems(e) {
    let inputVal = listInput.value;
    emptyMsg.style.display = "none";
    if (inputVal !== "") {
      listCreation(inputVal);
      if (localStorage.getItem("toDoLists") === null) {
        var listArray = [];
        listArray.push(inputVal);
        localStorage.setItem("toDoLists", JSON.stringify(listArray));
      } else {
        var getItems = JSON.parse(localStorage.getItem("toDoLists"));
        getItems.push(inputVal);
        localStorage.setItem("toDoLists", JSON.stringify(getItems));
      }
      errorMsg.style.display = "none";
    } else {
      errorMsg.style.display = "block";
    }

    e.preventDefault();
  }
  //getting the stored data
  var data = JSON.parse(localStorage.getItem("toDoLists"));
  var doneData = JSON.parse(localStorage.getItem("doneLists"));

  data.forEach(element => {
    listCreation(element);
  });
  doneData.forEach(element => {
    doneListCreation(element);
  });

  // for (let a = 0; a < data.length; a++) {
  //   listCreation(data[a]);
  // }

  // for (let b = 0; b < doneData.length; b++) {
  //   doneListCreation(doneData[b]);
  // }

  // show message when no data is present
  var emptyMsg = document.querySelector(".msg-empty");

  if (data.length === 0) {
    emptyMsg.style.display = "block";
  }

  // var doneData = JSON.parse(localStorage.getItem("doneLists"));

  //Creating the list dynamically
  function listCreation(text) {
    let itemLi = document.createElement("LI");
    let actionButtonsContainer = document.createElement("DIV");
    let addBtn = document.createElement("button");
    let deleteBtn = document.createElement("button");
    itemLi.textContent = text;
    console.log(itemLi.textContent);
    addBtn.addEventListener("click", checkOfflist);
    deleteBtn.addEventListener("click", removeItem);

    listParent.appendChild(itemLi);
    itemLi.appendChild(actionButtonsContainer);

    actionButtonsContainer.appendChild(addBtn);
    addBtn.classList.add("add");
    actionButtonsContainer.appendChild(deleteBtn);
    deleteBtn.classList.add("delete");

    deleteBtn.innerHTML = trashIcon;
    addBtn.innerHTML = check;
  }

  function checkOfflist() {
    let getTodoList = JSON.parse(localStorage.getItem("toDoLists"));

    doneListCreation(this.parentNode.parentNode.textContent);

    if (localStorage.getItem("doneLists") === null) {
      var doneArray = [];
      doneArray.push(this.parentNode.parentNode.textContent);
      localStorage.setItem("doneLists", JSON.stringify(doneArray));
    } else {
      var getItems = JSON.parse(localStorage.getItem("doneLists"));
      getItems.push(this.parentNode.parentNode.textContent);
      localStorage.setItem("doneLists", JSON.stringify(getItems));
    }

    for (let a = 0; a < getTodoList.length; a++) {
      if (getTodoList[a] === this.parentNode.parentNode.textContent) {
        getTodoList.splice(a, 1);
        var itemLi = this.parentNode.parentNode;
        var itemLiParent = itemLi.parentNode;
        itemLiParent.removeChild(itemLi);
      }
    }
    localStorage.setItem("toDoLists", JSON.stringify(getTodoList));
  }

  function doneListCreation(doneListItem) {
    var doneUl = document.querySelector(".done-list-section");
    var doneLi = document.createElement("LI");
    doneLi.textContent = doneListItem;
    doneUl.appendChild(doneLi);
  }

  //remove list
  function removeItem() {
    var allData = JSON.parse(localStorage.getItem("toDoLists"));

    for (let a = 0; a < allData.length; a++) {
      console.log(allData[a]);
      if (allData[a] === this.parentNode.parentNode.textContent) {
        allData.splice(a, 1);
        var itemLi = this.parentNode.parentNode;
        var itemLiParent = itemLi.parentNode;
        itemLiParent.removeChild(itemLi);
      }
    }
    localStorage.setItem("toDoLists", JSON.stringify(allData));
  }
};
