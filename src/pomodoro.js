class Pomodoro {
    constructor(task, date, tasks, dateIndex, selectedTaskIndex, calendario) {
        this.now = new Date().getTime();
        this.isPlayed = false;
        this.timer;
        this.distance;
        this.minutes;
        this.seconds;
        this.title = task.title;
        this.date = date;
        this.done = task.done;
        this.tasks = tasks;
        this.isBreak = false;
        this.dateIndex = dateIndex;
        this.selectedTaskIndex = selectedTaskIndex;
        this.calendario = calendario;
        this.task = task;

        this.countDownDate = this.now + 0.2 * 60 * 1000;

        this.botao = document.querySelector('#botao');
        this.cronometro = document.querySelector('#cronometro');
        this.botaoConcluir = document.querySelector('#botao-concluir');
        this.breakLabel = document.querySelector('#breakLabel');
        this.btnReturn = document.querySelector('#btnReturn');
        breakLabel.style.display = 'none';
        this.tempoPomodoro = calendario.configs.tempoPomodoro * 60;
        this.tempoIntervalo = calendario.configs.tempoIntervalo * 60;
        this.tempoAtual = this.tempoPomodoro;
        this.timer;


        this.btnReturn.addEventListener('click', () => {
            pomodoroModal.style.display = 'none';
            this.isPlayed = false;
        });

        botao.addEventListener('click', () => {
            if (this.botao.innerHTML == '►') {
                this.iniciarCronometro(this);
            } else {
                this.pausarCronometro(this);
            }
        })

        

        this.botaoConcluir.addEventListener('click', () => {
           
            this.tasks[this.dateIndex].tasksNodes[this.selectedTaskIndex].done = 'true';
            
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
            this.calendario.refreshTasks();
            
            this.resetPomodoro(this.task, this.date, this.tasks, this.dateIndex, this.selectedTaskIndex, this);
            pomodoroModal.style.display = 'none';
        })
        this.breakLabel = document.getElementById("breakLabel");
        this.breakLabel.innerHTML = '';

        this.atualizarCronometro(this);

    }

    iniciarCronometro(pomodoro) {
        pomodoro.botao.innerHTML = 'II';
        pomodoro.timer = setInterval(function () {
            if (pomodoro.tempoAtual == 0) {
                clearInterval(pomodoro.timer);
                pomodoro.botao.innerHTML = '►';
                pomodoro.botaoConcluir.style.display = 'block';
                pomodoro.tempoAtual = pomodoro.tempoIntervalo;
                pomodoro.botao.style.display = 'none';
                pomodoro.breakLabel.style.display = 'block';
                pomodoro.iniciarBreakTimer(pomodoro);
            } else {
                pomodoro.tempoAtual--;
                pomodoro.atualizarCronometro(pomodoro);
            }
        }, 1000);
    }

    // Função para pausar o cronômetro
    pausarCronometro(pomodoro) {
        pomodoro.botao.innerHTML = '►';
        clearInterval(pomodoro.timer);
    }

    // Função para atualizar o cronômetro
    atualizarCronometro(pomodoro) {
        const minutos = Math.floor(pomodoro.tempoAtual / 60);
        const segundos = pomodoro.tempoAtual % 60;
        pomodoro.cronometro.innerHTML = `${minutos}:${segundos < 10 ? '0' + segundos : segundos}`;
    }

    iniciarBreakTimer(pomodoro) {
        pomodoro.atualizarCronometro(pomodoro);
        pomodoro.breakLabel.innerHTML = 'Intervalo';
        pomodoro.timer = setInterval(function () {
            if (pomodoro.tempoAtual == 0) {
                clearInterval(pomodoro.timer);
                pomodoro.botao.innerHTML = '►';
                pomodoro.botaoConcluir.style.display = 'block';
                pomodoro.tempoAtual = pomodoro.tempoPomodoro;
                pomodoro.botao.style.display = 'block';
                pomodoro.breakLabel.style.display = 'none';
                pomodoro.atualizarCronometro(pomodoro);
            } else {
                pomodoro.tempoAtual--;
                pomodoro.atualizarCronometro(pomodoro);
            }
        }, 1000);

    }

    resetPomodoro(task, date, tasks, dateIndex, selectedTaskIndex, pomodoro) {
        pomodoro.title = task.title;
        pomodoro.date = date;
        pomodoro.done = task.done;
        pomodoro.tasks = tasks;
        pomodoro.countDownDate = pomodoro.now + 0.2 * 60 * 1000;
        pomodoro.distance = 0.2 * 60 * 1000;
        pomodoro.dateIndex = dateIndex;
        pomodoro.selectedTaskIndex = selectedTaskIndex;
        this.minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((this.distance % (1000 * 60)) / 1000);
        pomodoro.breakLabel = document.getElementById("breakLabel");
        pomodoro.breakLabel.innerHTML = '';
        pomodoro.isPlayed = false;
        clearInterval(pomodoro.timer);
        pomodoro.tempoPomodoro = pomodoro.calendario.configs.tempoPomodoro * 60;
        pomodoro.tempoIntervalo = pomodoro.calendario.configs.tempoIntervalo * 60;
        pomodoro.botao.innerHTML = '►';
        pomodoro.botaoConcluir.style.display = 'block';
        pomodoro.tempoAtual = pomodoro.tempoPomodoro;
        pomodoro.botao.style.display = 'block';
        pomodoro.breakLabel.style.display = 'none';
        pomodoro.atualizarCronometro(pomodoro);
    }

} 
