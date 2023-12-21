// To see errors in console using javascript
// "use strict";
import { backendURL,successNotification, errorNotification, getLoggedUser} from "../utils/utils.js";

// calling function - important to execute the code inside the function
getLoggedUser();

// Logout Btn
const btn_logout = document.getElementById("btn_logout");

btn_logout.onclick = async () => {

  // Access Logout API Endpoint
  const response = await fetch(
    backendURL + "/api/logout",
    {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );
  
  // Get response if 200-299 status code
  if (response.ok) {
    // Clear Tokens
    localStorage.clear();

    successNotification("Logout Successfully.");

    // Redirect Page
    window.location.pathname = "/login.html";

  }     
  // Get response if 400 or 500 status code
  else {
  const json = await response.json();

  errorNotification(json.message, 10);
  }
};