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
const divforalert = document.getElementById('foralerts');
let subjectsOutput = localStorage.getItem("AMSubjects") ? JSON.parse(localStorage.getItem('AMSubjects')) : {};
let id_count = localStorage.getItem("idcount") ? JSON.parse(localStorage.getItem('idcount')) : 0;
let attendance = window.localStorage.getItem("AMAttendance") ? JSON.parse(window.localStorage.getItem('AMAttendance')) : {};

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
        // subjectsOutput.push(subjectvalue.value);
        id_count++;
        subjectsOutput[id_count] = subjectvalue.value;
        window.localStorage.setItem("AMSubjects", JSON.stringify(subjectsOutput));
        window.localStorage.setItem("idcount",id_count);
        attendance[id_count] = [0,0];
        window.localStorage.setItem("AMAttendance", JSON.stringify(attendance));
        refreshAttendanceMarkPage();
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


function attend(e){
    const idtoattend = e.dataset.id;
    attendance[idtoattend][0]++;
    attendance[idtoattend][1]++;
    window.localStorage.setItem("AMAttendance", JSON.stringify(attendance));
    refreshAttendanceMarkPage();
}

function leave(e){
    const idtoleave = e.dataset.id;
    attendance[idtoleave][1]++;
    window.localStorage.setItem("AMAttendance", JSON.stringify(attendance));
    refreshAttendanceMarkPage();
}

function editAttendance(e){
    const idtoedit = e.dataset.id;
    console.log(document.getElementById(`floatingAttended${idtoedit}`).value);
    console.log(document.getElementById(`floatingTotal${idtoedit}`).value);
    const attendededit = parseInt(document.getElementById(`floatingAttended${idtoedit}`).value);
    const totaledit = parseInt(document.getElementById(`floatingTotal${idtoedit}`).value);
    console.log(`Attended ${attendededit} :: Total ${totaledit}`)
    if(attendededit<=totaledit){
        // console.log(typeof(attendededit))
        attendance[idtoedit][0]=attendededit;
        attendance[idtoedit][1]=totaledit;
        console.log(attendance);
        window.localStorage.setItem("AMAttendance", JSON.stringify(attendance));
    }
    else{
        divforalert.innerHTML = `<div class="alert alert-danger justify-content-between d-flex" role="alert">
                <p class="mb-0">
                Attended Lectures must be less than or equal to Total
                </p>
                <button onclick="forclosebtns(this)" type="button" class="btn-close p-1" aria-label="Close"></button>
                </div>`;
    }
    refreshAttendanceMarkPage();

}

function refreshAttendanceMarkPage(){
    let allsubjectsmarkinnerhtml = '';
    for (const [key, value] of Object.entries(attendance)) {
        allsubjectsmarkinnerhtml += `<div class="px-2 py-2 border-bottom m-0">
        <div class="row py-2">
        <h6>${subjectsOutput[key]}<a class="ps-2 text-success text-decoration-none" data-bs-toggle="collapse" href="#collapse${key}" role="button" aria-expanded="false" aria-controls="collapse1">(edit
            <i class="fas fa-angle-down text-dark"></i>)</a></h6><div class="attendancerow"><div class="d-inline mx-1"><span>Attendance:</span></div>`;
            // ${subjectsOutput[key]} <a class="ps-2" data-bs-toggle="collapse" href="#collapse${key}" role="button" aria-expanded="false" aria-controls="collapse${key}">
            // <i class="fas fa-angle-down text-dark"></i></a> - `;
            if(value[1]!=0){
                // allsubjectsmarkinnerhtml += `
                // ${value[0]}/${value[1]} | (${parseFloat(value[0]*100/value[1]).toFixed(2)}%)`;
                // allsubjectsmarkinnerhtml += `<div class="d-inline mx-1"><span>${value[0]}/${value[1]} | ${parseFloat(value[0]*100/value[1]).toFixed(2)}%</span></div>`
                if(value[0]*100/value[1] < 75){
                    allsubjectsmarkinnerhtml += `<div class="d-inline mx-1"><span class="text-danger">${value[0]}/${value[1]} | ${parseFloat(value[0]*100/value[1]).toFixed(2)}%</span></div>`;
                }  
                else{
                    allsubjectsmarkinnerhtml += `<div class="d-inline mx-1"><span class="text-success">${value[0]}/${value[1]} | ${parseFloat(value[0]*100/value[1]).toFixed(2)}%</div>`;
                }  
            }
            else{
                allsubjectsmarkinnerhtml += `No Lectures Till Yet`;
            }
            allsubjectsmarkinnerhtml+='</div>'
            
        allsubjectsmarkinnerhtml +=`</div>
            <div class="col-md-4 py-2">
            <button data-id="${key}" onclick="attend(this)" class="btn btn-outline-success">Attend</button>
            <button data-id="${key}" onclick="leave(this)" class="btn btn-outline-danger">Leave</button>
            </div>
        </div>
        <div class="collapse" id="collapse${key}">
            <div class="card card-body">
                <div class="row">
                    <div class="col-md-4 my-2">
                        <div class="form-floating">
                            <input type="number" class="form-control" id="floatingAttended${key}" placeholder="" value="${value[0]}">
                            <label for="floatingAttended${key}" class="fs-6">Attended Lectures</label>
                        </div>
                    </div>
                    <div class="col-md-4 my-2">
                        <div class="form-floating">
                            <input type="number" class="form-control" id="floatingTotal${key}" placeholder="" value="${value[1]}">
                            <label for="floatingTotal${key}" class="fs-6">Total Lectures</label>
                        </div>
                    </div>
                    <div class="col-md-4 my-2 align-self-center text-center">
                        <button class="btn btn-outline-primary" onclick="editAttendance(this)" data-id="${key}">Confirm Submit</button>
                    </div>
                </div>
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
