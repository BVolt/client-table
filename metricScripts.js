import Client from './clientClass.js';

var clientList = JSON.parse(localStorage.getItem('clientList'));
const display = document.querySelector('#display');
const input = document.querySelector('#client');
const bmi = document.querySelector('[data-BMI]');
const bmr = document.querySelector('[data-BMR]');
const calories = document.querySelector('[data-Calories]')
const name = document.querySelector('[data-name]')
const weight = document.querySelector('[data-weight]')
const height = document.querySelector('[data-height]')
const age = document.querySelector('[data-age]')
const gender = document.querySelector('[data-gender]')
const activity = document.querySelector('[data-activity]')

for(var i = 0; i < clientList.length; i++){
    input.innerHTML += `<option>${clientList[i].name}</option>`
}



display.addEventListener('click', button =>{
    name.innerHTML = `Client: `
    weight.innerHTML = `Weight: `
    height.innerHTML = `Height: `
    age.innerHTML = `Age: `
    gender.innerHTML = `Gender: `
    activity.innerHTML = `Activity: `
    bmi.innerHTML = `Body Mass Index: `
    bmr.innerHTML = `Basal Metabolic Rate: `
    calories.innerHTML = `Maintenance Calorie Intake: `
    
    for (var i = 0; i < clientList.length; i++){
        if(clientList[i].name == input.value){
            name.innerHTML += clientList[i].name
            weight.innerHTML += `${clientList[i].weight} lbs`
            height.innerHTML += `${clientList[i].height} in`
            age.innerHTML += clientList[i].age
            gender.innerHTML += clientList[i].gender
            activity.innerHTML += clientList[i].activity
            bmi.innerHTML += `${calcBMI(clientList[i].weight, clientList[i].height).toFixed(1)}`;
            bmr.innerHTML += `${calcBMR(clientList[i].weight, clientList[i].height, clientList[i].age, clientList[i].gender).toFixed(0)} kcal`;
            calories.innerHTML += `${calcCalories(calcBMR(clientList[i].weight, clientList[i].height, clientList[i].age, clientList[i].gender), clientList[i].activity).toFixed(0)} kcal`;
        }
    }
    input.value = null;
})

function calcBMI(weight, height){
    let bmi = 0;
    bmi = ((weight*703)/height/height);
    return bmi;
}

function calcBMR(weight, height, age, gender){
    let bmr = 0;

    if(gender === "Male" || gender === "male"){
        bmr = 66.47 + (6.24 * weight + 12.7 * height)- 6.755 * age;
    }
    else
        bmr = 655.1 + (4.35 * weight + 4.7 * height)- 4.7 * age;

    return bmr;

}

function calcCalories(bmr, activity){
    let expenditure = 0;
    if(activity === "Very High"){
        expenditure = bmr * 1.9;
    }
    else if (activity === "High"){
        expenditure = bmr * 1.725;
    }
    else if (activity === "Moderate"){
        expenditure = bmr * 1.55;
    }
    else if (activity === "Light"){
        expenditure = bmr * 1.375;
    }
    else{
        expenditure = bmr * 1.2;
    }

    return expenditure;
}