const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

document.querySelector("#enter").addEventListener("click", () => {
  if(document.getElementById('item').value.length == 0)
  {
       createToast('error')
  }
  else
  {
    const item = document.querySelector("#item")
    createItem(item)
  }
  
})

document.querySelector("#item").addEventListener("keypress", (e) => {
  if(e.key === "Enter"){
   
    const item = document.querySelector("#item")
    createItem(item)
  }
})

function displayDate(){
  let date = new Date()
  date = date.toString().split(" ")
  date = date[1] + " " + date[2] + " " + date[3] 
  document.querySelector("#date").innerHTML = date 
}

function displayItems(){
  let items = ""
  for(let i = 0; i < itemsArray.length; i++){
    items += `<div class="item">
                <div class="input-controller">
                  <textarea disabled>${itemsArray[i]}</textarea>
                  <div class="edit-controller">
                    <i class="fa-solid fa-check deleteBtn"></i>
                    <i class="fa-solid fa-pen-to-square editBtn"></i>
                  </div>
                </div>
                <div class="update-controller">
                  <button class="saveBtn">Save</button>
                  <button class="cancelBtn">Cancel</button>
                </div>
              </div>`
  }
  document.querySelector(".to-do-list").innerHTML = items
  activateDeleteListeners()
  activateEditListeners()
  activateSaveListeners()
  activateCancelListeners()
}

function activateDeleteListeners(){
  let deleteBtn = document.querySelectorAll(".deleteBtn")
  deleteBtn.forEach((dB, i) => {
    dB.addEventListener("click", () => { deleteItem(i) })
  })
}

function activateEditListeners(){
  const editBtn = document.querySelectorAll(".editBtn")
  const updateController = document.querySelectorAll(".update-controller")
  const inputs = document.querySelectorAll(".input-controller textarea")
  editBtn.forEach((eB, i) => {
    eB.addEventListener("click", () => { 
      updateController[i].style.display = "block"
      inputs[i].disabled = false })
  })
}

function activateSaveListeners(){
  const saveBtn = document.querySelectorAll(".saveBtn")
  const inputs = document.querySelectorAll(".input-controller textarea")
  saveBtn.forEach((sB, i) => {
    sB.addEventListener("click", () => {
      updateItem(inputs[i].value, i)
    })
  })
}

function activateCancelListeners(){
  const cancelBtn = document.querySelectorAll(".cancelBtn")
  const updateController = document.querySelectorAll(".update-controller")
  const inputs = document.querySelectorAll(".input-controller textarea")
  cancelBtn.forEach((cB, i) => {
    cB.addEventListener("click", () => {
      updateController[i].style.display = "none"
      inputs[i].disabled = true
      inputs[i].style.border = "none"
    })
  })
}
let bool=true;
function createItem(item){
  for(let i=0; i<itemsArray.length ; i++){
    if(itemsArray[i]==item.value){
      bool=false;
    }
    else{
      bool=true;
    }

  }
    if(bool==true){
      itemsArray.push(item.value)
      localStorage.setItem('items', JSON.stringify(itemsArray))
      location.reload()
    }
    else{
      createToast('warning')
    } 
}

function deleteItem(i){
  itemsArray.splice(i,1)
  localStorage.setItem('items', JSON.stringify(itemsArray))
  location.reload()
  
}

function updateItem(text, i){
  itemsArray[i] = text
  localStorage.setItem('items', JSON.stringify(itemsArray))
  location.reload()
}

window.onload = function() {
  displayDate()
  displayItems()
};


 

  const removeToast = (toast) => {
     toast.classList.add("hide");
     if(toast.timeoutId) clearTimeout(toast.timeoutId); // Clearing the timeout for the toast
     setTimeout(() => toast.remove(), 500); // Removing the toast after 500ms
  }
  const createToast = (id) => {

    const notifications = document.querySelector(".notifications");

    const toastDetails = {
      timer: 5000,
      success: {
          icon: 'fa-circle-check',
          text: 'Success: Successfully added a Task.',
      },
      error: {
          icon: 'fa-circle-xmark',
          text: 'Error: You are not Entered any Task.',
      },
      warning: {
          icon: 'fa-triangle-exclamation',
          text: 'Warning: This Task is already Exists.',
      }
    }



    // Getting the icon and text for the toast based on the id passed
     const { icon, text } = toastDetails[id];
      const toast = document.createElement("li"); // Creating a new 'li' element for the toast
      toast.className = `toast ${id}`; // Setting the classes for the toast
    // Setting the inner HTML for the toast
     toast.innerHTML = `<div class="column">
                         <i class="fa-solid ${icon}"></i>
                         <span>${text}</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
     notifications.appendChild(toast); // Append the toast to the notification ul
     // Setting a timeout to remove the toast after the specified duration
     toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
  }

