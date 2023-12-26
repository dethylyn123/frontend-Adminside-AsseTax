import {
  backendURL,
  showNavAdminPages,
  successNotification,
  errorNotification,
  getLoggedUser,
  // getData,
} from "../utils/utils.js";

// Get Logged User Info
getLoggedUser();

// Get Admin Pages
showNavAdminPages();

// Get All Data
// getData();

const form_declaration = document.getElementById("form_declaration");

form_declaration.onsubmit = async (e) => {
  e.preventDefault();

  // Disable Button
  const submitButton = document.querySelector("#form_declaration button[type='submit']");
  submitButton.disabled = true;
  submitButton.innerHTML = `<div class="d-flex justify-content-center align-items-center"> <div class="spinner-border me-2" role="status"></div><span>Loading...</span> </div>`;

  try {
    // Get Values of Form (input, textarea, select) set it as form-data
    const formData = new FormData(form_declaration);

    // uncomment to debug
    console.log([...formData.entries()]);

    // Fetch API User Item Store Endpoint for /api/classification
    const responseClassification = await fetch(backendURL + "/api/classification", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
        "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
      },
      body: formData,
    });

    if (!responseClassification.ok) {
      throw new Error(`HTTP error! Status: ${responseClassification.status}`);
    }

    // Fetch API User Item Store Endpoint for /api/tax
    const responseTax = await fetch(backendURL + "/api/tax", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
        "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
      },
      body: formData,
    });

    if (!responseTax.ok) {
      throw new Error(`HTTP error! Status: ${responseTax.status}`);
    }

    // Reset Form
    form_declaration.reset();

    // Handle success
    successNotification("Successfully saved information", 10);

    // Reload Page
    // getData();
  } 
  catch (error) {
    console.error('Error:', error);

    // Handle error
    errorNotification("Failed to save information", 10);
  } 
  finally {
    // Enable the submit button after the request is complete
    submitButton.disabled = false;
    submitButton.innerHTML = "Submit";
  }
};

// Function to calculate real property tax - not functional
function calculatePropertyTax() {
    // Get input values
    const landClassificationName = document.getElementById('land_classification_name').value;
    const fairMarketValue = parseFloat(document.getElementById('fair_market_value').value);
    const assessmentLevel = parseFloat(document.getElementById('assessment_level').value);
    const areaType = document.getElementById('area_type').value;
    const basicPropertyTax = parseFloat(document.getElementById('basic_property_tax').value);
    const specialEducationFund = parseFloat(document.getElementById('special_education_fund').value);

    // Validate inputs
    if (landClassificationName === '' || isNaN(fairMarketValue) || isNaN(assessmentLevel) || areaType === 'Choose...' || isNaN(basicPropertyTax) || isNaN(specialEducationFund)) {
        alert('Please enter valid values for all fields.');
        return;
    }

    // Convert assessment level to decimal
    const assessmentLevelDecimal = assessmentLevel / 100;

    // Calculate assessed value
    const assessedValue = fairMarketValue * assessmentLevelDecimal;

    // Calculate real property tax
    const realPropertyTax = (basicPropertyTax * 1000) + (specialEducationFund * 1000);

    // Display results (you can customize how you want to display the results)
    alert(`Land Classification Name: ${landClassificationName}\nAssessed Value: ${assessedValue.toFixed(2)}\nReal Property Tax: ${realPropertyTax.toFixed(2)}`);
}

// Add event listener to the form for the 'submit' event
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way
    calculatePropertyTax(); // Call the calculatePropertyTax function
});