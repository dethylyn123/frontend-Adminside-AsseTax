// import router
import {setRouter} from "../router/router.js";

// Set Router
setRouter();

const backendURL = "http://webapp-tax-advisor.test";

// Get Logged User Profile
async function getLoggedUser(){
    // Access User Profile API Endpoint
    const response = await fetch(
      backendURL + "/api/profile/show",
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
  
  // Get response if 200-299 status code
    if (response.ok) {
      const json = await response.json();
  
      document.getElementById("user_logged").innerHTML = 
        json.firstname + "" + json.lastname;
    }
  // Get response if 400 or 500 status code
      else {
      const json = await response.json();
  
      errorNotification(json.message, 10);
  
    }
  };

// Notifications
function successNotification(message, seconds = 0){
    document.querySelector(".alert-success").classList.remove('d-none');
    document.querySelector(".alert-success").classList.add('d-block');
    document.querySelector(".alert-success").innerHTML = message;

    if (seconds != 0) {
        setTimeout(function () {
            document.querySelector(".alert-success").classList.remove('d-block');
            document.querySelector(".alert-success").classList.add('d-none');
        }, seconds * 1000);
    }
}

function errorNotification(message, seconds = 0){
    document.querySelector(".alert-danger").classList.remove('d-none');
    document.querySelector(".alert-danger").classList.add('d-block');
    document.querySelector(".alert-danger").innerHTML = message;

    if (seconds != 0) {
        setTimeout(function () {
            document.querySelector(".alert-success").classList.remove('d-block');
            document.querySelector(".alert-success").classList.add('d-none');
        }, seconds * 1000);
    }
}

export { backendURL, successNotification, errorNotification, getLoggedUser};