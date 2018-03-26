'use strict';
var resultsDiv = document.querySelector('.resultsList');
const dictionaryData = data;
const dataSize = Object.keys(dictionaryData["words"]).length;
var SEARCH_VALUE = "";

//===== Possibly return array instead and destructure array values
// check index for contains
function returnArray(i = "") {
  let kanji = dictionaryData["words"][i]["kanji"];
  let kana = dictionaryData["words"][i]["kana"];
  let english = dictionaryData["words"][i]["english"];
  return [kanji, kana, english];
}

/* == Returns a row if it contains the value found in the english key/column 
  arrayIndex: defines the current index begin searched, ex: 0,1,2, etc...
  searchText: value inputed into the text field
==*/
function searchBy(arrayIndex = "", searchText = "") {
  let kanji = returnArray(arrayIndex)[0];
  let kana = returnArray(arrayIndex)[1];
  let english = returnArray(arrayIndex)[2];

  let itemRow = "undefined";
  let div = document.createElement("div");
  if (kanji.includes(searchText) || kana.includes(searchText) || english.includes(searchText)) {
    itemRow = `<div class="col">${kanji}</div><div class="col">${kana}</div><div class="col">${english}</div>`;
  }
  div.className = "row";
  div.innerHTML = itemRow;
  //custom data field display index value dictionary
  div.setAttribute("data-index", arrayIndex); 
  //set onclick
  div.setAttribute("onclick", `getDetails(${arrayIndex})`);
  return div;
}

/* == Initially load all words ==*/
function resultsItr(searchText = "") {
  resultsDiv.innerHTML = "";
  for (let i = 0; i < dataSize; i += 1) {
    let result = searchBy(i, searchText);
    let txt = result.innerText;
    if (txt != "undefined") {
      resultsDiv.appendChild(result);
    }
  }
};

/* == When Enter key presses run function == */
window.addEventListener('keydown', function (keyPressed) {
  if (keyPressed.keyCode === 13 || keyPressed.code === 'Enter' || keyPressed.key === 'Enter') {
    let textField = document.querySelector('#search');
    let v = textField.value;
    SEARCH_VALUE = v;
    resultsItr(v);
  }
});

/* == Back to full list button ==*/
function backBtn(){
  //get last value searched
  resultsItr(SEARCH_VALUE);
}
/* == Object Details ==*/
function getDetails(i = null){
  let obj = dictionaryData["words"][i];
  let objSize = Object.keys(obj).length;
  //get all key value pairs from object
  let html = `
    <div class="row border border-success border-right-0 border-left-0 border-top-0">
      <div class="col text-primary"><button class="btn btn-link text-success" onclick="backBtn()"> &#10094; Back</button></div>
    </div>`;
  for(let kvIndex = 0; kvIndex < objSize; kvIndex += 1){
    let key = Object.keys(obj)[kvIndex];
    let value = Object.values(obj)[kvIndex];
    html += `<div class="row">
              <div class="col-sm-12">
                <div class="details-key">${key}</div>
                <div class="details-value">${value}</div>
              </div>
            </div>`;
  }
  //clear out listing and display data
  resultsDiv.innerHTML = `${html}`;
}
