const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");


let bookmarks = [];



// Show Modal , Focus on Input 
function showModal () {
    modal.classList.add("show-modal");
    websiteNameEl.focus();
}

// Modal Even Listeners 

modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", () => modal.classList.remove("show-modal"));
window.addEventListener("click", (e) => (e.target === modal ? modal.classList.remove("show-modal") : false))
// Validate Form 
function validate(nameValue, urlValue) {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if (!nameValue || !urlValue) {
        alert("please submit values for both fields")
        return false;
    }
    if(!urlValue.match(regex)){
        alert("Please provide a valid web address");
        return false;
    }

    // Valid 
    return true;
    //Fetch bookmarks 
function fetchBookmarks () {
if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"))
} else {
    // Create bookmarks array in local store 
    bookmarks = [
    {
        name: "facebook",
        url: "https://facebook.com",
    },
   ];
    localStorage.set("bookmarks" JSON.stringify(bookmarks));
}
  console.log()
}



// Handle Data From Form 
function storeBookmark(e){
    e.preventDefault();
   const nameValue = websiteNameEl.value;
   let urlValue = websiteUrlEl.value 
   if (!urlValue.includes("http://", "https://")) {
       urlValue = `https://${urlValue}`;
   }
 
    if (!validate(nameValue, urlValue )){
        return false;
    }

    const bookmark = {
        name: nameValue, 
        url: urlValue,   
    }
    bookmarks.push(bookmark);
    console.log(JSON.stringify(bookmarks));
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
    bookmarkForm.reset();
    websiteNameEl.focus();
}

// Even Listener 
bookmarkForm.addEventListener("submit", storeBookmark)