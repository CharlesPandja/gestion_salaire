const form = document.getElementById('salaryForm');
const resultContainer = document.getElementById('result');
const ctx = document.getElementById('expensesChart').getContext('2d');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const monthlySalary = parseFloat(document.getElementById('monthlySalary').value);
    const housingExpenses = parseFloat(document.getElementById('housingExpenses').value);
    const foodExpenses = parseFloat(document.getElementById('foodExpenses').value);
    const transportExpenses = parseFloat(document.getElementById('transportExpenses').value);
    const entertainmentExpenses = parseFloat(document.getElementById('entertainmentExpenses').value);

    if (isNaN(monthlySalary) || isNaN(housingExpenses) || isNaN(foodExpenses) || isNaN(transportExpenses) || isNaN(entertainmentExpenses)) {
        showAlert('Veuillez entrer des valeurs numériques valides.', 'error');
        return;
    }

    const totalExpenses = housingExpenses + foodExpenses + transportExpenses + entertainmentExpenses;
    const remainingBalance = monthlySalary - totalExpenses;

    const housingPercentage = (housingExpenses / totalExpenses) * 100;
    const foodPercentage = (foodExpenses / totalExpenses) * 100;
    const transportPercentage = (transportExpenses / totalExpenses) * 100;
    const entertainmentPercentage = (entertainmentExpenses / totalExpenses) * 100;

    displayResult(totalExpenses, remainingBalance);
    displayChart(housingPercentage, foodPercentage, transportPercentage, entertainmentPercentage);
});

function displayResult(totalExpenses, remainingBalance) {
    resultContainer.innerHTML = `
        <h2>Récapitulatif des Finances Mensuelles</h2>
        <div class="result">
            <p><strong>Dépenses Totales :</strong> ${totalExpenses.toFixed(2)} €</p>
            <p><strong>Solde Disponible :</strong> ${remainingBalance.toFixed(2)} €</p>
        </div>
    `;
}

function displayChart(housingPercentage, foodPercentage, transportPercentage, entertainmentPercentage) {
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Logement', 'Alimentation', 'Transport', 'Divertissement'],
            datasets: [{
                data: [housingPercentage, foodPercentage, transportPercentage, entertainmentPercentage],
                backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4caf50'],
                hoverBackgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4caf50']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + '%';
                        }
                    }
                }
            }
        }
    });
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${type}`;
    alertDiv.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');
    const formContainer = document.querySelector('.form-container');
    container.insertBefore(alertDiv, formContainer);

    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}