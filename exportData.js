document.addEventListener('DOMContentLoaded', function() {
    const age = localStorage.getItem('age');
    const income = localStorage.getItem('income');
    const moneyLeft = localStorage.getItem('moneyLeft');

    const currentData = {
        age: age,
        income: income,
        moneyLeft: moneyLeft
    }
    if (income === -1) {
        currentData.income = "Less than $30,000"
    } else if (income === 0) {
        currentData.income = "$30,000 - $59,999"
    } else {
        currentData.income = "$60,000+"
    }
    if (moneyLeft === -1) {
        currentData.moneyLeft = "Less than $500"
    } else if (moneyLeft === 0) {
        currentData.moneyLeft = "$500 - $1000"
    } else {
        currentData.moneyLeft = "$1000+"
    }

    function exportData() {
        const jsonData = JSON.stringify(currentData);
        const blob = new Blob([jsonData], { type: 'text/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'financial_data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    const exportButton = document.getElementById('exportData');
    if (exportButton) {
        exportButton.addEventListener('click', exportData);
    }
});