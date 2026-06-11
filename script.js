const btn = document.querySelector('.toDolist__btn');
const input = document.querySelector('.task_input');
const wrapper = document.querySelector('.wrapper__task');
const allBtn = document.querySelector('.btn1');
const finishBtn = document.querySelector('.btn2');
const notFinishBtn = document.querySelector('.btn3');
const allToggle = document.querySelector('.addCheckboxAll');
const deleteCheckbox = document.querySelector('.deleteCheckbox');


let arrTasks = [
    {
        id: 0,
        title: 'Сходить за хлебом',
        isDone: false,
    },

    {
        id: 1,
        title: 'Сходить в спортзал',
        isDone: true,
    },

    {
        id: 2,
        title: 'Погулять с собакой',
        isDone: false,
    },
]

function render(tasks = arrTasks) {
    wrapper.innerHTML = '';
    tasks.forEach((task) => {

        let block = document.createElement('div'); 
        block.classList.add('task');

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.isDone;
        checkbox.dataset.id = task.id
        checkbox.addEventListener('click', handleCheckbox)

        let paragraph = document.createElement('p');
        paragraph.textContent = task.title;

        let btn1 = document.createElement('button');
        btn1.classList.add('task__btn1');
        btn1.textContent = 'Редактировать';
        btn1.dataset.id = task.id;
        btn1.addEventListener('click', editTask);
        
        let btn2 = document.createElement('button');
        btn2.classList.add('task__btn2');
        btn2.textContent = 'Удалить';
        btn2.dataset.id = task.id
        btn2.addEventListener('click', deleteTask);
        
        block.append(checkbox, paragraph, btn1, btn2);

        wrapper.append(block);
    }) 
}
render();

btn.addEventListener('click', addTask);

function addTask() {
    let text = input.value;
    
    if(text === "") {
        alert('Название задачи не может быть пустое');
        return 
    }
    
    // arrTasks.push({
    //     id: Number(new Date()),
    //     title: text,
    //     isDone: false,
    // })
    arrTasks = [...arrTasks, {
        id: Number(Date.now()),
        title: text,
        isDone: false,
    }]
    
    render();
}
 

function deleteTask(event) {
    let id = event.currentTarget.dataset.id;
    arrTasks = arrTasks.filter((task) => task.id !== Number(id));
    render();
}

finishBtn.addEventListener('click', finishTask);

function finishTask() {
    let doneTask = arrTasks.filter((task) => task.isDone === true);
    render(doneTask);
}

notFinishBtn.addEventListener('click', notFinishTask);

function notFinishTask() {
    let notDoneTask = arrTasks.filter((task) => task.isDone === false);
    render(notDoneTask);
}

allBtn.addEventListener('click', allTask);

function allTask() {
    render(); 
}

function handleCheckbox(event) {
    let checkboxId = event.currentTarget.dataset.id;
    arrTasks = arrTasks.map(task => task.id === Number(checkboxId) ? {...task, isDone: !task.isDone} : task);
    checkAllTask();
}

function editTask(event) {
    let curTask = event.currentTarget.dataset.id;
    let curButton = event.currentTarget;
    const input = document.createElement('input');

    if(curButton.previousSibling.value === "") {
        curButton.previousSibling.classList.add('inputError');
        curButton.previousSibling.placeholder = "Название не может быть пустым";
        return 
    }
    
    if(curButton.textContent != "Сохранить") {
        curButton.textContent = "Сохранить";
        input.value = curButton.previousSibling.textContent;
        curButton.previousSibling.replaceWith(input);
    } else {
        curButton.textContent = "Редактировать";
        arrTasks = arrTasks.map(task => task.id === Number(curTask) ? {...task, title: curButton.previousSibling.value} : task);
        render()
    }
}

allToggle.addEventListener('click', allCheckboxToggle);

function allCheckboxToggle() {
    arrTasks = arrTasks.map(task => task.isDone === false ? {...task, isDone: true} : task);
    checkAllTask();
    render();
}

deleteCheckbox.addEventListener("click", deleteChekboxAll);

function deleteChekboxAll() {
    arrTasks = arrTasks.map(task => task.isDone === true ? {...task, isDone: false} : task);
    checkAllTask();
    render();
}

function checkAllTask() {
    let isAddCheckbox = arrTasks.every(task => task.isDone);
    console.log(isAddCheckbox);
    if(isAddCheckbox) {
        deleteCheckbox.style.display = 'inline';
    } else {
        deleteCheckbox.style.display = 'none';
    }
}