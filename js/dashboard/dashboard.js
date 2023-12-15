// To see errors in console using javascript
"use strict";
import { backendURL } from "../utils/utils.js";

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

        // Redirect Page
        window.location.pathname = "/login.html"
    
      }
    // Get response if 400 or 500 status code
        else {
        const json = await response.json();
    
        alert(json.message);
    
      }
    };
    