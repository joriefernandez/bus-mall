'use strict';


/**********************************************************
 *
 * Global variables
 *********************************************************/
//List of all array objects
var allProducts = [];

//Product image container
var products = document.getElementById('image-container');

//Number of clicks/selections per user
var maxSelections = 25;

//List of previous shown products
var previousProducts = [];

//List of current shown products
var currentProducts = [];

//Number of images to be displayed
var displayNumber = 3;

//Counter for current number of clicks
var currentClickNumber = 0;

// Votes container
var listContainer = document.getElementById('votes-container');

//Chart datasets
var productLabel = [];
var voteData;


//Constructor for product image
function ProductPic(name) {
  this.filepath = `img/${name}.jpg`;
  this.name = name;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);

}

/**************************************************************
 *
 * FUNCTIONS
 *
****************************************************************/


//Function to generate random product

function showRandomProduct(){
  return Math.floor(Math.random() * allProducts.length);
}

//Function to display images
function displayImages(){
  //current list of products
  currentProducts = [];
  //clear the display
  products.innerHTML = '';

  // loop through number of displays
  for(var index = 0; index < displayNumber; index++){
    var random  = showRandomProduct();

    //Check if the image has duplicate
    while(currentProducts.includes(random) || previousProducts.includes(random)){
      console.log('Product in the current batch ', allProducts[random].name);
      random = showRandomProduct();
    }
    allProducts[random].views += 1;
    createImageElement(allProducts[random]);
    currentProducts.push(random);
  }

  // Update previous batch
  updatePreviousBatch(currentProducts);
}

//Function to update previous batch
function updatePreviousBatch(curArr){
  for(var i=0; i < curArr.length; i++){
    previousProducts[i] = curArr[i];
  }

}

// Function to create image element
function createImageElement(ProductPic){
  var image = document.createElement('img');
  image.id = ProductPic.name;
  image.src = ProductPic.filepath;
  image.alt = ProductPic.name;
  image.title = ProductPic.name;
  products.appendChild(image);

}

//function to update clicks
function updateClick(curName){
  // Find the pic and update views
  for (var i= 0 ; i < allProducts.length; i++){
    if(allProducts[i].name === curName){
      allProducts[i].clicks += 1;
    }
  }
}

//Function to update the chart arrays
function updateChartArrays() {
  for (var i = 0; i < allProducts.length; i++) {
    productLabel[i] = allProducts[i].name;
    voteData[i] += allProducts[i].clicks;
  }
}

// Product click function
// Input: event - when user clicks on images
function handleProductClick(event) {
  currentClickNumber += 1;
  console.log('User clicked the following:', currentClickNumber);
  console.log(event.target.id);

  //Check if user can still click on selections
  if(currentClickNumber < maxSelections){
    //Update the click number
    updateClick(event.target.id);
    //display new batch of images
    displayImages();
  } else if (currentClickNumber === maxSelections){
    //Update count
    updateClick(event.target.id);

    //User reached the limit
  }else if (currentClickNumber > maxSelections){
    alert('You have reached the maximum number of selections.');
    products.removeEventListener('click', handleProductClick);

    updateChartArrays();
    displayVotes();
    drawChart();
    storeToLocalStorage();
  }

}

//Function to determine vote/s
function voteWord(num){
  if (num > 1){
    return 'votes';
  } else{
    return 'vote';
  }
}

// Function to display the list of votes
function displayVotes(){

  var unorderedList = document.getElementById('list-votes');
  for (var i = 0; i < allProducts.length; i++){
    //create list element
    var listElement = document.createElement('li');

    //vote word to use
    let word = voteWord(voteData[i]);
    listElement.textContent = `${voteData[i]} ${word} for ${allProducts[i].name}`;
    unorderedList.appendChild(listElement);
  }

  listContainer.appendChild(unorderedList);
}


/********************* CHART FUNCTIONS ************************** */

var options = {
  scales: {
    xAxes: [{
      barPercentage: 0.8,
      barThickness: 'flex',
      gridLines: {
        offsetGridLines: true
      }
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true,
        stepSize: 1,
        min: 0
      }
    }]
  }
};

// Function to draw chart
function drawChart(){
  var ctx = document.getElementById('product-chart').getContext('2d');
  var theChart = new Chart(ctx, {
    type:'bar',
    data : {
      labels: productLabel,
      datasets: [
        {
          label: '# of Votes',
          data: voteData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)'
          ],
          hoverBackgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ]
        }
      ]
    },

    options: options
  });
}


//function to store to local storage
function storeToLocalStorage(){
  localStorage.setItem('clickCounts',JSON.stringify(voteData));
}

//function to clear local storage
function clearStorage(){
  localStorage.clear();
}

/************************************************************************
*
* FUNCTION CALLS
*
*************************************************************************/

// Instantiate all objects

new ProductPic('bag');
new ProductPic('banana');
new ProductPic('bathroom');
new ProductPic('boots');
new ProductPic('breakfast');
new ProductPic('bubblegum');
new ProductPic('chair');
new ProductPic('cthulhu');
new ProductPic('dog-duck');
new ProductPic('dragon');
new ProductPic('pen');
new ProductPic('pet-sweep');
new ProductPic('scissors');
new ProductPic('shark');
new ProductPic('sweep');
new ProductPic('tauntaun');
new ProductPic('unicorn');
new ProductPic('usb');
new ProductPic('water-can');
new ProductPic('wine-glass');


//Display images in the container
displayImages();

if(localStorage.clickCounts){
  voteData = JSON.parse(localStorage.clickCounts);
  console.table(voteData);

} else{
  voteData = [0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
}
//Event listener for images
products.addEventListener('click', handleProductClick);


//Event listener to clear local storage
document.getElementById('clear-local').addEventListener('click', clearStorage);

