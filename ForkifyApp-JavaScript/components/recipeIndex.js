import {recipeIndexClicked} from "./recipeDetail.js";
// import {FORKIFY_API_URL, API_KEY} from "../constants.js";
import { FORKIFY_API_URL,API_KEY } from "../constants.js";


const searchInputEl = document.getElementById('searchInput');
const recipeListEl = document.getElementById('recipe-list');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const pageSize = 10;
let currentPageNum = 0;
let numPages = 1;

let numRecipes = 0;
let filteredRecipeList = [];


export function onSearchClicked()
{
  let searchInput = searchInputEl.value ;
  fetch(FORKIFY_API_URL+'?search='+searchInput+'&key='+API_KEY)
  .then(res => res.json())
  .then(resData =>{
    filteredRecipeList = resData.data.recipes;
    console.log('filteredRecipeList = ',filteredRecipeList);
    numRecipes = filteredRecipeList.length;
    numPages = parseInt(numRecipes/pageSize);
    if(numRecipes%pageSize>0)
    {
      numPages = numPages+1;
    }
    console.log('numRecipes=',numRecipes,'; numPages=',numPages,'; ');
    pageRefresh();
  });
}

searchInputEl.addEventListener('keyup', e =>{
  // console.log(e.key);
  if(e.key === 'Enter')
  {
   onSearchClicked();
  }
});

searchInputEl.addEventListener('click', onSearchClicked);


export function onPrevBtnClicked()
{
  currentPageNum--;
  if(currentPageNum<0)
  {
    currentPageNum = 0;
  }
  pageRefresh();
}


export function onNextBtnClicked()
{
  currentPageNum++;
  if(currentPageNum>numPages)
  {
    currentPageNum = numPages;
  }
  pageRefresh();
}


export function pageRefresh()
{
  recipeListEl.innerHTML = "";

  let start = currentPageNum*pageSize;
  let end = start+pageSize;
  console.log('pageRefresh : start=',start,'; end=',end);
  createRecipeIndexes(filteredRecipeList, start, end);
}


export function createRecipeIndexes(recipeList, start, end)
{
  for(let i=start; i<end; i++)
  {
    if(i<recipeList.length)
    {
      let recipe = recipeList[i];
      createRecipeIndex(recipe.id,recipe.image_url,recipe.title, recipe.publisher);
    }
  }
}

export function createRecipeIndex(id,imageUrl,title,publisher)
{
  let template =
  ` <div class="recipe-index" id="${id}">
      <img src= "${imageUrl}"  width="64" height="64" />
      <div class="recipe-index-info">
      <div> ${title} </div>
      <div> ${publisher} </div>
    </div>`;
  // console.log('recipeIndexClicked = ',recipeIndexClicked);
  let recipeIndexEl = document.createElement("div");
  recipeIndexEl.innerHTML = template;
  recipeIndexEl.addEventListener('click', () => recipeIndexClicked(id) );

  recipeListEl.appendChild(recipeIndexEl);
  console.log('createRecipeIndex working for ',id,' - ',title);
}

// console.log('prevBtn=',prevBtn,'; nextBtn=',nextBtn);

prevBtn.addEventListener('click',onPrevBtnClicked);
nextBtn.addEventListener('click',onNextBtnClicked);
