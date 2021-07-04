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
const allsubjects = document.getElementById('allsubjects');

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
        subjectsOutput.push(subjectvalue.value);
        window.localStorage.setItem("AMSubjects", JSON.stringify(subjectsOutput));
        refreshSubjectsList();
        subjectvalue.value="";
    }
});

function refreshSubjectsList() {
    subjectsOutput = JSON.parse(window.localStorage.getItem("AMSubjects"));
    // console.log(subjectsOutput);
    let allsubjectsinnerhtml = '<h6>Available Subjects:</h6><ul class="list-group list-group-flush">';
    subjectsOutput.forEach((e) => {
        allsubjectsinnerhtml += `<li class="list-group-item">${e}</li>`;
    })
    allsubjectsinnerhtml += '</ul>';
    allsubjects.innerHTML = allsubjectsinnerhtml;
}


window.addEventListener("DOMContentLoaded", () => {
    refreshSubjectsList();
});