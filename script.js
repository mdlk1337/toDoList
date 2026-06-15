const input = document.querySelector('.task__input');
const wrapper = document.querySelector('.wrapper__task');
const toDoListBtns = document.querySelectorAll('.btn')
const toggleBtn = document.querySelectorAll('.toggle__btn')
const toDoListAddBtn = document.querySelector('.toDolist__btn');
const toggleRemoveBtn = document.querySelector('.removeAll__btn');



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

        let taskEditBtn = document.createElement('button');
        taskEditBtn.classList.add('task__EditBtn');
        taskEditBtn.textContent = 'Редактировать';
        taskEditBtn.dataset.id = task.id;
        taskEditBtn.addEventListener('click', editTask);
        
        let taskDeleteBtn = document.createElement('button');
        taskDeleteBtn.classList.add('task__DeleteBtn');
        taskDeleteBtn.textContent = 'Удалить';
        taskDeleteBtn.dataset.id = task.id
        taskDeleteBtn.addEventListener('click', deleteTask);
        
        block.append(checkbox, paragraph, taskEditBtn, taskDeleteBtn);

        wrapper.append(block);
    }) 
}
render();

toDoListAddBtn.addEventListener('click', addTask);

function addTask() {
    let text = input.value;
    
    if(text === "") {
        alert('Название задачи не может быть пустое');
        return 
    }
    
    arrTasks = [...arrTasks, {
        id: Number(Date.now()),
        title: text,
        isDone: false,
    }]
    
    render();
}

toDoListBtns.forEach(btn => btn.addEventListener('click', (event) => {
    let target = event.currentTarget;
    
    if(target.classList[1] === "theAll__btn") {
        allTask()
    }
    
    if(target.classList[1] === "completed__btn") {
        finishTask()
    }

    if(target.classList[1] === "notCompleted__btn") {
        notFinishTask()
    }
}))

function deleteTask(event) {
    let idCurTask = event.currentTarget.dataset.id;
    arrTasks = arrTasks.filter((task) => task.id !== Number(id));
    render();
}

function finishTask() {
    let doneTask = arrTasks.filter((task) => task.isDone === true);
    render(doneTask);
}

function notFinishTask() {
    let notDoneTask = arrTasks.filter((task) => task.isDone === false);
    render(notDoneTask);
}

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

toggleBtn.forEach(btn => btn.addEventListener('click', (event) => {
    let target = event.currentTarget;

    if(target.textContent === 'Отметить все') {
        allCheckboxToggle()
    }

    if(target.textContent === 'Убрать все') {
        deleteChekboxAll()
    }
  
}))

function allCheckboxToggle() {
    arrTasks = arrTasks.map(task => task.isDone === false ? {...task, isDone: true} : task);
    checkAllTask();
    render();
}

function deleteChekboxAll() {
    arrTasks = arrTasks.map(task => task.isDone === true ? {...task, isDone: false} : task);
    checkAllTask();
    render();
}

function checkAllTask() {
    let isAddCheckbox = arrTasks.every(task => task.isDone);
    if(isAddCheckbox) {
        toggleRemoveBtn.style.display = 'inline';
    } else {
        toggleRemoveBtn.style.display = 'none';
    }
}