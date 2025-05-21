document.addEventListener('DOMContentLoaded', () => {
    const valueInput = document.getElementById('valueInput');
    const unitToggle = document.getElementById('unitToggle');
    const unitIndicator = document.getElementById('unitIndicator');
    const mmResult = document.getElementById('mmResult');
    const inchResult = document.getElementById('inchResult');
    const numberButtons = document.querySelectorAll('.number-pad .number');
    const decimalButton = document.querySelector('.number-pad .decimal');
    const clearButton = document.querySelector('.number-pad .clear');

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

    valueInput.addEventListener('input', () => {
        updateResults();
    });

    unitToggle.addEventListener('change', updateResults);

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            valueInput.value += button.textContent;
            valueInput.focus();
            updateResults();
        });
    });

    decimalButton.addEventListener('click', () => {
        if (!valueInput.value.includes('.')) {
            if (valueInput.value === '') {
                valueInput.value = '0.';
            } else {
                valueInput.value += '.';
            }
            setTimeout(() => {
                valueInput.focus();
                updateResults();
            }, 0);
        }
    });

    clearButton.addEventListener('click', () => {
        valueInput.value = '';
        valueInput.focus();
        updateResults();
    });

    // Prevent keyboard from closing on touch devices
    // This is a workaround for some mobile browsers that close the keyboard
    valueInput.addEventListener('touchstart', () => {
        setTimeout(() => valueInput.focus(), 0);
    });
});
