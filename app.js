document.addEventListener('DOMContentLoaded', () => {
    const valueInput = document.getElementById('valueInput');
    const unitToggle = document.getElementById('unitToggle');
    const unitIndicator = document.getElementById('unitIndicator');
    const mmResult = document.getElementById('mmResult');
    const inchResult = document.getElementById('inchResult');
    const numberButtons = document.querySelectorAll('.number-pad .number');
    const decimalButton = document.querySelector('.number-pad .decimal');
    const clearButton = document.querySelector('.number-pad .clear');

    // Load saved values
    valueInput.value = localStorage.getItem('value') || '';
    unitToggle.checked = localStorage.getItem('unit') === 'inch';
    updateResults();

    // Conversion functions
    function mmToInch(mm) {
        return (mm / 25.4).toFixed(4);
    }

    function inchToMm(inch) {
        return (inch * 25.4).toFixed(4);
    }

    function updateResults() {
        const value = parseFloat(valueInput.value);
        const isInch = unitToggle.checked;

        unitIndicator.textContent = isInch ? 'inch' : 'mm';

        if (!isNaN(value)) {
            if (isInch) {
                mmResult.textContent = `mm: ${inchToMm(value)}`;
                inchResult.textContent = `in: ${value.toFixed(4)}`;
            } else {
                mmResult.textContent = `mm: ${value.toFixed(4)}`;
                inchResult.textContent = `in: ${mmToInch(value)}`;
            }
        } else {
            mmResult.textContent = 'mm: 0';
            inchResult.textContent = 'in: 0';
        }
        localStorage.setItem('value', valueInput.value);
        localStorage.setItem('unit', isInch ? 'inch' : 'mm');
    }

    // Input event
    valueInput.addEventListener('input', () => {
        console.log('Input event triggered, value:', valueInput.value);
        updateResults();
    });

    // Toggle event
    unitToggle.addEventListener('change', updateResults);

    // Number pad buttons
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log('Number button clicked:', button.textContent);
            valueInput.value += button.textContent;
            valueInput.focus();
            updateResults();
        });
    });

    // Decimal button
    decimalButton.addEventListener('click', () => {
        console.log('Decimal button clicked, before:', valueInput.value);
        if (!valueInput.value.includes('.')) {
            if (valueInput.value === '') {
                valueInput.value = '0.';
            } else {
                valueInput.value += '.';
            }
            setTimeout(() => {
                console.log('Decimal button after:', valueInput.value);
                valueInput.focus();
                updateResults();
            }, 0);
        }
    });

    // Clear button
    clearButton.addEventListener('click', () => {
        console.log('Clear button clicked');
        valueInput.value = '';
        valueInput.focus();
        updateResults();
    });

    // Ensure focus on touch
    valueInput.addEventListener('touchstart', () => {
        console.log('Input touched');
        setTimeout(() => valueInput.focus(), 0);
    });
});
