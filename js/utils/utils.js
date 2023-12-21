// import router
import {setRouter} from "../router/router.js";

// Set Router
setRouter();

// Ngrok; prevent brower to show warning
// fetch(backendURL, {
//   method: "get",
//   headers: new Headers ({
//       "ngrok-skip-browser-warning": "69420",
// }),
// })
// .then((response) => response.json())
// .then((data) => console.log(data))
// .catch((err) => console.log(err));

const backendURL = "http://webapp-tax-advisor.test";
//Old URL from laravel
//http://webapp-tax-advisor.test

// Get Logged User Profile Name
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
  
      document.getElementById("user_logged_name").innerHTML = 
        json.firstname + "" + json.lastname;
        document.getElementById("user_logged_image").src = backendURL + "/" + json.image;

      // Sets value to the input field with id "user_id"
      if (document.getElementById("user_id")) {
        document.getElementById("user_id").value = json.id;
      }
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