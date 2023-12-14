// Backend URL
import { url, successNotification, errorNotification} from "../utils/utils.js";

// Form Register
const form_register = document.getElementById("form_register");

form_register.onsubmit = async (e) => {
  e.preventDefault();

// disable button
  document.querySelector("#form_register button").disabled = true;
  document.querySelector("#form_register button").innerHTML = 
  `<div class="spinner-border me-2" role="status">
  <span class="visually-hidden">Loading...</span>
  </div> <span>Loading...</span>`;

//   Get values of form (input, textarea, select) put it as form-data
  const formData = new FormData(form_register);

//   fetch API user register endpoint
  const response = await fetch(
    url + "/api/user",
    {
      method: 'POST',
      headers: {
        Accept: "application/json",
      },
      body:formData,
    }
  );

// Get response if 200-299 status code
  if (response.ok) {
    const json = await response.json();
    console.log(json);

    document.querySelector(".alert-success").classList.remove('d-none');
    document.querySelector(".alert-success").classList.add('d-block');

    successNotification("Successfully registered account.", 5)

// Get response if 422 status code
    form_register.reset();
  } else if (response.status == 422) {
    const json = await response.json();

    errorNotification(json.message, 5)

  }

// Enable button
  document.querySelector("#form_register button").disabled = false;
//   document.querySelector("#form_register button").innerHTML = "Submit";
document.querySelector("#form_register button").innerHTML = 'Create Account';
};
