
import {FORKIFY_API_URL, API_KEY} from '../constants.js';

 export function onFormSubmit(e)
{
  e.preventDefault();

  let formEl = document.getElementById('add-recipe-form');
  let formData = new FormData(formEl);
  let formDataEntriesArr = [...formData];
  let formDataObj = Object.fromEntries(formDataEntriesArr);

  console.log("formDataEntriesArr = ", formDataEntriesArr);
  console.log("formDataObj = ",formDataObj);


  function splitIngredient(ingredientStr)
  {
    let ingredientParts = ingredientStr.split(',', 3);
    let ingredientObj = {};
    if(ingredientParts.length>=3)
    {
      ingredientObj.quantity = parseInt(ingredientParts[0]);
      ingredientObj.unit = ingredientParts[1];
      ingredientObj.description = ingredientParts[2];
    }
    return ingredientObj;
  }
let in1 = splitIngredient("");
let inStrArr = [ "", "" ];
let inObjArr = [ splitIngredient(""), splitIngredient(""),splitIngredient(""), splitIngredient("") ];

let recipeData = {
  "title" : formDataObj.title,
  "publisher" : formDataObj.publisher,
  "source_url" : formDataObj.source_url,
  "image_url" : formDataObj.image_url,
  "servings" : parseInt(formDataObj.servings),
  "cooking_time" : parseInt(formDataObj.cooking_time),

  "ingredients" : [
    splitIngredient(formDataObj.ingredient_0),
    splitIngredient(formDataObj.ingredient_1),
    splitIngredient(formDataObj.ingredient_2),
    splitIngredient(formDataObj.ingredient_3),
    splitIngredient(formDataObj.ingredient_4),
    splitIngredient(formDataObj.ingredient_5),
  ]
};
fetch(FORKIFY_API_URL+'?key='+API_KEY,{
  method : "POST",
  headers : {"Content-Type":"application/json"},
  body : JSON.stringify(recipeData)

 }).then(res=> console.log(res));

 console.log("recipeData = ",recipeData);

alert("you are going to submit a form");

 return false;
}
document.querySelector('.add-recipe').addEventListener('submit', onFormSubmit);

const addRecipeModalBtn = document.getElementById('addRecipeBtn');
const addRecipeModal = document.getElementById('addRecipeModal');
const closeRecipeModal = document.getElementById('closeModal');

function showAddRecipeModal()
{
  addRecipeModal.style.display = "block";
}
function hideRecipeModal()
{
  addRecipeModal.style.display = "none";
}

export function onAddRecipeClicked()
{
  showAddRecipeModal();
}

export function onCloseModalClicked(){
  hideRecipeModal();

}
window.onclick = function(e)
{
  if(e.target == addRecipeModal)
  {
    hideRecipeModal();
  }
}

addRecipeModalBtn.addEventListener('click',onAddRecipeClicked);
closeRecipeModal.addEventListener('click', onCloseModalClicked);