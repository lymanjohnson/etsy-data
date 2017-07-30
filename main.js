// Since the `data.js` file is loaded in your `index.html` before this one,
// you have access to the `data` variable that contains the Etsy Store data.
// Open your `index.html` page in your browser and you can verify that the following
// is properly working. The `data` variable is an array with 25 items in it


function loadXMLDoc(theURL)
{
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari, SeaMonkey
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("GET", theURL, false);
    xmlhttp.send();
    return xmlhttp.responseText;
}

const exchangeTable = JSON.parse(loadXMLDoc("http://www.apilayer.net/api/live?access_key=1a655555c96d04e68558fe1ad928cf10&format=1"));

// console.log(exchangeTable.quotes.USDGBP);

// 1: Show me how to calculate the average price of all items.

function question1 () {
  let sum = 0;
  let trueSum = 0;
  let foreignCurrenciesUsed = {}; //this will be an object with a unique property for each currency used, whose value is the number of times that currency appeared.
  let transitiveVerb = "is";
  let foreignItemsCount = 0;

  for (i=0;i<data.length;i++){  // If the item is in USD, it simply adds the price to the total
    if (data[i].currency_code=="USD"){
      sum += data[i].price;
      trueSum += data[i].price;
    }
    else { //if not USD, it converts and tracks the true price, as well as how many unique currencies have appeared and how many times
      foreignItemsCount += 1;
      let conversionCode = "USD"+data[i].currency_code; //generates a string containing the key to correct exchange rate
      let exchangeRate = eval("exchangeTable.quotes."+conversionCode); //fetches exchange rate
      foreignCurrenciesUsed[data[i].currency_code] = (foreignCurrenciesUsed[data[i].currency_code] + 1 || 1); //puts the number of times a currency has been used into the "foreignCurrenciesUsed" object.
      sum += data[i].price; //the standard total sum for the vanilla answer
      trueSum += data[i].price/exchangeRate; //the true total sum using currency exchanges
    }
  }

  let average = (sum/data.length);  //standard vanilla average
  let trueAverage = (trueSum/data.length); //average calculated with currency exchange

  average = Math.round(average*100)/100; //rounds to nearest cent
  trueAverage = Math.round(trueAverage*100)/100; //rounds to nearest cent

  if (foreignItemsCount>1) { //fixes the grammar depending on how many foreign items there were
    transitiveVerb = "are";
  }

  let uniqueCurrenciesArray = Object.keys(foreignCurrenciesUsed); //puts each unique currency in a plain array
  let numberOfUniqueCurrencies = uniqueCurrenciesArray.length; //finds the length of that array to determine how many foreign currencies there are
  let currencySingularPlural = "in a foreign currency"; //grammar if there's only one foreign currency.

  if (numberOfUniqueCurrencies>1){
    currencySingularPlural=("in " + numberOfUniqueCurrencies + " unique foreign currencies"); //fixes grammar if there are multiple foreign currencies
  };


  console.log("The average price is $"+average+"\n "); //gives the vanilla answer

  if(numberOfUniqueCurrencies>0){ //if there are multiple currencies, it states how many foreign items, and how many unique foreign currencies. It then lists the currencies, the number of items that use each currency, and the up-to-date exchange rate.
    console.log("\t"+"But not really, because "+foreignItemsCount+" of them "+transitiveVerb,currencySingularPlural+ ":");

    for (let i = 0; i<uniqueCurrenciesArray.length; i++){
      currentCurrency = uniqueCurrenciesArray[i]
      numberOfItemsForThisCurrency = foreignCurrenciesUsed[currentCurrency];
      let isPlural = "";
      if (numberOfItemsForThisCurrency>1){isPlural="s"};

      let currentConversionCode = "USD"+currentCurrency; //string for current conversion code
      let currentExchangeRate = eval("exchangeTable.quotes."+currentConversionCode); //fetches current exchange rate

      console.log("\t\t"+(i+1)+".",currentCurrency+": "+numberOfItemsForThisCurrency,"item"+isPlural+".\n\t\t\tThe current exchange rate is "+currentExchangeRate,currentCurrency,": 1 USD");


    }

    console.log("\nOnce these are converted, the true average price comes out to be $"+trueAverage+".\n ");
    console.log("This was calculated using the free currency exchange API at www.apilayer.net\n ")
  }

  return trueAverage;
}



// 2: Show me how to get an array of items that cost between $14.00 and $18.00 USD
function question2 () {
  let newItems = [];
  for (i=0;i<data.length;i++){
    if (data[i].price >= 14 && data[i].price <= 18){
      newItems.push(data[i]);
    }
  }

  for (i=0;i<newItems.length;i++){
    console.log(newItems[i].title);
  }
  return newItems;
}



// 3: Which item has a "GBP" currency code? Display it's name and price.
function question3 () {
  let foreignItems = [];
  for (i=0;i<data.length;i++){
    if (data[i].currency_code == "GBP") {
      foreignItems.push(data[i]);
    }
  }

  for (i=0;i<foreignItems.length;i++) {
    console.log(foreignItems[i].title + " costs "+foreignItems[i].price + " pounds.");
  }
}

// 4: Display a list of all items who are made of wood.
function question4 () {
  let woodItems = [];
  for (i=0;i<data.length;i++){
    for (j=0;j<data[i].materials.length;j++){
      if (data[i].materials[j] == "wood") {
        woodItems.push(data[i]);
      }
    }
  }

  for (i=0;i<woodItems.length;i++) {
    console.log(woodItems[i].title + " is made of wood.");
  }

}






// 5: Which items are made of eight or more materials?
//    Display the name, number of items and the items it is made of.
function question5 () {
  complicatedItems = []
  for (i=0;i<data.length;i++){
    if (data[i].materials.length>=8){
      complicatedItems.push(data[i]);
    }
  }
  for (i=0;i<complicatedItems.length;i++){
    console.log(complicatedItems[i].title + " has " + complicatedItems[i].materials.length + " materials:");
    for (j=0;j<complicatedItems[i].materials.length;j++){
      console.log("\t "+(j+1)+". "+ complicatedItems[i].materials[j]);
    }

  }

}


// 6: How many items were made by their sellers?
// Answer:
function question6 () {
  homeMadeItems = [];
  for (i=0;i<data.length;i++){
    if (data[i].who_made == "i_did"){
      homeMadeItems.push(data[i]);
    }
  }
  console.log(homeMadeItems.length + " items were made by their sellers:");
  for (i=0;i<homeMadeItems.length;i++){
    console.log("\t " +(i+1)+". "+ homeMadeItems[i].title);
  }
}
