
// hides disclaimers in articles on Meduza's website
function hideDisclaimersMeduza() {
	let meduzaBanners = document.getElementsByClassName("Banner-root")
	if (meduzaBanners.length >0){
	  meduzaBanners[0].style.display='none'
	}
}

// hides disclaimers in Meduza's posts on Facebook
function hideDisclaimersFB() {
	let divTags = document.getElementsByTagName('div');
	for (let i = 0; i < divTags.length; i++) {
		const selectedTag = divTags[i].innerHTML.toLowerCase();
		if((selectedTag.indexOf("see more")===0 || selectedTag.indexOf("ещё")===0) 
			&& divTags[i-1].innerHTML.toLowerCase().indexOf("данное сообщение (материал)")===0){
			divTags[i].click();
		}
	}
	
	divTags = document.getElementsByTagName('div');

	for (let i = 0; i < divTags.length; i++) {
		const selectedTag = divTags[i].innerHTML.toLowerCase();
		if(selectedTag.startsWith('данное сообщение (материал)')){
			divTags[i].style.display = 'none' 
		}	
	} 	
}

hideDisclaimersMeduza();
let counter = 0;

// listens for facebook updates (for example, when scrolling the feed) and hides disclaimers in the found Meduza's posts
let observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
	if (mutation.target.innerHTML && mutation.target.innerHTML.trim().startsWith("<div") && mutation.target.innerHTML.trim().length< 2000 && mutation.target.innerHTML.toLowerCase().indexOf("данное сообщение (материал)")>-1){
		counter++;
	}
  })
	if (counter >0){
		counter=0;
		hideDisclaimersFB();
	}

});

// Start observing the target node for configured mutations
let targetNode = document.body;
observer.observe(targetNode, {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true
});

