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

wrapper.addEventListener('click', (event) => {
    let element = event.target;
    
    if (element.closest('.task__DeleteBtn')) {
        const deleteBtn = element;
        deleteTask(deleteBtn);
        return;
    }

    if (element.closest('.task__checkbox')) {
        const checkbox = element;
        handleCheckbox(checkbox);
        return
    }

    if(element.closest('.task__EditBtn')) {
        const editBtn = element;
        editTask(editBtn)
        return
    }
})

function render(tasks = arrTasks) {
    wrapper.innerHTML = '';
    tasks.forEach((task) => {

        let block = document.createElement('div'); 
        block.classList.add('task');

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('.task__checkbox')
        checkbox.checked = task.isDone;
        checkbox.dataset.id = task.id

        let paragraph = document.createElement('p');
        paragraph.textContent = task.title;

        let taskEditBtn = document.createElement('button');
        taskEditBtn.classList.add('task__EditBtn');
        taskEditBtn.textContent = 'Редактировать';
        taskEditBtn.dataset.id = task.id;
        
        let taskDeleteBtn = document.createElement('button');
        taskDeleteBtn.classList.add('task__DeleteBtn');
        taskDeleteBtn.textContent = 'Удалить';
        taskDeleteBtn.dataset.id = task.id
        
        block.append(checkbox, paragraph, taskEditBtn, taskDeleteBtn);

        wrapper.append(block);
    }) 
}
render();

toDoListAddBtn.addEventListener('click', addTask);

function addTask() {
    let text = input.value;
    input.value = ""
    
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

input.addEventListener('keydown', (e) => {

    if(e.key === "Enter") {
        addTask()
    }
})


toDoListBtns.forEach(btn => btn.addEventListener('click', (event) => {
    let target = event.currentTarget;
    
    if(target.classList[1] === "theAll__btn") {
        filterAllTask()
    }
    
    if(target.classList[1] === "completed__btn") {
        filterDoneTask()
    }

    if(target.classList[1] === "notCompleted__btn") {
        filterNotDoneTask()
    }
}))

function deleteTask(deleteBtn) {
    let idCurDeleteBtn = deleteBtn.dataset.id;
    arrTasks = arrTasks.filter((task) => task.id !== Number(idCurDeleteBtn));
    render();
}

function filterDoneTask() {
    let doneTask = arrTasks.filter((task) => task.isDone === true);
    render(doneTask);
}

function filterNotDoneTask() {
    let notDoneTask = arrTasks.filter((task) => task.isDone === false);
    render(notDoneTask);
}

function filterAllTask() {
    render(); 
}

function handleCheckbox(checkbox) {
    let checkboxId = checkbox.dataset.id;
    arrTasks = arrTasks.map(task => task.id === Number(checkboxId) ? {...task, isDone: !task.isDone} : task);
    checkAllTask();
}

function editTask(editBtn) {
    let curTask = editBtn.dataset.id;
    const input = document.createElement('input');

    if(editBtn.previousSibling.value === "") {
        editBtn.previousSibling.classList.add('inputError');
        editBtn.previousSibling.placeholder = "Название не может быть пустым";
        return 
    }
    
    if(editBtn.textContent != "Сохранить") {
        editBtn.textContent = "Сохранить";
        input.value = editBtn.previousSibling.textContent;
        editBtn.previousSibling.replaceWith(input);
    } else {
        editBtn.textContent = "Редактировать";
        arrTasks = arrTasks.map(task => task.id === Number(editBtn) ? {...task, title: editBtn.previousSibling.value} : task);
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