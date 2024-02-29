import { backendURL, showNavAdminPages, successNotification, errorNotification, getLoggedUser, userId } from "../utils/utils.js";

// Wrap your code in an asynchronous function
const initProfile = async () => {

// calling function - important to execute the code inside the function
getLoggedUser();



// Fetch the logged-in user's ID
const loggedUserId = await getLoggedUser();
console.log(loggedUserId);
// Declare for_update_id and initialize it with the logged-in user's ID
let for_update_id = loggedUserId ? loggedUserId : "";

// Get All Data
// getData();

showNavAdminPages();

// Submit Form Functionality; This is for create and update
const form_profile = document.getElementById("form_profile");

form_profile.onsubmit = async (e) => {
  e.preventDefault();

  // Disable button
  document.querySelector("#form_profile button[type = 'submit']").disabled = true;
  document.querySelector("#form_profile button[type = 'submit']").innerHTML = 
    `<div class="col-sm-12 d-flex justify-content-center align-items-center">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <b class="ms-2">Loading...</b>
    </div>`;

  //   Get values of form (input, textarea, select) put it as form-data
  const formData = new FormData(form_profile);

  let response;
  
  // Check if for_update_id is empty; If it is empty then it's create, else it's update
  if (for_update_id) {
    // Add Method Spoofing to cater Image Upload; Uncomment if necessary
    formData.append("_method", "PUT");

    // fetch API property owner update endpoint
    response = await fetch(
      backendURL + "/api/user/" + for_update_id,
      {
        method: "POST", // Change to POST if with Image Upload
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
        },
        // Uncomment body below; If with Image Upload
        body: formData,
        // Comment body below; if with Image Upload
        // body: new URLSearchParams(formData),
      }
    );
  } else {
    // For new creation
    // fetch API property owner store endpoint
    response = await fetch(
      backendURL + "/api/user",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
        },
        body: formData,
      }
    );
  }

  // Get response if 200-299 status code
  if (response.ok) {
    // uncomment the two code lines below for debugging purpose 
    // const json = await response.json();
    // console.log(json);

    // Reset Form
    // form_profile.reset();

    successNotification("Successfully" + (for_update_id == "" ? " created" : " updated") + " profile.", 10);

    // Reload Page
    // getData();

    // // Refresh the page
    // location.reload(10); 

  }
  // Get response if 422 status code
  else if (response.status == 422) {
    const json = await response.json();

    // // Close Modal
    // document.getElementById("modal_close").click();

    errorNotification(json.message, 10);

  }
  // Always reset for_update_id to empty string
//   for_update_id = "";
  document.querySelector("#form_profile button[type='submit']").disabled = false;
  document.querySelector("#form_profile button[type='submit']").innerHTML = "Save Changes";

}
};
// Call the asynchronous function
initProfile();
