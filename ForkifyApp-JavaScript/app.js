import {loadBookmarkDataInitiallyFromStorage, createBookmarkList} from './components/bookmark.js';


function onStart()
{
 // not user interaction
  loadBookmarkDataInitiallyFromStorage();
  createBookmarkList();
}

onStart();





