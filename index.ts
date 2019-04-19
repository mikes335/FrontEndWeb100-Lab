
import './styles.css';

var currentTip = 10;
var ctrlAmount = <HTMLInputElement>document.getElementById('txtAmount');
const ctrlTipBy10 = document.getElementById('btnTipBy10');
const ctrlTipBy15 = document.getElementById('btnTipBy15');
const ctrlTipBy20 = document.getElementById('btnTipBy20');
const ctrlAmountConfirmation = document.getElementById('txtAmountConfirmation');

var ctrlBillAmount = document.getElementById('lblBillAmount');
var ctrlTipPercentage = document.getElementById('lblTipPercentage');
var ctrlTipAmount = document.getElementById('lblTipAmount');
var ctrlTotal = document.getElementById('lblTotal');

InitializeTip();

function InitializeTip() {
    ctrlAmount.addEventListener('keyup', UpdateCalculatorValues);

    ctrlTipBy10.addEventListener('click', function () {HandleTipByAmount(.10);});
    ctrlTipBy15.addEventListener('click', function () {HandleTipByAmount(.15);});
    ctrlTipBy20.addEventListener('click', function () {HandleTipByAmount(.20);});

    HandleTipByAmount(0.10);
}

function HandleTipByAmount(tip: number) {
    
    currentTip =  tip;
    const displayTip = tip * 100 + "%";
    ctrlAmountConfirmation.innerText = "You are tipping " + displayTip;

    UpdateTipButtons(tip) ;
    UpdateCalculatorValues();
}

function UpdateTipButtons(tip: number) {
    if (tip === 0.10){
        ctrlTipBy10.classList.add('active', 'disabled');
        ctrlTipBy15.classList.remove('active', 'disabled');
        ctrlTipBy20.classList.remove('active', 'disabled');
    }
    else if (tip === 0.15){
        ctrlTipBy10.classList.remove('active', 'disabled');
        ctrlTipBy15.classList.add('active', 'disabled');
        ctrlTipBy20.classList.remove('active', 'disabled');
    }
    else if (tip === 0.20) {
        ctrlTipBy10.classList.remove('active', 'disabled');
        ctrlTipBy15.classList.remove('active', 'disabled');
        ctrlTipBy20.classList.add('active', 'disabled');
    }
}

function UpdateCalculatorValues() {
    HandleInput();

    var numberAmountValue =  parseFloat(ctrlAmount.value);

    var amountOfBill =  '$' + numberAmountValue.toFixed(2);
    var amountOfTip =  '$' + (currentTip* numberAmountValue).toFixed(2);
    var  totalToBePaid = '$' +  ((1.0 + currentTip) * numberAmountValue).toFixed(2);

    if (numberAmountValue < 0 || numberAmountValue.toString() == 'NaN') {
        amountOfBill = '';
        amountOfTip = '';
        totalToBePaid = '';
    }

    ctrlTipAmount.innerText = "Amount of Tip: " + amountOfTip;
    ctrlBillAmount.innerText = "Bill Amount: " + amountOfBill;
    ctrlTipPercentage.innerText = "Tip Percentage: " + currentTip * 100 + "%";
    ctrlTotal.innerText =  "Total to be Paid: " + totalToBePaid;
}

function HandleInput() {
    const amount = parseFloat(ctrlAmount.value);

    if (amount >= 0) {
        ctrlAmount.classList.remove('border', 'border-danger', 'border-3');
    }
    else if (amount.toString() === 'NaN' || amount < 0.0) {
        ctrlAmount.classList.add('border', 'border-danger', 'border-3');
    }
}

function handleClick() {
    UpdateCalculatorValues();
}
