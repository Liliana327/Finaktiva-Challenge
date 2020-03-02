// @Model
const store = [];

// @utils
const joinWithComma = (array) => array.join(', ');
const domById = (id) => document.getElementById(id);

// @View
const numberInput = domById('number-input');
const operationSelector = domById('operation-selector');
const addButton = domById('add-btn');
const removeButton = domById('remove-btn')
const displayList = domById('display-list');
const operationOutput =  domById('operation-output');
const countDescription = domById('count-description');
const outputDescription = domById('output-description');

// @actions
const sortAscendingNumbers = (array) => array.sort((nA, nB) => nA - nB);
const sortDescendingNumbers = (array) => sortAscendingNumbers(array).reverse();
const sumAllNumbers = (array) => array.reduce((total, currentNumber) => total + currentNumber);
const multiplyBySelfNumber = (array) => array.map(number => number * number);
const clearAllNumbers = (array) => store.splice(0, array.length);

// @controller

const resetForm = () => {
  numberInput.value = '';
  operationSelector.selectedIndex = 1;
  outputDescription.innerText = '';
  operationOutput.innerText = '';
}


const insertNumber = (event) => {
  const isApprovedEvent = event.key !== 'Enter' && event.type !== 'click'

  if (isApprovedEvent) return false;

  if (!numberInput.value) {
    alert('Debes ingresar un número.');
    return false;
  }

  const newNumber = Number(numberInput.value);
  countDescription.innerText = `Números registrados (${store.length + 1})`;
  store.push(newNumber);
  displayList.innerText = joinWithComma(store);
  resetForm();
}

const removeNumbers = () => {
  storeController('clearAll', store);
  displayList.innerText = '';
  countDescription.innerText = '';
  resetForm();
}

const chooseOperation = (event) => {
  const selectedOperation = event.target.value;
  const caption = event.target.selectedOptions[0].label;
  const operationDone = storeController(selectedOperation, store);
  const result = (typeof operationDone === 'number') ? operationDone : joinWithComma(operationDone);
  outputDescription.innerText = `Resultado de operación elegida - ${caption}`;
  operationOutput.innerText = result;
}

const storeController = (operation, store) => {
  const oldStore = [...store];
  switch(operation) {
    case 'sortAsc': return sortAscendingNumbers(oldStore);
    case 'sortDes': return sortDescendingNumbers(oldStore);
    case 'sumAll': return sumAllNumbers(oldStore);
    case 'multBySelf': return multiplyBySelfNumber(oldStore);
    case 'clearAll': return clearAllNumbers(oldStore);
    default: return store;
  }
}

// @setup
window.onload = () => {
  displayList.innerText = joinWithComma(store);
  addButton.addEventListener('click', insertNumber);
  numberInput.addEventListener('keypress', insertNumber);
  removeButton.addEventListener('click', removeNumbers);
  operationSelector.addEventListener('change', chooseOperation);
}

