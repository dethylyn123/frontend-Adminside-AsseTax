import { backendURL, showNavAdminPages, successNotification, errorNotification, getLoggedUser, } from "../utils/utils.js";

// calling function - important to execute the code inside the function
getLoggedUser();

// Get All Data
getData();

showNavAdminPages();

// Show Functionality
const showData = async (id) => {
    // Fetch API property owner show endpoint
    const response = await fetch(
      backendURL + "/api/classification/" + id,  
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
        },
      }
    );
  
    // Get response if 200-299 status code
    if (response.ok) {
      const json = await response.json();
      console.log("show classification:",json);
      // Display json response to Form tags
      document.getElementById("land_classification_name").value = json.land_classification_name;
      document.getElementById("assessment_level").value = json.assessment_level;
      document.getElementById("market_value").value = json.market_value;
  
      // // Store id to a variable; id will be utilized for update
      // for_update_id = json.id;
  
      // // Change Button Description
      // document.querySelector("#form_owners button[type='submit']").innerHTML = "Update Info";
  
      // // Show Modal Form
      // document.getElementById("modal_show").click();
      successNotification("Successfully displayed Information", 5);
    } 
    // Get response if 400+ or 500+
    else {
      errorNotification("Unable to show!", 5);
    }
  };

// Update Functionality
const editAction = async (e) => {
    
    // Get Id from data Id attribute within the btn_delete anchor tag
    const id = e.target.getAttribute("data-id");

    // Show Functionality Function Call
    showData(id);

    // Show Modal Form
    // document.getElementById("modal_show").click();
}

// Page Functionality
const pageAction = async (e) => {
    // Get url from data-url attribute within the btn_pagination anchor tag
    const url = e.target.getAttribute("data-url");
  
    // Refresh card list
    getData(url);
  }

async function getData(url = "", keyword = "") {
  // Add Loading if pagination or search is used; Remove if its not needed
  if (url != "" || keyword != "") {
    document.getElementById("get_data").innerHTML = 
    `<div class="col-sm-12 d-flex justify-content-center align-items-center">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <b class="ms-2">Loading Data...</b>
    </div>`;
  }

//   document.addEventListener("DOMContentLoaded", () => {
//   console.log("DOMContentLoaded event fired");
//   const viewButtons = document.querySelectorAll("#btn_view");
//   console.log(`Found ${viewButtons.length} view buttons`);
//   viewButtons.forEach((element) => {
//     element.addEventListener("click", (e) => {
//       e.preventDefault();
//       alert("View Property button clicked!");
//       viewAction(e);
//     });
//   });
// });

  // To cater pagination and search feature
  let queryParams = "?" + 
  (url != "" ? new URL(url).searchParams + "&" : "") + //Remove this line if not using pagination
  (keyword != "" ? "search=" + keyword : "");

  // Get Property Owner API Endpoint; Caters search
  const response = await fetch(
    backendURL + "/api/tax" + queryParams,
    {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
        "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
      },
    }
  );


// async function getData() {
//   // Get Owner API Endpoint
//   const response = await fetch(
//     backendURL + "/api/owner",
//     {
//       headers: {
//         Accept: "application/json",
//         Authorization: "Bearer " + localStorage.getItem("token"),
//       },
//     }
//   );

  // Get response if 200-299 status code
  if (response.ok) {
    const json = await response.json();

    // Get Each Json Elements and merge with HTML element and put it into a container 
    let container = "";
    // Now caters pagination; You can use "json.data" if using pagination or "json" only if no pagination
    
    if (json.data && json.data.length > 0) {

      container = `<div class="table-responsive">
      <table class="table table-bordered mt-3">
      <thead class="header-row">
        <tr>
          <th>PIN</th>
          <th>Address</th>
          <th>Kind of Property</th>
          <th>Land Classification</th>
          <th colspan="2">Action</th>
        </tr>
      </thead>
      <tbody>`;
    // Now caters pagination; You can use "json.data" if using pagination or "json" only if no pagination
    json.data.forEach((element) => {
      const date = new Date(element.created_at).toLocaleString();

      container += `
      <tr data-id="${element.id}">
      <td>${element.PIN}</td>
      <td>${element.complete_address}</td>
      <td>${element.kind_property}</td>
      <td>${element.land_classification_name}</td>
      <td>
          <div class="text-center">
            <button id="btn_edit" data-id="${element.id}">
            select
            </button>
            
          </div>
      </td>
  </tr>
  </div>`;
    });

    container += `</tbody></table>`;

  }else {
      container = `<p class="text-center mt-4">No results found.</p>`;
    }

    // Use the container to display the fetch data
    document.getElementById("get_data").innerHTML = container;

    // Assign click event on Edit Btns
    document.querySelectorAll("#btn_edit").forEach((element) => {
      element.addEventListener("click", editAction);
    });

    // Assign click event on Delete Btns
    document.querySelectorAll("#btn_delete").forEach((element) => {
      element.addEventListener("click", deleteAction);
    });

    // Assign click event on Delete Btns
    document.querySelectorAll("#btn_view").forEach((element) => {
      element.addEventListener("click", viewAction);
    });

    // Get Each Json Elements and merge with Html elements and put it into a container
    let pagination = "";
    // Now caters pagination; Remove below if no pagination 
    json.links.forEach((element) => {
      pagination += `<li class="mt-5 page-item">
                    <a class="page-link
                    ${element.url == null ? " disabled" : ""}
                    ${element.active ? " active" : ""}
                    " href="#" id="btn_paginate" data-url="${element.url}">
                      ${element.label}
                    </a>
                    </li>`;
    });
    // Use the container to display the fetch data
    document.getElementById("get_pagination").innerHTML = pagination;

    // Assign  click event on Page Btns
    document.querySelectorAll("#btn_paginate").forEach((element) => {
      element.addEventListener("click", pageAction);
    });
  }

  // Get response if 400+ or 500+ status code
  else {
    errorNotification("HTTP-Error: " + response.status);
  }
}

// Search Form
const form_search = document.getElementById("form_search");
form_search.onsubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(form_search);

  getData("", formData.get("search"));
};

//Store and Update Functionality Combined
// Submit Form Functionality; This is for create and update 
const form_owners = document.getElementById("form_owners");

form_owners.onsubmit = async (e) => {
  e.preventDefault();

  // Disable button
  document.querySelector("#form_owners button[type = 'submit']").disabled = true;
  document.querySelector("#form_owners button[type = 'submit']").innerHTML = 
  `<div class="col-sm-12 d-flex justify-content-center align-items-center">
      <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
      </div>
      <b class="ms-2">Loading...</b>
  </div>`;

  //   Get values of form (input, textarea, select) put it as form-data
  const formData = new FormData(form_owners);

  // Check Key/value pairs of form data; Uncomment to debug
  // for (let [name, value] of formData) {
  //   //key1 = value1, then key2 = value2
  //   // Use for checking if the store property owner is working
  //   console.log(`${name} = ${value}`); 
  // }

  let response;
  // Check if for_update_id is empty; If it is empty then it's create, else it's update
  if (for_update_id == "") {

  // const id = document.querySelector('#form_owners input[type="hidden"]').value;
  // const forUpdate = id.length > 0 ? true : false;

  //   fetch API property owner store endpoint
  response = await fetch(
    backendURL + "/api/owner",
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

  // For Update
  else {
    // Add Method Spoofing to cater Image Upload; Cause you are using FormData; Uncomment if necessary
    // formData.append("_method", "PUT");

    //   fetch API property owner update endpoint
    response = await fetch(
      backendURL + "/api/owner/" + for_update_id,
      {
        method: "PUT", //Change to POST if with Image Upload
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
        },
        // Uncomment body below; If with Image Upload
        // body: formData,
        // Comment body below; if with Image Upload
        body: new URLSearchParams(formData),
      }
    );
  }

  // Check Key/value pairs of form data, un comment to debug
  // for (let [name, value] of formData) {
  //   //key1 = value1, then key2 = value2
  //   // Use for checking if the store property owner is working
  //   console.log(`${name} = ${value}`); 
  // }

  // const id = document.querySelector('#form_owners input[type="hidden"]').value;
  // const forUpdate = id.length > 0 ? true : false;

  // Get response if 200-299 status code
  if (response.ok) {
    // uncomment the two code lines below for debugging purpose 
    // const json = await response.json();
    // console.log(json);

    // Reset Form
    form_owners.reset();

    // // Refresh the page
    // location.reload(10); 

    successNotification("Successfully" + (for_update_id == "" ? " created":" updated") + " property owner.", 10);

    // Close Modal
    document.getElementById("modal_close").click();

    // Reload Page
    getData();

    // // Refresh the page
    // location.reload(10); 
    
  } 
  // Get response if 422 status code
  else if (response.status == 422) {
    const json = await response.json();

    // Close Modal
    document.getElementById("modal_close").click();


    errorNotification(json.message, 10);
  }
  // Always reset for_update_id to empty string
  for_update_id = "";

  document.querySelector("#form_owners button[type='submit']").disabled = false;
  document.querySelector("#form_owners button[type='submit']").innerHTML = "Submit";
};

// const viewAction = async (e) => {
//     e.preventDefault();

//     // Get property_owner_id from data-id attribute within the btn_view anchor tag
//     const propertyOwnerId = e.target.getAttribute("data-id");

//     // Set propertyOwnerId in local storage
//     localStorage.setItem("propertyOwnerId", propertyOwnerId);

//     // Redirect to the new page
//     window.location.href = "property.html";
// };




// Delete Functionality
const deleteAction = async (e) => {

  // Get Id from data Id attribute within the btn_delete anchor tag
  const id = e.target.getAttribute("data-id");

  // Background red the card that you want to delete
  document.querySelector(`tr[data-id="${id}"]`).style.backgroundColor =
    "tomato";

    // Use JS confirm to ask for confirmation; You can use bootstrap modal instead of this
    if (confirm("Are you sure you want to delete?")) {

    //   fetch API property owner delete endpoint
    const response = await fetch(
      backendURL + "/api/owner/" + id, 
      {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
        "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
      },
    });

    // Get response if 200-299 status code
    if (response.ok) {

      // Uncomment for debugging purpose
      // const json = await response.json();
      // console.log(json);

      successNotification("Successfully deleted property owner", 10);

      // Remove the card from the list 
      document.querySelector(`tr[data-id="${id}"]`).remove();

    } 
    
    // Get response if 400+ or 500+
    else {
      errorNotification("Unable to delete!", 10);

      // Background white the card if unable to delete
      document.querySelector(`tr[data-id="${id}"]`).style.backgroundColor =
      "white"; 
    } 
  }
};

// Storage of Id of chosen data to update
// let for_update_id = "";


export {getData};