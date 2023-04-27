/* let now = new Date().getTime();
let isPlayed;
let timer;
let distance;
let minutes;
let seconds;
let countDownDate = now + 0.2 * 60 * 1000; */

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
        this.btnStartTimer = document.getElementById('btnStartTimer');
        this.btnPauseTimer = document.getElementById('btnPauseTimer');
        this.btnPauseTimer.style.display = 'none';
        this.dateIndex = dateIndex;
        this.selectedTaskIndex = selectedTaskIndex;
        this.calendario = calendario;
        this.task = task;

        // Set the date we're counting down to
        this.countDownDate = this.now + 0.2 * 60 * 1000;

        document.getElementById('returnButton').addEventListener('click', () => {
            pomodoroModal.style.display = 'none';
            this.isPlayed = false;
            // refreshTasks();
        });

        this.btnStartTimer.addEventListener('click', () => {
            this.isPlayed = true;
            console.log('Cliquei start')
            console.log(this.isPlayed)
            this.btnStartTimer.style.display = 'none';
            this.btnPauseTimer.style.display = 'block'
            this.startPomodoroTimer(this);

        })

        this.btnPauseTimer.addEventListener('click', () => {
            this.isPlayed = false;
            this.btnPauseTimer.style.display = 'none';
            this.btnStartTimer.style.display = 'block';
        })

        document.getElementById('btnFinishTask').addEventListener('click', () => {
            console.log(this.done)
            console.log(this.tasks[this.dateIndex]);
            console.log(this.dateIndex);
            console.log(this.selectedTaskIndex);
            this.tasks[this.dateIndex].tasksNodes[this.selectedTaskIndex].done = 'true';
            console.log('Finish Task: ' + this.done);
            console.log(this.tasks);
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
            this.calendario.refreshTasks();
            console.log(this.task)
            this.resetPomodoro(this.task, this.date, this.tasks, this.dateIndex, this.selectedTaskIndex, this);
        })

        // Find the distance between now and the count down date
        this.distance = this.countDownDate - this.now;

        // Time calculations for days, hours, minutes and seconds
        this.minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((this.distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        document.getElementById("demo").innerHTML = this.minutes + ":" + this.seconds;
        this.breakLabel = document.getElementById("breakLabel");
        this.breakLabel.innerHTML = '';

    }

    resetPomodoro(task, date, tasks, dateIndex, selectedTaskIndex, pomodoro) {
        console.log('RESET')
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
        document.getElementById("demo").innerHTML = pomodoro.minutes + ":" + pomodoro.seconds;
        pomodoro.breakLabel = document.getElementById("breakLabel");
        pomodoro.breakLabel.innerHTML = '';
        pomodoro.btnPauseTimer.style.display = 'none';
        pomodoro.btnStartTimer.style.display = 'block';
        // document.getElementById('pomodoroTaskTitle').innerText = pomodoro.title;
        pomodoro.isPlayed = false;
        console.log('Reset Pomodoro: ' + pomodoro.dateIndex);
    }

    setTimer(pomodoro) {
        return setInterval(function () {

            if (pomodoro.isPlayed) {
                // If the count down is over, write some text 
                if (pomodoro.distance <= 0) {
                    clearInterval(pomodoro.timer);
                    // pomodoro.isPlayed = false;
                    // document.getElementById("demo").innerHTML = "EXPIRED";
                    if (pomodoro.isBreak) {
                        pomodoro.isBreak = false;
                        pomodoro.countDownDate = pomodoro.now + 0.2 * 60 * 1000;
                        pomodoro.distance += 0.2 * 60 * 1000;
                        pomodoro.breakLabel.innerHTML = '';
                        pomodoro.startPomodoroTimer(pomodoro);
                        return
                    }
                    else {
                        pomodoro.isBreak = true;
                        pomodoro.startBreakTimer(pomodoro);
                        return;
                    }
                }
                // Get today's date and time
                pomodoro.now += 1000;

                console.log('Contando...')


                // Find the distance between now and the count down date
                pomodoro.distance = pomodoro.countDownDate - pomodoro.now;

                // Time calculations for days, hours, minutes and seconds
                pomodoro.minutes = Math.floor((pomodoro.distance % (1000 * 60 * 60)) / (1000 * 60));
                pomodoro.seconds = Math.floor((pomodoro.distance % (1000 * 60)) / 1000);

                // Output the result in an element with id="demo"
                document.getElementById("demo").innerHTML = pomodoro.minutes + ":" + pomodoro.seconds;



            }
            else {
                pomodoro.distance += 1000;
                console.log('Else')
                console.log(pomodoro.isPlayed)
            }
        }, 1000); // setInterval  
    }

    startPomodoroTimer(pomodoro) {
        clearInterval(pomodoro.timer);
        pomodoro.timer = pomodoro.setTimer(pomodoro);

    } // startPomodoroTimer

    startBreakTimer(pomodoro) {
        pomodoro.countDownDate = pomodoro.now + 10 * 1000;
        pomodoro.distance += 10 * 1000;
        // pomodoro.distance += 10000;

        console.log('Start break timer')

        pomodoro.breakLabel.innerHTML = 'Intervalo';

        pomodoro.timer = pomodoro.setTimer(pomodoro);
    }

} // class Pomodoro


/* // Update the count down every 1 second
let now = new Date().getTime();
let isPlayed = false;
let timer;
let distance;
let minutes;
let seconds;

// Set the date we're counting down to
let countDownDate = now + 0.2 * 60 * 1000;

function startTimer() {
    clearInterval(timer);
    timer = setInterval(function () {

        if (isPlayed) {
            // If the count down is over, write some text 
            if (distance <= 0) {
                clearInterval(timer);
                isPlayed = false;
                // document.getElementById("demo").innerHTML = "EXPIRED";
                return;
            }
            // Get today's date and time
            now += 1000;


            // Find the distance between now and the count down date
            distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="demo"
            document.getElementById("demo").innerHTML = minutes + ":" + seconds;


        }
        else {
            distance += 1000;
        }
    }, 1000);

}
 */