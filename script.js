let nav = 0;
let clicked = null;
let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
let daySelected = document.createElement('div');
let selectedDayString;
let justStarted = true;
let dateIndex;
let daySelectedTasks = null;
let selectedTask = null;
let selectedTaskIndex;

const calendar = document.getElementById('calendar');
const newTaskModal = document.getElementById('newTaskModal');
const deleteTaskModal = document.getElementById('deleteTaskModal');
const backDrop = document.getElementById('modalBackDrop');
const taskTitleInput = document.getElementById('taskTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const tasklist = document.getElementById('tasklist');

function verifyExistentTasks() {
  for (let i = 0; i < tasks.length; i++) {
    const date = tasks[i].date;
    if (date == selectedDayString) {
      dateIndex = i;
      return true;
    }
  }
}

function refreshSelectedDay(daySquare) {
  daySelected.style.backgroundColor = "white";
  daySelected = daySquare;
  daySelected.style.backgroundColor = "red";
}

function refreshTasks() {
  try {
    tasklist.replaceChildren();
    for (let i = 0; i < daySelectedTasks.tasksNodes.length; i++) {
      const task = daySelectedTasks.tasksNodes[i];
      console.log(task);
      const taskDiv = document.createElement('div');
      taskDiv.classList.add('task');
      taskDiv.innerText = task.title;
      console.log(task.title);

      taskDiv.addEventListener('click', () => {
        console.log('Cliquei na tarefa!!!')
        document.getElementById('taskEditTitleInput').value = task.title;
        selectedTask = task;
        selectedTaskIndex = i;
        deleteTaskModal.style.display = 'block';
      })

      tasklist.appendChild(taskDiv);
    }

  } catch (error) {
    tasklist.replaceChildren();
    console.log(error);
  }

}

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  // Criando o calendário
  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;

    if (i > paddingDays) {
      
      daySquare.innerText = i - paddingDays;
      const tasksForDay = tasks.find(e => e.date === dayString);

      // Data atual
      if (i - paddingDays === day && nav === 0) {
        // daySquare.id = 'currentDay';
        
        // Para a aplicação sempre iniciar com a data atual selecionada
        if (justStarted) {
          daySelected = daySquare;
          daySelected.style.backgroundColor = "red";
          selectedDayString = dayString;
          daySelectedTasks = tasksForDay;
          refreshTasks();  
        }
      }

      // Indicação visual de data selecionada
      if (dayString == selectedDayString) {
        refreshSelectedDay(daySquare);
      }

      // Indicação visual de datas com tarefas anexadas
      if(tasksForDay) {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('taskIndication');
        daySquare.appendChild(taskDiv);
      }

      daySquare.addEventListener('click', () => {
        justStarted = false;
        selectedDayString = dayString;
        refreshSelectedDay(daySquare);
        daySelectedTasks = tasksForDay;
        refreshTasks();      
      })

    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);    
  }
}

function closeModal() {
  taskTitleInput.classList.remove('error');
  newTaskModal.style.display = 'none';
  deleteTaskModal.style.display = 'none';
  backDrop.style.display = 'none';
  taskTitleInput.value = '';
  clicked = null;
  load();
}

function createTask() {
  if (taskTitleInput.value) {
    taskTitleInput.classList.remove('error');

    // Verifica se há alguma task cadastrada na data selecionada
    if (verifyExistentTasks()) {
      tasks[dateIndex].tasksNodes.push(
        {
          title: taskTitleInput.value,
          done: false
        }
      );
    }
    else {
      tasks.push({
        date: selectedDayString,
        tasksNodes: [
          {
            title: taskTitleInput.value,
            done: false
          }
        ]
        }
      );
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    daySelectedTasks = tasks.find(e => e.date === selectedDayString);
    refreshTasks();
    closeModal();
  } else {
    taskTitleInput.classList.add('error');
  }
}

function saveTask() {
  if (taskEditTitleInput.value) {
    taskEditTitleInput.classList.remove('error');

    daySelectedTasks.tasksNodes[selectedTaskIndex].title = taskEditTitleInput.value;

    localStorage.setItem('tasks', JSON.stringify(tasks));

    refreshTasks();
    closeModal();

  } else {
    taskTitleInput.classList.add('error');
  }
}

// TODO
function deleteTask() {
  daySelectedTasks = tasks.find(e => e.date === selectedDayString);
  
  console.log('DELETE');
  console.log(daySelectedTasks);

  daySelectedTasks.tasksNodes = daySelectedTasks.tasksNodes.filter(e => e.title != selectedTask.title);

  console.log(daySelectedTasks);
  
  if (daySelectedTasks.tasksNodes.length == 0) {
    tasks = tasks.filter(e => e.date !== selectedDayString);
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
  
  refreshTasks();
  closeModal();
}

function addTask() {
  newTaskModal.style.display = 'block';

  backDrop.style.display = 'block';
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  document.getElementById('addButton').addEventListener('click', createTask);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('saveButton').addEventListener('click', saveTask);
  document.getElementById('deleteButton').addEventListener('click', deleteTask);
  document.getElementById('closeButton').addEventListener('click', closeModal);
  document.getElementById('btnAddTask').addEventListener('click', addTask);
}

initButtons();
load();