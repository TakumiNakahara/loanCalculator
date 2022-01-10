// 検索ボタン
var submit = document.querySelector('#loan-form');

submit.addEventListener('submit', function(e){
    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    calculate();
    e.preventDefault(); 
});



function calculate(e) {

    const amount = parseFloat(document.getElementById('amount').value);
    const interest = parseFloat(document.getElementById('interest').value);                     
    const years = parseFloat(document.getElementById('years').value);

    const monthlyPayment = document.getElementById('monthly-payment');
    const totalInterest = document.getElementById('total-interest');
    const totalPayment = document.getElementById('total-payment');
    const eachInterest = document.getElementById('each-interest');
    var monthlyInterest = parseFloat(((interest / 100) / 12).toFixed(6));
    var payNum = years * 12;
    var  x = Math.pow(1 + monthlyInterest, payNum);
    // 月の支払い
    var sumMonthlyPayment =  parseFloat(Math.round((amount * monthlyInterest * x) / (x - 1)));
    // 総額
    var sumTotal = sumMonthlyPayment * payNum;
    // 利子の総額
    var sumTotalInterest = sumTotal - amount;
    // 毎月の利子
    var eachMonthInterest = Math.round(sumTotalInterest / payNum);
    if(isFinite(sumMonthlyPayment)){
        monthlyPayment.textContent = sumMonthlyPayment.toLocaleString() + "円";
        totalInterest.textContent = sumTotalInterest.toLocaleString() + "円" ;
        totalPayment.textContent = sumTotal.toLocaleString() + "円";
        eachInterest.textContent = eachMonthInterest.toLocaleString() + "円"; 
        setTimeout(function(){
            document.getElementById('results').style.display = 'block';
            document.getElementById('loading').style.display = 'none';
        },1000)
    } else {
        showError('入力されていない項目があります');
    }
}

// Show Error
function showError(error){
    // Hide results
    document.getElementById('results').style.display = 'none';
    
    // Hide loader
    document.getElementById('loading').style.display = 'none';
    // Create a div
    const errorDiv = document.createElement('div');
    // Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    // Add class
    errorDiv.className = 'alert';
    // Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));
    // Insert error above heading
    card.insertBefore(errorDiv, heading);
    // Clear error after 3 seconds
    setTimeout(function(){
        document.getElementById('loading').style.display = 'none';
        clearError();
    },3000)
}
function clearError(){
    document.querySelector('.alert').remove();
}