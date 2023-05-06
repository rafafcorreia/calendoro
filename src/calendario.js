let calendario;

class Calendario {
  constructor() {
    this.nav = 0;
    this.clicked = null;
    this.tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    this.configs = localStorage.getItem('configs') ? JSON.parse(localStorage.getItem('configs')) : { lang: 'en', tempoPomodoro: 25, tempoIntervalo: 5 };
    this.daySelected = document.createElement('div');
    this.selectedDayString;
    this.justStarted = true;
    this.dateIndex;
    this.daySelectedTasks = null;
    this.selectedTask = null;
    this.selectedTaskIndex;
    this.isPomodoro = false;
    this.pomodoro;

    this.calendar = document.getElementById('calendar');
    this.newTaskModal = document.getElementById('newTaskModal');
    this.deleteTaskModal = document.getElementById('deleteTaskModal');
    this.backDrop = document.getElementById('modalBackDrop');
    this.taskTitleInput = document.getElementById('taskTitleInput');
    this.weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.tasklist = document.getElementById('tasklist');
    this.pomodoroModal = document.getElementById('pomodoroModal');
    this.taskEditTitleInput = document.getElementById('taskEditTitleInput');
    this.config = new Config(this);

  }

  verifyExistentTasks() {
    for (let i = 0; i < calendario.tasks.length; i++) {
      const date = calendario.tasks[i].date;
      if (date == calendario.selectedDayString) {
        calendario.dateIndex = i;
        return true;
      }
    }
  }

  refreshSelectedDay(daySquare) {
    calendario.daySelected.removeAttribute('id');
    calendario.daySelected = daySquare;
    calendario.daySelected.id = 'selectedDay';
  }

  refreshTasks() {
    try {
      calendario.tasklist.replaceChildren();
      for (let i = 0; i < calendario.daySelectedTasks.tasksNodes.length; i++) {
        const task = calendario.daySelectedTasks.tasksNodes[i];
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('taskDiv');

        const taskTitle = document.createElement('div');
        taskTitle.classList.add('taskTitle');
        taskTitle.innerText = task.title;

        taskDiv.appendChild(taskTitle);

        const iconPomodoro = document.createElement('img')


        taskTitle.addEventListener('click', () => {
          document.getElementById('taskEditTitleInput').value = task.title;
          calendario.selectedTask = task;
          calendario.selectedTaskIndex = i;
          calendario.deleteTaskModal.style.display = 'block';
        })

        if (task.done) {
          iconPomodoro.src = './img/iconRedPomodoro.png';
        }
        else {
          iconPomodoro.src = './img/iconGreenPomodoro.png';
        }

        this.verifyExistentTasks();

        iconPomodoro.addEventListener('click', () => {
          calendario.pomodoroModal.style.display = 'block';
          calendario.isPomodoro = true;
          calendario.configs = localStorage.getItem('configs') ? JSON.parse(localStorage.getItem('configs')) : { tempoPomodoro: 25, tempoIntervalo: 5 };
          document.getElementById('pomodoroTaskTitle').innerHTML = task.title;
          if (calendario.pomodoro == null) {
            calendario.pomodoro = new Pomodoro(task, calendario.daySelectedTasks.date, calendario.tasks, calendario.dateIndex, i, calendario);

          }
          else {
            if (calendario.pomodoro.title != task.title || calendario.pomodoro.date != calendario.daySelectedTasks.date) {
              calendario.pomodoro.resetPomodoro(task, calendario.daySelectedTasks.date, calendario.tasks, calendario.dateIndex, i, calendario.pomodoro);
              
            }
          }

        })

        taskDiv.appendChild(iconPomodoro);

        calendario.tasklist.appendChild(taskDiv);
      }

    } catch (error) {
      calendario.tasklist.replaceChildren();
    }

  }

  load() {
    const dt = new Date();

    if (calendario.nav !== 0) {
      dt.setMonth(new Date().getMonth() + calendario.nav);
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
    const paddingDays = calendario.weekdays.indexOf(dateString.split(', ')[0]);

    console.log(firstDayOfMonth)
    console.log(paddingDays);

    document.getElementById('monthDisplay').innerText =
      `${dt.toLocaleDateString(calendario.configs.lang, { month: 'long' })}`;

    calendario.calendar.innerHTML = '';

    // Criando o calendário
    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
      const daySquare = document.createElement('div');
      daySquare.classList.add('day');

      const dayString = `${month + 1}/${i - paddingDays}/${year}`;

      if (i > paddingDays) {

        daySquare.innerText = i - paddingDays;
        const tasksForDay = calendario.tasks.find(e => e.date === dayString);

        // Data atual
        if (i - paddingDays === day && calendario.nav === 0) {
          // daySquare.id = 'currentDay';

          // Para a aplicação sempre iniciar com a data atual selecionada
          if (calendario.justStarted) {
            calendario.daySelected = daySquare;
            // calendario.daySelected.style.backgroundColor = "red";
            calendario.selectedDayString = dayString;
            calendario.daySelectedTasks = tasksForDay;
            calendario.refreshTasks();
            calendario.verifyExistentTasks();
          }
        }

        // Indicação visual de data selecionada
        if (dayString == calendario.selectedDayString) {
          calendario.refreshSelectedDay(daySquare);
        }

        // Indicação visual de datas com tarefas anexadas
        if (tasksForDay) {
          /* const taskDiv = document.createElement('div');
          taskDiv.classList.add('taskIndication');
          daySquare.appendChild(taskDiv); */

          daySquare.classList.add('taskIndication');
        }

        daySquare.addEventListener('click', () => {
          calendario.justStarted = false;
          calendario.selectedDayString = dayString;
          calendario.refreshSelectedDay(daySquare);
          calendario.daySelectedTasks = tasksForDay;
          calendario.refreshTasks();
        })

      } else {
        daySquare.classList.add('padding');
      }

      calendario.calendar.appendChild(daySquare);
    }
    calendario.refreshTasks();
  }


  closeModal() {
    calendario.taskTitleInput.classList.remove('error');
    calendario.newTaskModal.style.display = 'none';
    calendario.deleteTaskModal.style.display = 'none';
    calendario.backDrop.style.display = 'none';
    calendario.taskTitleInput.value = '';
    calendario.clicked = null;
    calendario.load();
  }



  createTask() {
    if (calendario.taskTitleInput.value) {
      calendario.taskTitleInput.classList.remove('error');

      // Verifica se há alguma task cadastrada na data selecionada
      if (calendario.verifyExistentTasks()) {
        calendario.tasks[calendario.dateIndex].tasksNodes.push(
          {
            title: calendario.taskTitleInput.value,
            done: false
          }
        );
      }
      else {
        calendario.tasks.push({
          date: calendario.selectedDayString,
          tasksNodes: [
            {
              title: calendario.taskTitleInput.value,
              done: false
            }
          ]
        }
        );
      }

      localStorage.setItem('tasks', JSON.stringify(calendario.tasks));

      calendario.daySelectedTasks = calendario.tasks.find(e => e.date === calendario.selectedDayString);
      calendario.refreshTasks();
      calendario.closeModal();
    } else {
      calendario.taskTitleInput.classList.add('error');
    }
  }

  saveTask() {
    if (calendario.taskEditTitleInput.value) {
      calendario.taskEditTitleInput.classList.remove('error');

      calendario.daySelectedTasks.tasksNodes[calendario.selectedTaskIndex].title = calendario.taskEditTitleInput.value;

      localStorage.setItem('tasks', JSON.stringify(calendario.tasks));

      calendario.refreshTasks();
      calendario.closeModal();

    } else {
      calendario.taskTitleInput.classList.add('error');
    }
  }

  // TODO
  deleteTask() {
    calendario.daySelectedTasks = calendario.tasks.find(e => e.date === calendario.selectedDayString);



    calendario.daySelectedTasks.tasksNodes = calendario.daySelectedTasks.tasksNodes.filter(e => e.title != calendario.selectedTask.title);

  

    if (calendario.daySelectedTasks.tasksNodes.length == 0) {
      calendario.tasks = calendario.tasks.filter(e => e.date !== calendario.selectedDayString);
    }

    localStorage.setItem('tasks', JSON.stringify(calendario.tasks));

    calendario.refreshTasks();
    calendario.closeModal();
  }

  addTask() {
    calendario.newTaskModal.style.display = 'block';

    // calendario.backDrop.style.display = 'block';
  }

  initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
      calendario.nav++;
      calendario.load();
    });

    document.getElementById('backButton').addEventListener('click', () => {
      calendario.nav--;
      calendario.load();
    });

    document.getElementById('addButton').addEventListener('click', calendario.createTask);
    document.getElementById('cancelButton').addEventListener('click', calendario.closeModal);
    document.getElementById('saveButton').addEventListener('click', calendario.saveTask);
    document.getElementById('deleteButton').addEventListener('click', calendario.deleteTask);
    document.getElementById('closeButton').addEventListener('click', calendario.closeModal);
    document.getElementById('btnAddTask').addEventListener('click', calendario.addTask);

  }


} // class Calendario


calendario = new Calendario();

calendario.initButtons();
calendario.load();
calendario.config.setLang(calendario);