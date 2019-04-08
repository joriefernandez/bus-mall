'use strict';


//global variables
var allProducts = [];
var products = document.getElementById('image-container');
var maxSelections = 5;
var previousProducts = [];
var currentProducts = [];

var displayNumber = 3;

//Constructor for product image
function ProductPic(name) {
  // images/sassy-goat.jpg
  this.filepath = `img/${name}.jpg`;
  this.name = name;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);

}

//Function to generate random product

function showRandomProduct(){
  return Math.floor(Math.random() * allProducts.length);
}

//Function to display images
function displayImages(){



  currentProducts = [];



  for(var index = 0; index < displayNumber; index++){
    var random  = showRandomProduct();

    while(currentProducts.includes(random) || previousProducts.includes(random)){
      console.log('Product in the current batch ', allProducts[random].name);
      random = showRandomProduct();
    }
    allProducts[random].views += 1;
    createImageElement(allProducts[random]);
    currentProducts.push(random);
  }


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
  for (var i= 0 ; i < allProducts.length; i++){
    if(allProducts[i].name === curName){
      allProducts[i].clicks += 1;
    }
  }

  console.log('Number of clicks so far...');
  console.table(allProducts);

}



function handleProductClick(event) {
  // console.log(event.target.id);
  console.log('User clicked the following:', currentClickNumber);
  console.log(event.target.id);

  if(currentClickNumber > 0){
    currentClickNumber -= 1;
    //Update the click number
    updateClick(event.target.id);
    //display new batch of images
    displayImages();
  } else{
    alert('You maximized the number of clicks');
    
    products.removeEventListener();
  }
  
  
}
// Instantiate

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


var currentClickNumber = maxSelections;

//Display images in the container
displayImages();

products.addEventListener('click', handleProductClick);

