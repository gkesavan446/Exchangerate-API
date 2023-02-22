// Exchangerate-api details
let APIKey = "317350d60acd9bbae0fd0229";
let APIUrl = "https://v6.exchangerate-api.com/v6/";

/**
 * Function to get the list of supported currencies from API and to update the dropdown lists
 */
async function getSupportedCurrencies(){
    let response = await fetch(APIUrl + APIKey + "/codes");
    let data = await response.json();
    data.supported_codes.forEach(element => {
        document.getElementById("fromCurrency").innerHTML += `
            <option value = "${element[0]}">${element[0]}</option>
        `;
        document.getElementById("toCurrency").innerHTML += `
            <option value = "${element[0]}">${element[0]}</option>
        `;
    });
}

/**
 * Function to use to fromCurrency, fromCurrency and fromCurrencyAmount 
 * and to get the converted amount from API
 */
async function getConvertedValue(){
    let fromCurrency = document.getElementById("fromCurrency").value;
    let toCurrency = document.getElementById("toCurrency").value;
    let fromCurrencyAmount = document.getElementById("fromCurrencyAmount").value;

    let response = await fetch(APIUrl + APIKey + "/pair/" + fromCurrency + "/" + toCurrency + "/" + fromCurrencyAmount);
    let data = await response.json();

    document.getElementById("toCurrencyAmount").value = data.conversion_result;
    document.getElementById("info").innerHTML = `1 ${data.base_code} equals ${data.conversion_rate} ${data.target_code}`;

}

// To check whether same value is selected in both dropdowns and update the fromCurrency dropdown to default value
document.getElementById("toCurrency").addEventListener("change",function(){
    let fromCurrency = document.getElementById("fromCurrency");
    if(fromCurrency.value === this.value){
        let alterValue = fromCurrency.value === 'INR' ? 'USD': 'INR';
        fromCurrency.value = alterValue;
    }
});

// To check whether same value is selected in both dropdowns and update the toCurrency dropdown to default value
document.getElementById("fromCurrency").addEventListener("change",function(){
    let toCurrency = document.getElementById("toCurrency");
    if(toCurrency.value === this.value){
        let alterValue = toCurrency.value === 'INR' ? 'USD': 'INR';
        toCurrency.value = alterValue;
    }
});

getSupportedCurrencies();