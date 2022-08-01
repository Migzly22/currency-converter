const select = document.querySelectorAll('select');
const input = document.querySelectorAll('input');
const change = document.getElementById('change');
var requestURL = 'https://api.exchangerate.host/latest';
let optionslist ='';



async function currencyexchange() {
    const APILINK = await fetch(requestURL);
    const CurrencyList = await APILINK.json();
    const currenciesname = Object.keys(CurrencyList.rates);
    const rates = CurrencyList.rates;

    currenciesname.map(item => {
        optionslist += '<option value="'+item+'">'+item+'</option>';
    })
    console.log(optionslist)

    for (let i = 0; i < select.length; i++) {
        select[i].innerHTML = optionslist;
    }

    function valchange(i,j){
        input[i].value = input[j].value * rates[select[i].value] / rates[select[j].value];
    }

    change.addEventListener('click',()=>{
        let selectval = [select[0].value,select[1].value]
        select[0].value = selectval[1];
        select[1].value = selectval[0];
        valchange(1,0)
    })

    input[0].addEventListener('keyup',()=>{
        valchange(1,0)
    })
    input[1].addEventListener('keyup',()=>{
        valchange(0,1)
    })
    select[0].addEventListener('change',()=>{
        valchange(1,0)
    })
    select[1].addEventListener('change',()=>{
        valchange(0,1)
    })


}
currencyexchange();