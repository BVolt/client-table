//Import our class and initial array
import {Client, initialList} from './clientClass.js';

//Check if there is a state in local storage
if (!localStorage.getItem('clientList')){
    let list = initialList;
    localStorage.setItem('clientList', JSON.stringify(list));
}

//Variables
let clientList = JSON.parse(localStorage.getItem('clientList'));
let edit = false;
let editIndex = -1;
const openForm = document.querySelector('#openForm');
const formSubmit = document.querySelector('#formSubmit');
const remove = document.querySelector('#remove');
const update = document.querySelector('#update');
const cancelAdd = document.querySelector('#reset1');
const cancelRemove = document.querySelector('#reset2');
const removeField = document.querySelector('#removeName');
const removeForm = document.querySelector('#removeForm');
const clientForm = document.querySelector('#clientForm');
const editButton = document.querySelector('#editButton');
const editEntry = document.querySelector('#edit');
const editInput = document.querySelector('#editClient');
const editForm = document.querySelector('.editForm')

//Functions

//This function uses a for loop to display all objects in the array as table elements
function displayClients(list){
    var table = document.querySelector('#clientTable');
    table.innerHTML = "";
    
    for (var i = 0; i < list.length; i++){
        var row =`<tr>
                    <td>${list[i].name}</td>
                    <td>${list[i].weight}</td>
                    <td>${list[i].height}</td>
                    <td>${list[i].age}</td>
                    <td>${list[i].gender}</td>
                    <td>${list[i].activity}</td>
                </tr>`
        table.innerHTML += row
    }
}


//This function display our form by changing css styles
openForm.addEventListener('click', button => {
    removeForm.style.display = 'none';
    editForm.style.display = 'none';
    clientForm.style.display = 'block';
})


//This function opens our remove form on click and creates the list of options in select tag
remove.addEventListener('click', button =>{
    clientForm.style.display='none';
    editForm.style.display = 'none';
    removeForm.style.display = 'block';
    removeField.innerHTML = `<option>Choose Client</option>`;

    for (var i = 0; i < clientList.length; i++){
        var listItem = `<option>${clientList[i].name}</option>`;
        removeField.innerHTML += listItem;
    }
})


//This function updates the array on click by using the array splice function
update.addEventListener('click', button =>{
    for (var i = 0; i < clientList.length; i++){
        if(clientList[i].name === removeField.value){
            clientList.splice(i, 1);
        }
    }
    localStorage.setItem('clientList', JSON.stringify(clientList));
    displayClients(clientList)
    removeForm.style.display = 'none';
    removeField.value = null;
})


//This button opens the edit options and creates a list from the names of client objects in the array
editEntry.addEventListener('click', button =>{
    clientForm.style.display='none';
    removeForm.style.display = 'none';
    editForm.style.display = 'block';
    editInput.innerHTML = `<option>Choose Client</option>`;
    for (var i = 0; i < clientList.length; i++){
        var listItem = `<option>${clientList[i].name}</option>`;
        editInput.innerHTML += listItem;
    }
})


//This function sets up the add form to edit an existing entry
editButton.addEventListener('click', button => {
    for (var i = 0; i < clientList.length; i++){
        if(clientList[i].name === editInput.value){
            document.querySelector('#name').value = clientList[i].name;
            document.querySelector('#wght').value = clientList[i].weight;
            document.querySelector('#hght').value = clientList[i].height;
            document.querySelector('#age').value = clientList[i].age;
            document.querySelector('#gend').value = clientList[i].gender;
            document.querySelector('#act').value = clientList[i].activity;
            editIndex = i;
            edit = true;
        }
    }
    editForm.style.display = 'none';
    clientForm.style.display = 'block'
    editInput.value = null;
})


//This function submits our form on click and commits the input to local storage so long as all validatio parameters are met.
formSubmit.addEventListener('click', button => {
    const inpName = document.querySelector('#name').value;
    const inpWeight = document.querySelector('#wght').value;
    const inpHeight = document.querySelector('#hght').value;
    const inpAge = document.querySelector('#age').value;
    const inpGender = document.querySelector('#gend').value;
    const inpActivity = document.querySelector('#act').value;

    if (inpName == "" || inpWeight == "" || inpHeight == "" || inpAge == "" || inpGender == "Choose Gender" || inpActivity == "Choose activity level") {
        alert("Missing Required Field!");
        button.preventDefault();
        return;
    }

    if (inpWeight <= 0 || inpHeight <= 0 || inpAge <= 0) {
        alert("Invalid Input! \n Values cannot be less than or equal to zero.");
        button.preventDefault();
        return;
    }

    if (inpWeight > 700 || inpHeight > 108 || inpAge > 120) {
        var alertText = "";
        if(inpWeight > 700){
            alertText +="Weight must not exceed 700 pounds.\n";
        }
        if(inpHeight > 108 ){
            alertText +="Height must not exceed 108 inches.\n";
        }
        if(inpAge > 120){
            alertText +="Age must not exceed 120 years.\n";
        }
        alert(alertText);
        button.preventDefault();
        return;
    }

    if (edit == true){
        clientList[editIndex].name = inpName;
        clientList[editIndex].weight = inpWeight;
        clientList[editIndex].height = inpHeight;
        clientList[editIndex].age = inpAge;
        clientList[editIndex].gender = inpGender ;
        clientList[editIndex].activity = inpActivity;
        edit = false;
    }
    else{
        let newClient = new Client(inpName, inpWeight, inpHeight, inpAge, inpGender, inpActivity);
        clientList.push(newClient);
    }

    if (isNaN(clientList[clientList.length - 1].weight) || isNaN(clientList[clientList.length - 1].height) || isNaN(clientList[clientList.length - 1].age)){
        var alertText = "";

        if(isNaN(clientList[clientList.length - 1].weight))
            alertText +="Weight must be a number\n"
        if(isNaN(clientList[clientList.length - 1].height))
            alertText +="Height must be a number\n"
        if(isNaN(clientList[clientList.length - 1].age))
            alertText +="Age must be a number\n"
        alert(alertText);
        button.preventDefault();
        clientList.pop();
        return;
    }
    displayClients(clientList);

    localStorage.setItem('clientList', JSON.stringify(clientList));

})


//This function handles our cancel add button click
cancelAdd.addEventListener('click', button => {
    clientForm.style.display = 'none';
    clientForm.reset();
    edit = false;
})


//This function handles the cancel remove button click
cancelRemove.addEventListener('click', button => {
    removeForm.style.display = 'none';
    removeField.value = null;
})


//This is our cancel button for edit form
cancelEdit.addEventListener('click', button =>{
    document.querySelector('.editForm').style.display = 'none';
})


//Call display function
displayClients(clientList);