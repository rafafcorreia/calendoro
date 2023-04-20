// Função que atualiza o calendário com as tarefas
function updateCalendar(tasks) {
   
// Adicionar as tarefas aos dias correspondentes
    tasks.forEach(function(task) {
        var date = new Date(task.date);
        if (date.getFullYear() == calendar.year && date.getMonth() == calendar.month) {
            var day = date.getDate();
            calendar.daysOfMonth[day - 1].tasks.push(task.description); 
        }
    });
    
// Atualizar a visualização do calendário
    var table = document.getElementById('calendar');
    table.innerHTML = '';

    var headerRow = table.insertRow();

    calendar.daysOfWeek.forEach(function(dayOfWeek) {
        var cell = headerRow.insertCell();
        cell.textContent = dayOfWeek; 
    });

    calendar.daysOfMonth.forEach(function(day) {
        var row = table.insertRow();
        calendar.daysOfWeek.forEach(function(dayOfWeek, index) {
            var cell = row.insertCell();
            if (index == new Date(calendar.year, calendar.month, day.day).getDay()) {
            cell.textContent = day.day;
            day.tasks.forEach(function(task) {
                var taskElement = document.createElement('div');
                taskElement.textContent = task;
                cell.appendChild(taskElement);
                });
            }
        });
    });
}
    
// Exemplo de uso
var tasks = [
{ date: '2021-04-05', description: 'Tarefa 1' },
{ date: '2021-04-10', description: 'Tarefa 2' },
{ date: '2021-04-15', description: 'Tarefa 3' }
];
updateCalendar(tasks);