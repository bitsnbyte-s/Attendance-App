// ****** LOCAL STORAGE **********
function getSubjectsFromLocalStorage() {
    return localStorage.getItem("AMSubjects") ? JSON.parse(localStorage.getItem('AMSubjects')) : [];
}
function getFromLocalStorage() {
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem('list')) : [];
}

function addToLocalStorage(id, value) {
    // console.log("adding to local storage");
    const grocery = { id: id, value: value };
    // console.log(grocery);
    let items = getFromLocalStorage();
    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items));

}

function removeFromLocalStorage(id) {
    let items = getFromLocalStorage();
    items = items.filter(function (item) {
        if (item.id !== id) {
            return item;
        }
    });
    localStorage.setItem("list", JSON.stringify(items));

}

function editLocalStorage(id, value) {
    let items = getFromLocalStorage();
    items = items.map(function (item) {
        if (item.id === id)
            item.value = value;
        return item;
    });

    localStorage.setItem("list", JSON.stringify(items));
}


// Close Button Functionality
const subjects = [
    'Computer Programming - II',
    'Operating System',
    'Theory Of Computation',
    'DataBase Management System',
    'Artificial Intelligence',
    'Open Learning Course'
]
let subjectsOutput = JSON.parse(window.localStorage.getItem("AMSubjects"));
// console.log(subjectsOutput);

// Function For Close Buttons
function forclosebtns(e) {
    e.parentElement.classList.add('d-none');
}

// ------- AddSubjects Section ---------

// predefined
const subjectvalue = document.getElementById('floatingSubjectAdd');
const addSubjectBtn = document.getElementById('addSubjectBtn');
const allsubjectsadd = document.getElementById('allsubjectsadd');
const allsubjectsmark = document.getElementById('allsubjectsmark');
let id_count = window.localStorage.getItem('idcount');

// Add Subject Event Listener
addSubjectBtn.addEventListener('click', () => {
    if (subjectvalue.value.length < 1) {
        divforalert.innerHTML = `<div class="alert alert-danger justify-content-between d-flex" role="alert">
                <p class="mb-0">
                Please Enter Something To Add
                </p>
                <button onclick="forclosebtns(this)" type="button" class="btn-close p-1" aria-label="Close"></button>
                </div>`;
    }
    else {
        subjectsOutput = JSON.parse(window.localStorage.getItem("AMSubjects"));
        // subjectsOutput.push(subjectvalue.value);
        id_count++;
        subjectsOutput[id_count] = subjectvalue.value;
        window.localStorage.setItem("AMSubjects", JSON.stringify(subjectsOutput));
        refreshSubjectsList();
        subjectvalue.value="";
    }
});

function refreshSubjectsList() {
    subjectsOutput = JSON.parse(window.localStorage.getItem("AMSubjects"));
    // console.log(subjectsOutput);
    let allsubjectsaddinnerhtml = '<h6>Available Subjects:</h6><ul class="list-group list-group-flush">';
    for (const [key, value] of Object.entries(subjectsOutput)) {
        console.log(`${key}: ${value}`);
        allsubjectsaddinnerhtml += `<li class="list-group-item">${value}</li>`;
    }
    allsubjectsaddinnerhtml += '</ul>';
    allsubjectsadd.innerHTML = allsubjectsaddinnerhtml;
}

// ------ Mark Attendance Section
function refreshAttendanceMarkPage(){   
    let attendance = window.localStorage.getItem("AMAttendance") ? JSON.parse(window.localStorage.getItem('AMAttendance')) : {};
    let allsubjectsmarkinnerhtml = '';
    for (const [key, value] of Object.entries(attendance)) {
        allsubjectsmarkinnerhtml += `<div class="row px-2 py-2 border-bottom m-0">
        <div class="col-md-8 py-2">
            ${subjectsOutput[key]} - `;
            if(value[1]!=0){
                allsubjectsmarkinnerhtml += `
                ${value[0]}/${value[1]} | (${value[0]*100/value[1]}%)`;
                if(value[0]*100/value[1] < 75){
                    allsubjectsmarkinnerhtml += `<span class="ps-4 text-danger">Below 75%</span>`;
                }  
                else{
                    allsubjectsmarkinnerhtml += `<span class="ps-4 text-success">Above 75%</span>`;
                }  
            }
            else{
                allsubjectsmarkinnerhtml += `No Lectures Till Yet`;
            }
            
        allsubjectsmarkinnerhtml +=`</div>
        <div class="col-md-4 py-2">
            <button class="btn btn-outline-success">Attend</button>
            <button class="btn btn-outline-danger">Leave</button>
        </div>
    </div>`;
    };
    allsubjectsmarkinnerhtml += '</ul>';
    allsubjectsmark.innerHTML = allsubjectsmarkinnerhtml;
}

window.addEventListener("DOMContentLoaded", () => {
    refreshAttendanceMarkPage();
    refreshSubjectsList();
});