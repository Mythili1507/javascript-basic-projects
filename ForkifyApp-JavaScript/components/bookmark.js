import {FORKIFY_API_URL} from '../constants.js';

const BOOKMARKED_RECIPE_STROAGE_KEY = 'bookmarkedRecipeStroageKey';

const bookmarkContainerEl = document.getElementById('bookmarks-popup');

const bookmarksButtonEl = document.getElementById('bookmarksButton');

let bookmarkedList = [];

export function onBookmarkClicked(id)
{
  if(!bookmarkedList.includes(id))
  {
    bookmarkedList.push(id);
    localStorage.setItem(BOOKMARKED_RECIPE_STROAGE_KEY,JSON.stringify(bookmarkedList));
    createBookmarkList();
    console.log("bookmark working");
    console.log(bookmarkedList);
  }

  else
  {
    console.log("Already exists");
  }
}

function loadBookmarkDataInitiallyFromStorage()
{
  let savedData = localStorage.getItem(BOOKMARKED_RECIPE_STROAGE_KEY);
  // localStorage.clear();
  if(savedData !== null)
  {
    console.log("saved bookmarked data = ", savedData);
    bookmarkedList = JSON.parse(savedData);
    console.log("loaded bookmarked recipes");
  }

  console.log("loadBookmarkDataInitiallyFromStorage: ",bookmarkedList);
}

function createBookmarkList()
{
    // bookmarkedList.forEach(bookmark=>{
    //   console.log(bookmark);
    // });
console.log("createBookmarkList started");

console.log("bookmarkedList:",bookmarkedList);

  let fullTemplate = ``;

// console.log("createBookmarkList before forEach loop");

    bookmarkedList.forEach((recipeId, i)=>{
      fetch(FORKIFY_API_URL+'/'+recipeId)
      .then(res => res.json())
      .then(resData=>{
        console.log("createBookmarkList fetch start loop = ", i);
        console.log("resData = ",resData);
        let template =
        `<div class= "bookmark-list-item">
          <img src ="${resData.data.recipe.image_url}" width="32px" height="32px" class="rounded" />
          <div>
            <div>${resData.data.recipe.title}</div>
            <div>${resData.data.recipe.publisher}</div>
          </div>
        </div>`;

        fullTemplate = fullTemplate+template;

        // console.log("fullTemplate =",fullTemplate);
        bookmarkContainerEl.innerHTML = fullTemplate;

        // console.log("createBookmarkList fetch end loop = ", i);
      }).catch(err => console.log("Error",err)  );

    });
    // console.log("createBookmarkList after forEach loop");

    //console.log("bookmarkContainerEl =",bookmarkContainerEl);
    console.log("createBookmarkList ended");
}

function onBookmarksClicked()
{
  console.log("onbookmarks clicked");
  bookmarkContainerEl.classList.toggle('hidden');
}

bookmarksButtonEl.addEventListener('click', onBookmarksClicked);

// createBookmarkList();

export {loadBookmarkDataInitiallyFromStorage, createBookmarkList, onBookmarksClicked};
