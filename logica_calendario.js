// Objeto que representa o calendário
var calendar = {
    year: 2021,
    month: 3, // abril (0 = janeiro, 11 = dezembro)
    daysOfWeek: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    daysOfMonth: []
    };

// Gerar os dias do mês
var daysInMonth = new Date(calendar.year, calendar.month + 1, 0).getDate();
calendar.daysOfMonth = [];
for (var i = 1; i <= daysInMonth; i++) {
calendar.daysOfMonth.push({
day: i,
tasks: []
});
}

