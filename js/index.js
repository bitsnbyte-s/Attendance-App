// window.addEventListener("DOMContentLoaded",()=>{
    // Close Button Functionality
    const subjects = [
        'Computer Programming - II',
        'Operating System',
        'Theory Of Computation',
        'DataBase Management System',
        'Artificial Intelligence',
        'Open Learning Course'
    ]
    let subjectsOutput =  JSON.parse(window.localStorage.getItem("data"))['Subjects'];
    console.log( subjectsOutput);
    const allclosebtns = document.querySelectorAll('.btn-close');
    const divforalert = document.getElementById('foralerts');
    // Array.from(allclosebtns).forEach((e)=>{
    //     console.log(e.parentElement.classList);
    //     e.addEventListener('click',()=>{
    //         console.log('working');
    //         e.parentElement.classList.add('collapse');
    //     })
    // });

    // let data = {'Subjects':subjects}
    // window.localStorage.setItem("data", JSON.stringify(data));

    function forclosebtns(e){
        e.parentElement.classList.add('collapse');
    }

    const subjectvalue = document.getElementById('floatingSubjectAdd');
    const addSubjectBtn = document.getElementById('addSubjectBtn');
    addSubjectBtn.addEventListener('click',()=>{
        // console.log(divforalert);
        // console.log( subjectvalue.value);
        if(subjectvalue.value.length<1){
            divforalert.innerHTML = `<div class="alert alert-danger" role="alert">
            Please Enter Something To Add
            <button onclick="forclosebtns(this)" type="button" class="btn-close p-0" aria-label="Close"></button>
          </div>`;
        }
    });
    const allsubjects = document.getElementById('allsubjects');
    let allsubjectsinnerhtml = '<h6>Available Subjects:</h6><ul class="list-group list-group-flush">';
    subjectsOutput.forEach((e)=>{
        allsubjectsinnerhtml += `<li class="list-group-item">${e}</li>`;
    })
    allsubjectsinnerhtml += '</ul>';
    allsubjects.innerHTML = allsubjectsinnerhtml;
// });