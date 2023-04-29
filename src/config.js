class Config {
    constructor(calendario) {
        this.calendario = calendario;
        this.iconConfig = document.getElementById('iconConfig');
        this.configModal = document.getElementById('configModal');
        this.btnSubmitConfig = document.getElementById('btnSubmitConfig');
        this.pomodoroTimerInput = document.getElementById('pomodoroTimerInput');
        this.esFlag = document.getElementById('es');
        this.enFlag = document.getElementById('en');
        this.ptFlag = document.getElementById('pt');
        this.pomodoroTimerInput.value = this.calendario.configs.tempoPomodoro;
        this.intervaloTimerInput = document.getElementById('intervaloTimerInput');
        this.intervaloTimerInput.value = this.calendario.configs.tempoIntervalo;
        this.formConfig = document.getElementById('formConfig');
        this.open = false;

        this.iconConfig.addEventListener('click', () => {
            if (!this.open) {
                this.open = true;
                this.configModal.style.display = 'block';
            }
            else {
                this.open = false;
                this.configModal.style.display = 'none';
            }
        })

        this.formConfig.addEventListener('submit', () => {
            this.calendario.configs.tempoPomodoro = pomodoroTimerInput.value;
            this.calendario.configs.tempoIntervalo = intervaloTimerInput.value;
            localStorage.setItem('configs', JSON.stringify(this.calendario.configs));

        })

        this.esFlag.addEventListener('click', () => {
            this.enFlag.removeAttribute('id');
            this.ptFlag.removeAttribute('id');
            this.esFlag.id = 'selectedFlag';
            this.calendario.configs.lang = 'es';
            localStorage.setItem('configs', JSON.stringify(this.calendario.configs));
        })

        this.enFlag.addEventListener('click', () => {
            this.esFlag.removeAttribute('id');
            this.ptFlag.removeAttribute('id');
            this.enFlag.id = 'selectedFlag';
            this.calendario.configs.lang = 'en';
            localStorage.setItem('configs', JSON.stringify(this.calendario.configs));
        })

        this.ptFlag.addEventListener('click', () => {
            this.esFlag.removeAttribute('id');
            this.enFlag.removeAttribute('id');
            this.ptFlag.id = 'selectedFlag';
            this.calendario.configs.lang = 'pt';
            localStorage.setItem('configs', JSON.stringify(this.calendario.configs));
        })


    }

    setLang(calendario) {
        switch (calendario.configs.lang) {
            case 'es':
                document.getElementById('es').id = 'selectedFlag';
                $("#languageHeader").text("Idioma");
                $("#timerHeader").text("Temporizador");
                $('#intervaloTimerConfigLabel').text('Intervalo');
                document.getElementById('btnResetConfig').value = 'Reiniciar';
                document.getElementById('btnSubmitConfig').value = 'Entregar';
                document.getElementById('taskTitleInput').placeholder = 'Título de la tarea';
                $('#weekdays').children().eq(0).text('D');
                $('#weekdays').children().eq(1).text('L');
                $('#weekdays').children().eq(2).text('M');
                $('#weekdays').children().eq(3).text('M');
                $('#weekdays').children().eq(4).text('J');
                $('#weekdays').children().eq(5).text('V');
                $('#weekdays').children().eq(6).text('S');
                $('#btnAddTask').text('Agregar tarea');
                $('#newTaskModal h2').text('Nueva tarea');
                $('#addButton').text('Agregar');
                $('#deleteTaskModal h2').text('Editar tarea');
                $('#saveButton').text('Guardar');
                $('#cancelButton').text('Cancelar');
                $('#deleteButton').text('Eliminar');
                $('#closeButton').text('Cerca');
                $('#botao-concluir').text('Terminar tarea');
                $('#breakLabel').text('Descanso');
                break;

            case 'en':
                document.getElementById('en').id = 'selectedFlag';
                $("#languageHeader").text("Language");
                $("#timerHeader").text("Timer");
                $('#intervaloTimerConfigLabel').text('Break timer');
                document.getElementById('btnResetConfig').value = 'Reset';
                document.getElementById('btnSubmitConfig').value = 'Submit';
                document.getElementById('taskTitleInput').placeholder = 'Task title';
                $('#weekdays').children().eq(0).text('S');
                $('#weekdays').children().eq(1).text('M');
                $('#weekdays').children().eq(2).text('T');
                $('#weekdays').children().eq(3).text('W');
                $('#weekdays').children().eq(4).text('T');
                $('#weekdays').children().eq(5).text('F');
                $('#weekdays').children().eq(6).text('S');
                $('#btnAddTask').text('Add task');
                $('#newTaskModal h2').text('New task');
                $('#addButton').text('Add');
                $('#deleteTaskModal h2').text('Edit Task');
                $('#saveButton').text('Save');
                $('#cancelButton').text('Cancel');
                $('#deleteButton').text('Delete');
                $('#closeButton').text('Close');
                $('#botao-concluir').text('Finish task');
                $('#breakLabel').text('Break time');
                break;
            case 'pt':
                document.getElementById('pt').id = 'selectedFlag';
                $("#languageHeader").text("Idioma");
                $("#timerHeader").text("Cronômetro");
                $('#intervaloTimerConfigLabel').text('Intervalo');
                document.getElementById('btnResetConfig').value = 'Reiniciar';
                document.getElementById('btnSubmitConfig').value = 'Enviar';
                document.getElementById('taskTitleInput').placeholder = 'Título da tarefa';
                $('#weekdays').children().eq(0).text('D');
                $('#weekdays').children().eq(1).text('S');
                $('#weekdays').children().eq(2).text('T');
                $('#weekdays').children().eq(3).text('Q');
                $('#weekdays').children().eq(4).text('Q');
                $('#weekdays').children().eq(5).text('S');
                $('#weekdays').children().eq(6).text('S');
                $('#btnAddTask').text('Adicionar Tarefa');
                $('#newTaskModal h2').text('Nova tarefa');
                $('#addButton').text('Adicionar');
                $('#deleteTaskModal h2').text('Editar tarefa');
                $('#saveButton').text('Salvar');
                $('#cancelButton').text('Cancelar');
                $('#deleteButton').text('Excluir');
                $('#closeButton').text('Fechar');
                $('#botao-concluir').text('Finalizar tarefa');
                $('#breakLabel').text('Intervalo');
                break;
            default:
                break;
        }
    }
}
