const Big = require('big.js');

export function getFormattedAmount(amount, toFixed = 2){
    let result;
    if (amount) {
        // Очищаем от пробелов.
        if (typeof amount === 'string') {
            amount = amount.replace(/\s+/g, '');
        }

        // Приводим сумму к Big.
        result = Big(amount).toFixed(toFixed);

        // Разделяем сумму неразрывными пробелами по разрядам. В качестве разделителя используем точку.
        if (!isNaN(result)) {
            let numArr = result.split('.');
            numArr[0] = numArr[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, String.fromCharCode(160));
            result = numArr.join('.');
        } else {
            result = Big(0).toFixed(toFixed);
        }
    }
    return result || '';
}