import {
    backendURL,
    showNavAdminPages,
    successNotification,
    errorNotification,
    getLoggedUser,
  } from "../utils/utils.js";
  
  // Get Logged User Info
  getLoggedUser();
  
  // Get Admin Pages
  showNavAdminPages();
  
  // Retrieve propertyOwnerId from local storage
  const propertyOwnerId = localStorage.getItem("propertyOwnerId");

  // Check if propertyOwnerId is not null or undefined before using it
  if (propertyOwnerId) {
      // Do something with propertyOwnerId
      console.log("Property Owner ID:", propertyOwnerId);
  } else {
      console.error("Property Owner ID not found in local storage.");
  }

  // Sets value to the input field with id "user_id"
  if (document.getElementById("property_owner_id")) {
    document.getElementById("property_owner_id").value = propertyOwnerId;
  }

  // Get All Data
  getData();
  
  async function getData(url = "", keyword = "") {
    // Add Loading if pagination or search is used; Remove if its not needed
    if (url != "" || keyword != "") {
      document.getElementById(
        "get_data"
      ).innerHTML = `<div class="col-sm-12 d-flex justify-content-center align-items-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <b class="ms-2">Loading Data...</b>
                    </div>`;
    }
  
    // To cater pagination and search feature
    let queryParams =
      "?" +
      (url != "" ? new URL(url).searchParams + "&" : "") + // Remove this line if not using pagination
      (keyword != "" ? "keyword=" + keyword : "");
  
    // Get Carousel API Endpoint; Caters search
    const response = await fetch(backendURL + "/api/owner/property/" + propertyOwnerId + queryParams, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
        "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
      },
    });
  
    // Get response if 200-299 status code
    if (response.ok) {
      try {
      const json = await response.json();
      console.log("json response:",json);

     // Check if json.property.data is an array before iterating
     if (Array.isArray(json.property.data)) {
      let container = "";

      if (json.property.data.length > 0) {
        json.property.data.forEach((element) => {
        const date = new Date(element.created_at).toLocaleString();

  
        container += `<div class="col-sm-6">
        <div class="card w-100 mt-3" data-id="${element.PIN}">
            <div class="row">
                
                <div class="col-sm-12">
                    <div class="card-body">
                        <div class="dropdown float-end">
                            <button class="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                            <ul class="dropdown-menu">
                                <li>
                                    <a class="dropdown-item text-success border-0" href="#" id="btn_view" data-id="${element.PIN}"><i class="bi bi-eye-fill"></i> View Property Classification</a>
                                </li>
                                ${localStorage.getItem("role") === "Admin" ? `
                                                <li>
                                                    <a class="dropdown-item text-success" href="#" id="btn_edit" data-id="${element.PIN}"><i class="fa-solid fa-pen-to-square"></i> Edit</a>
                                                </li>
                                                <li>
                                                    <a class="dropdown-item text-danger" href="#" id="btn_delete" data-id="${element.PIN}"><i class="fa-solid fa-trash"></i> Delete</a>
                                                </li>` : ''}
                            </ul>
                        </div>
                        <div class="pt-5">
                            <h6 class="card-text"><b>PIN:</b> ${element.PIN}</h6>
                            <h6 class="card-text"><b>Property:</b> ${element.kind_property}</h6>
                            <h6 class="card-text"><b>Property Address:</b> ${element.complete_address}</h6>
                            <br>
                            <h6 class="card-text"><b>Boundaries</b></h6>
                            <small class="card-text">North:</b> ${element.north}</small><br/>
                            <small class="card-text">South:</b> ${element.south}</small><br/>
                            <small class="card-text">East:</b> ${element.east}</small><br/>
                            <small class="card-text">West:</b> ${element.west}</small>
                        </div>
                        <h6 class="card-subtitle text-body-secondary mt-5 pt-5">
                            <small><b>Date created:</b> ${date}</small>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
      });

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

    } else {
      // Display a message when no results are found
      document.getElementById("get_data").innerHTML = `<div class="text-center mt-4">
          <p>No results found.</p>
        </div>`;
    }
  
      // Check if json.property.links are defined before iterating
      if (json.property.links) {
        let pagination = "";
        json.property.links.forEach((element) => {
          pagination += `<li class="page-item">
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
  
      // Assign click event on Page Btns
      document.querySelectorAll("#btn_paginate").forEach((element) => {
        element.addEventListener("click", pageAction);
      });
    } else {
      console.error("Pagination links not found in the API response.");
    }
  } else {
    console.error("Data is not an array in the API response.");
  }
} catch (error) {
  console.error("Error parsing JSON in the API response:", error);
}
} else {
errorNotification("HTTP-Error: " + response.status);
}
}
  
  // Search Form
  const form_search = document.getElementById("form_search");
  form_search.onsubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(form_search);
  
    getData("", formData.get("keyword"));
  };
  
  // Submit Form Functionality; This is for Create and Update
  const form_property = document.getElementById("form_property");
  
  form_property.onsubmit = async (e) => {
    e.preventDefault();
  
    // Disable Button
    document.querySelector("#form_property button[type='submit']").disabled = true;
    document.querySelector(
      "#form_property button[type='submit']"
    ).innerHTML = `<div class="spinner-border me-2" role="status">
                        </div>
                        <span>Loading...</span>`;
  
    // Get Values of Form (input, textarea, select) set it as form-data
    const formData = new FormData(form_property);
  
    // Check key/value pairs of FormData; Uncomment to debug
    // for (let [name, value] of formData) {
    //   console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
    // }
  
    let response;
    // Check if for_update_id is empty, if empty then it's create, else it's update
    if (for_update_id == "") {
      // Fetch API User Item Store Endpoint
      response = await fetch(backendURL + "/api/property", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
        },
        body: formData,
      });
    }
    // for Update
    else {
      // Add Method Spoofing to cater Image upload coz you are using FormData; Comment if no Image upload
      // formData.append("_method", "PUT");
      // Fetch API User Item Update Endpoint
      response = await fetch(backendURL + "/api/property/" + for_update_id, {
        method: "PUT", // Change to PUT/PATCH if no Image Upload
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
        },
        // Comment body below; if with Image Upload; form-data equivalent
        // body: formData,
        // Uncomment body below; if no Image Upload; form-urlencoded equivalent
        body: new URLSearchParams(formData)
      });
    }
  
    // Get response if 200-299 status code
    if (response.ok) {
      // Uncomment for debugging purpose
      // const json = await response.json();
      // console.log(json);
  
      // Reset Form
      form_property.reset();
  
      successNotification(
        "Successfully " +
          (for_update_id == "" ? "created" : "updated") +
          " property.",
        10
      );
  
      // Close Modal Form
      document.getElementById("modal_close").click();
  
      // Reload Page
      getData();
    }
    // Get response if 422 status code
    else if (response.status == 422) {
      const json = await response.json();
  
      // Close Modal Form
      document.getElementById("modal_close").click();
  
      errorNotification(json.message, 10);
    }
  
    // Always reset for_update_id to empty string
    for_update_id = "";
  
    document.querySelector("#form_property button[type='submit']").disabled = false;
    document.querySelector("#form_property button[type='submit']").innerHTML =
      "Submit";
  };

  const viewAction = async (e) => {
    e.preventDefault();

    // Get property_owner_id from data-id attribute within the btn_view anchor tag
    const propertyId = e.target.getAttribute("data-id");

    // Set propertyOwnerId in local storage
    localStorage.setItem("propertyId", propertyId);

    // Redirect to the new page
    window.location.href = "land_classification.html";
};
  
  // Delete Functionality
  const deleteAction = async (e) => {

      // Get Id from data-id attribute within the btn_delete anchor tag
      const id = e.target.getAttribute("data-id");
  
      // Background red the card that you want to delete
      document.querySelector(`.card[data-id="${id}"]`).style.border =
        "lightRed";

      // Use JS Confirm to ask for confirmation; You can use bootstrap modal instead of this
      if (confirm("Are you sure you want to delete?")) {
  
      // Fetch API User Item Delete Endpoint
      const response = await fetch(backendURL + "/api/property/" + id, {
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
  
        successNotification("Successfully deleted property.", 10);
  
        // Remove the Card from the list
        document.querySelector(`.card[data-id="${id}"]`).remove();
      }
      // Get response if 400+ or 500+
      else {
        errorNotification("Unable to delete!", 10);
  
        // Background white the card if unable to delete
        document.querySelector(`.card[data-id="${id}"]`).style.border =
          "white";
      }
    }
  };
  
  // Update Functionality
  const editAction = async (e) => {
    // Get Id from data-id attribute within the btn_edit anchor tag
    const id = e.target.getAttribute("data-id");
  
    // Show Functionality function call
    showData(id);
  
    // Show Modal Form
    document.getElementById("modal_show").click();
  };
  
  // Storage of Id of chosen data to update
  let for_update_id = "";
  
  // Show Functionality
  const showData = async (id) => {
    // Background yellow the card that you want to show
    document.querySelector(`.card[data-id="${id}"]`).style.border =
      "blue";
  
    // Fetch API User Item Show Endpoint
    const response = await fetch(backendURL + "/api/property/" + id, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
        "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
      },
    });
  
    // Get response if 200-299 status code
    if (response.ok) {
      const json = await response.json();
      // console.log(json);
  
      // Store id to a variable; id will be utilize for update
      for_update_id = json.PIN;
  
      // Display json response to Form tags; make sure to set id attrbute on tags (input, textarea, select)
      document.getElementById("PIN").value = json.PIN;
      document.getElementById("kind_property").value = json.kind_property;
      document.getElementById("complete_address").value = json.complete_address;
      document.getElementById("north").value = json.north;
      document.getElementById("south").value = json.south;
      document.getElementById("east").value = json.east;
      document.getElementById("west").value = json.west;
  
      // Change Button Text using textContent; either innerHTML or textContent is fine here
      document.querySelector("#form_property button[type='submit']").innerHTML =
        "Update Info";
    }
    // Get response if 400+ or 500+
    else {
      errorNotification("Unable to show!", 10);
  
      // Background white the card if unable to show
      document.querySelector(`.card[data-id="${id}"]`).style.border =
        "white";
    }
  };
  
  // Page Functionality
  const pageAction = async (e) => {
    // Get url from data-url attrbute within the btn_paginate anchor tag
    const url = e.target.getAttribute("data-url");
  
    // Refresh card list
    getData(url);
  };
  