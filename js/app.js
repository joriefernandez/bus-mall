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
  image.style.width = '300px';
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
    console.table(allProducts);
  }

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

//Event listener for images
products.addEventListener('click', handleProductClick);

