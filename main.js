// Since the `data.js` file is loaded in your `index.html` before this one,
// you have access to the `data` variable that contains the Etsy Store data.
// Open your `index.html` page in your browser and you can verify that the following
// is properly working. The `data` variable is an array with 25 items in it
// console.log(data);

console.log(data);

// 1: Show me how to calculate the average price of all items.
function question1 () {
  let sum = 0;
  let trueSum = 0;
  let exchange = 1.31;
  let numberOfForeignItems = 0;
  let transitiveVerb = "is";

  for (i=0;i<data.length;i++){
    if (data[i].currency_code=="USD"){
      sum += data[i].price;
      trueSum += data[i].price;
    }
    else if (data[i].currency_code == "GBP"){
      sum += data[i].price;
      trueSum += exchange*data[i].price;
      numberOfForeignItems += 1;
    }

  }
  let average = (sum/data.length);
  let trueAverage = (trueSum/data.length);

  if (numberOfForeignItems>1) {
    transitiveVerb = "are";
  }


  average = Math.round(average*100)/100;
  trueAverage = Math.round(trueAverage*100)/100;

  console.log("The average price is $"+average);
  console.log("\t"+"(But not really, because "+numberOfForeignItems+" of them "+transitiveVerb+" in GBP. At 1 USD:"+exchange+" GBP, the true average price is $"+trueAverage+")");
  return average;
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
      console.log("\t - "+complicatedItems[i].materials[j]);
    }

  }

}


// 6: How many items were made by their sellers?
// Answer:
function question6 () {
  // Answer:
}