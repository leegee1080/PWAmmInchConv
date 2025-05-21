document.addEventListener('DOMContentLoaded', () => {
    const mmInput = document.getElementById('mmInput');
    const inchInput = document.getElementById('inchInput');
    const mmResult = document.getElementById('mmResult');
    const inchResult = document.getElementById('inchResult');

    // Load saved values from localStorage
    mmInput.value = localStorage.getItem('mmValue') || '';
    inchInput.value = localStorage.getItem('inchValue') || '';
    updateResults();

    // Conversion functions
    function mmToInch(mm) {
        return (mm / 25.4).toFixed(4);
    }

    function inchToMm(inch) {
        return (inch * 25.4).toFixed(4);
    }

    function updateResults() {
        const mmValue = parseFloat(mmInput.value);
        const inchValue = parseFloat(inchInput.value);

        if (!isNaN(mmValue)) {
            inchResult.textContent = `Inches: ${mmToInch(mmValue)}`;
        } else {
            inchResult.textContent = 'Inches: 0';
        }

        if (!isNaN(inchValue)) {
            mmResult.textContent = `mm: ${inchToMm(inchValue)}`;
        } else {
            mmResult.textContent = 'mm: 0';
        }
    }

    // Event listeners for real-time updates
    mmInput.addEventListener('input', () => {
        localStorage.setItem('mmValue', mmInput.value);
        inchInput.value = ''; // Clear other input
        localStorage.setItem('inchValue', '');
        updateResults();
    });

    inchInput.addEventListener('input', () => {
        localStorage.setItem('inchValue', inchInput.value);
        mmInput.value = ''; // Clear other input
        localStorage.setItem('mmValue', '');
        updateResults();
    });
});