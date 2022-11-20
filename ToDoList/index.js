/////////
//SETUP//
/////////

//Get current toDoList, completed list and completed times list. If there is no list create one.  
let toDoList = JSON.parse(localStorage.getItem("toDoList"));
if(!toDoList) {
	toDoList = [];
};

let completedList = JSON.parse(localStorage.getItem("completedList"));
if (!completedList) {
	completedList = [];
};

let completedDateList = JSON.parse(localStorage.getItem("completedDateList"));
if (!completedDateList) {
	completedDateList = [];
};

//Display current to do list items
displayToDoList(toDoList);
displayCompleted(completedList);

/////////////////
//SUBMIT BUTTON//
/////////////////

//Add new item to to-do list on submit. 

let form = document.getElementById('form');

form.addEventListener('submit', event => {
	let input = form.elements['new_item_input']; 
	toDoList.push(input.value);
	localStorage.setItem("toDoList", JSON.stringify(toDoList));
});

/////////////////////
//DISPLAY FUNCTIONS//
/////////////////////

//Function displays items in to do list with an option to remove the item from the list and an option
//to check off the item as completed.
function displayToDoList(toDoList){
	//Clear existing items 
	let toDoListContainer = document.getElementsByClassName("toDoItems")[0];
	while(toDoListContainer.firstChild){
		toDoListContainer.removeChild(toDoListContainer.firstChild);
	};
	
	for(let i=0; i<toDoList.length; i++){
		
		//Add new element
		let item_element = document.createElement("li");
		let text = document.createTextNode(toDoList[i]);
		item_element.appendChild(text);
		
		//CHECK BUTTON
		//Create button
		let check_button = document.createElement("button");
		//Add styling to button
		check_button.classList.add("button","check");
		//Create icon 
		let icon_check = document.createElement("i");
		icon_check.classList.add("fas", "fa-check");
		//Add icon to button 
		check_button.appendChild(icon_check);
		//Add button to list
		item_element.appendChild(check_button);
		
		check_button.addEventListener('click', event => {
			//put completed item into completed list
			completedList.push(toDoList[i]);

			//Get current date and time and add to completed times list
			let now = new Date();
			let date = now.getDate() +'/'+(now.getMonth()+1)+'/'+ now.getFullYear();
			let time = now.getHours() + ":" + now.getMinutes();
			let dateTime = date + " " + time; 
			completedDateList.push(dateTime);

			//remove completed item from to do list
			toDoList.splice(i,1);

			//Store data in completed List and completed time array
			localStorage.setItem("completedList", JSON.stringify(completedList));
			localStorage.setItem("completedDateList", JSON.stringify(completedDateList));

			//display updated lists
			displayToDoList(toDoList);
			displayCompleted(completedList);

		});



		//REMOVE BUTTON
		//Create button
		let remove_button = document.createElement("button");
		//Add styling to button
		remove_button.classList.add("button","remove");
		//Create icon 
		let icon_remove = document.createElement("i");
		icon_remove.classList.add("fas","fa-trash");
		//Add icon to button
		remove_button.appendChild(icon_remove);
		//Add button to list
		item_element.appendChild(remove_button);

		//Add event listener to delete button 
		remove_button.addEventListener('click', event => {
			toDoList.splice(i,1);
			localStorage.setItem("toDoList", JSON.stringify(toDoList));
			displayToDoList(toDoList);
		});

		//Add item to list
		toDoListContainer.appendChild(item_element);

	};
};


//This function displays last completed items with date and time of completion. 
function displayCompleted(completedList){
	let completedListContainer = document.getElementsByClassName("completedItems")[0];

	while(completedListContainer.firstChild){
		completedListContainer.removeChild(completedListContainer.firstChild);
	};

	//Cap completed items at last 3 items
	const cap = 3
	if(completedList.length >= cap){
		completedList.splice(0,completedList.length-cap);
		localStorage.setItem("completedList", JSON.stringify(completedList));
		completedDateList.splice(0,completedDateList.length-cap);
		localStorage.setItem("completedDateList",JSON.stringify(completedDateList))

	}

	//Creating completd list items
	for(let i=completedList.length-1; i>=0; i--){
		//Creating list item
		let item_element = document.createElement("li");
		let text = document.createTextNode(completedList[i]);
		item_element.appendChild(text);

		let completed_time_element = document.createElement("span");

		let completed_time_text = document.createTextNode(" Completed at " + completedDateList[i]);
		completed_time_element.appendChild(completed_time_text);
		completed_time_element.classList.add("timestamp");
		item_element.appendChild(completed_time_element);
		
		completedListContainer.appendChild(item_element);
	};
		
};