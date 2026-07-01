const input = document.querySelector('.task-input');
const wrapper = document.querySelector('.tasks');
const toDoListBtns = document.querySelectorAll('.filter-btn')
const toDoListAddBtn = document.querySelector('.add-btn');
const toggleRemoveBtn = document.querySelector('.removeAll__btn');
const counterTasks = document.querySelector('.counter-number');


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
    
    if (element.closest('.delete-btn')) {
        const deleteBtn = element;
        deleteTask(deleteBtn);
        return;
    }

    if (element.closest('.task__checkbox')) {
        const checkbox = element;
        handleCheckbox(checkbox);
        return
    }

    if(element.closest('.edit-btn')) {
        const editBtn = element;
        editTask(editBtn)
        return
    }
})

function render(tasks = arrTasks) {
    wrapper.innerHTML = '';
    counterTasks.textContent = arrTasks.length;

    if(arrTasks.length === 0) {
        wrapper.textContent = "Активных задач нет";
        wrapper.style.color = "white"
        return
    }
    tasks.forEach((task) => {

        let block = document.createElement('div'); 
        block.classList.add('task');

        let label = document.createElement('label')
        label.classList.add('task-content')

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('.task__checkbox')
        checkbox.checked = task.isDone;
        checkbox.dataset.id = task.id

        let paragraph = document.createElement('span');
        paragraph.textContent = task.title;

        label.append(checkbox, paragraph);

        let taskAction = document.createElement('div');
        taskAction.classList.add('task-actions');

        let taskEditBtn = document.createElement('button');
        taskEditBtn.classList.add('edit-btn');
        taskEditBtn.textContent = '✏️';
        taskEditBtn.dataset.id = task.id;
        
        let taskDeleteBtn = document.createElement('button');
        taskDeleteBtn.classList.add('delete-btn');
        taskDeleteBtn.textContent = '🗑️';
        taskDeleteBtn.dataset.id = task.id

        taskAction.append(taskEditBtn, taskDeleteBtn)
        
        block.append(label, taskAction);

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
    toDoListBtns.forEach(btn => btn.classList.remove('active'))

    if(target.classList[1] === "theAll__btn") {
        target.classList.add('active')
        filterAllTask()
    }
    
    if(target.classList[1] === "completed__btn") {
        target.classList.add('active')
        filterDoneTask()
    }
    
    if(target.classList[1] === "active__btn") {
        target.classList.add('active')
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
    // console.log(editBtn.parentNode.previousSibling.lastChild)
    let input = document.createElement('input');
    input.classList.add('task-input')

   if(editBtn.parentNode.previousSibling.lastChild.value === "") {
        editBtn.parentNode.previousSibling.lastChild.classList.add('inputError');
        editBtn.parentNode.previousSibling.lastChild.placeholder = "Название не может быть пустым";
        return
    }
    
    if(editBtn.textContent != "Save") {
        editBtn.textContent = "Save";
        input.value = editBtn.parentNode.previousSibling.lastChild.textContent;
        editBtn.parentNode.previousSibling.lastChild.replaceWith(input);
    } else {
        editBtn.textContent = "✏️";
        arrTasks = arrTasks.map(task => task.id === Number(editBtn.dataset.id) ? {...task, title: editBtn.parentNode.previousSibling.lastChild.value} : task);
        render()
    }
}


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