//function to save bookmarks

//Listen for form submit
document.getElementById("myForm").addEventListener('submit',saveBookMark);
function saveBookMark(e){ 
	var siteName =  document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteURL').value;
	console.log(siteName,siteUrl);
	// does validation on form input
	if(!validateForm(siteName,siteUrl)){
		return false;
	}
	// save bookmark values in an object
	var bookmark = {
		name: siteName,
		url: siteUrl
	}
	// test if bookmarks is null
	if(localStorage.getItem('bookmarks') === null){
		// Init an array to store bookmark objects
		var bookmarks = [];
		// Add the bookmark object
		bookmarks.push(bookmark);
		console.log(bookmarks);
		// Store it in localstorage as strings as it only stores strings and not objects
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}
	else{
		//get bookmarks from local storage
		var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
		// add bookmark to array
		bookmarks.push(bookmark);
		// Reset back to localStorage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}

	// clear form
	document.getElementById('myForm').reset();
	fetchBookmarks();

	//prevents default behaviour of forms 
	e.preventDefault();

}


// Function to fetch bookmarks

function fetchBookmarks(){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	var bookmarksResult = document.getElementById('bookmarksResult');
	 // loop through the bookmark array
	bookmarksResult.innerHTML='';
	 for(var i = 0 ; i<bookmarks.length; i++){
	 	var name = bookmarks[i].name;
	 	var url = bookmarks[i].url;
	 	bookmarksResult.innerHTML+=`<div class ="well"><h3>`+name+' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+' <a onclick="deleteBookMark(\''+url+'\')" class = "btn btn-danger" href = "#">Delete</a>'+'</h3>'+'</div>';

	 }
}

// Delete bookmark
function deleteBookMark(url){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	for(var i = 0 ; i < bookmarks.length; i++ ){
		if(bookmarks[i].url== url)
			// remove the item from array
		bookmarks.splice(i,1);
	}
	// reset back the local storage file
	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	// re-fetch thw bookmarks
	fetchBookmarks();
}


// validate the form input

function validateForm(siteName,siteUrl){
	if(!siteName || !siteUrl){
		alert("Please up all the fields");
		return false;
	}
	var exp = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(exp);
	if(!siteUrl.match(regex)){
		//siteUrl ='';
		document.getElementById('siteURL').value = "Enter valid url";
		document.getElementById('siteURL').focus();
		return false;
	}
	else
		return true;
} 