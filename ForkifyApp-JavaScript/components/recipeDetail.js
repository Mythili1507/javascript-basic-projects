import {FORKIFY_API_URL, API_KEY} from "../constants.js";
import { onBookmarkClicked } from "./bookmark.js";
// import { onNextBtnClicked, onPrevBtnClicked } from "./recipeIndex.js";

const recipeDetailEl = document.getElementById('recipe-detail');

// let currentRecipeData;

export function recipeIndexClicked(id)
{
  fetch(FORKIFY_API_URL+'/'+id)
  .then(res => res.json())
  .then(resData =>{
    //  currentRecipeData = resData.data.recipe;
     let recipeData = resData.data.recipe;
   console.log("recipeData in fetch = ", JSON.stringify(recipeData, null, 4));
  // recipeDetailEl.innerHTML = JSON.stringify(recipeData,null,4);
    createRecipeDetail(recipeData);
  });
}


export function createRecipeIngredients(ingredients, servings)
{
  console.log(ingredients);
  let ingredientTemplate = '<ul>';
  for(let ingredient of ingredients)
  {
    console.log(ingredient);
    console.log('q=',ingredient.quantity,'; servings=',servings,'; q*s = ',(ingredient.quantity * servings));
    ingredientTemplate+= `
    <li>
    <div>${ingredient.quantity * servings}</div>
    <div>${ingredient.unit}</div>
    <div>${ingredient.description}</div>
    </li>`;
  }
  ingredientTemplate+='</ul>';
  return ingredientTemplate;
}


export function createRecipeDetail(recipeData)
{
  console.log("recipeData in createRecipeDetail = ", JSON.stringify(recipeData, null, 4));
  let template =`
  <div id="${recipeData.id}">
    <h3>${recipeData.title}</h3>
    <img src="${recipeData.image_url}" width="600" height= "300"/>
    <div>${recipeData.cooking_time} </div>
    <div>
      ${recipeData.servings} Servings
      <button name='inc'>+</button> <button name='dec'>-</button>
    </div>
    <div> ${createRecipeIngredients(recipeData.ingredients, recipeData.servings)}</div>
    <button name="bmb" class ="bookmark-btn" ><i class="fa-regular fa-bookmark"></i></button>
  </div>
  `;
  recipeDetailEl.innerHTML = template;
  let incBtn = recipeDetailEl.querySelector("button[name='inc']");
  let decBtn = recipeDetailEl.querySelector("button[name='dec']");
  let bmb = recipeDetailEl.querySelector("button[name='bmb']");
  // console.log('incBtn =', incBtn,'; decBtn =', decBtn);
  incBtn.addEventListener('click', ()=> onServingsIncreased(recipeData));
  decBtn.addEventListener('click', ()=> onServingsDecreased(recipeData));
  bmb.addEventListener('click',()=> onBookmarkClicked(recipeData.id));
}


export function onServingsIncreased(recipeData)
{
  recipeData.servings++;
  createRecipeDetail(recipeData);
}


export function onServingsDecreased(recipeData)
{
  if(recipeData.servings>1)
  {
    recipeData.servings--;
    createRecipeDetail(recipeData);
  }
}

