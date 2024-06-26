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

// Land Classification Name
document.getElementById("land_classification_name").addEventListener("change", function() {
  var classification = this.value;
  var assessment_level = document.getElementById("assessment_level");

  switch(classification) {
      case "Residential":
      case "Timberland":
          assessment_level.value = 20;
          break;
      case "Agricultural":
          assessment_level.value = 40;
          break;
      case "Commercial":
      case "Industrial":
      case "Mineral":
          assessment_level.value = 50;
          break;
      default:
          assessment_level.value = "";
  }
});

// Area Type
document.getElementById("area_type").addEventListener("change", function() {
  var area_type = this.value;
  var basic_property_tax = document.getElementById("basic_property_tax");

  switch(area_type) {
      case "Province":
          basic_property_tax.value = 1;
          break;
      case "City":
          basic_property_tax.value = 2;
          break;
      default:
          basic_property_tax.value = "";
  }
});

// fair market value conversion
// document.addEventListener('DOMContentLoaded', function() {
//   var fairMarketValueInput = document.getElementById('fair_market_value');

//   fairMarketValueInput.addEventListener('input', function() {
//       // Get the input value and remove commas
//       var inputValue = fairMarketValueInput.value.replace(/,/g, '');

//       // Parse the input value into an integer
//       var integerValue = parseInt(inputValue, 10);

//       // Update the input value with the formatted integer
//       fairMarketValueInput.value = integerValue.toLocaleString();
//   });
// });


// const form_declaration = document.getElementById("form_declaration");

// form_declaration.onsubmit = async (e) => {
//   e.preventDefault();

//   // Disable Button
//   const submitButton = document.querySelector("#form_declaration button[type='submit']");
//   submitButton.disabled = true;
//   submitButton.innerHTML = `<div class="d-flex justify-content-center align-items-center"> <div class="spinner-border me-2" role="status"></div><span>Loading...</span> </div>`;

//   try {
//     // Get Values of Form (input, textarea, select) set it as form-data
//     const formData = new FormData(form_declaration);

//     // uncomment to debug
//     console.log([...formData.entries()]);

//     // Fetch API User Item Store Endpoint for /api/classification
//     const responseClassification = await fetch(backendURL + "/api/classification", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         Authorization: "Bearer " + localStorage.getItem("token"),
//         "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
//       },
//       body: formData,
//     });

//     if (!responseClassification.ok) {
//       throw new Error(`HTTP error! Status: ${responseClassification.status}`);
//     }

//     // Fetch API User Item Store Endpoint for /api/tax
//     const responseTax = await fetch(backendURL + "/api/tax", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         Authorization: "Bearer " + localStorage.getItem("token"),
//         "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
//       },
//       body: formData,
//     });

//     if (!responseTax.ok) {
//       throw new Error(`HTTP error! Status: ${responseTax.status}`);
//     }

//     // Reset Form
//     form_declaration.reset();

//     // Handle success
//     successNotification("Successfully saved information", 10);

//     // Reload Page
//     // getData();
//   } 
//   catch (error) {
//     console.error('Error:', error);

//     // Handle error
//     errorNotification("Failed to save information", 10);
//   } 
//   finally {
//     // Enable the submit button after the request is complete
//     submitButton.disabled = false;
//     submitButton.innerHTML = "Submit";
//   }
// };

const form_declaration = document.getElementById("form_declaration");

form_declaration.onsubmit = async (e) => {
  e.preventDefault();

  // Disable Button
  const submitButton = document.querySelector("#form_declaration button[type='submit']");
  submitButton.disabled = true;
  submitButton.innerHTML = `<div class="d-flex justify-content-center align-items-center"> <div class="spinner-border me-2" role="status"></div><span>Loading...</span> </div>`;

  // try {
    // Get Values of Form (input, textarea, select) set it as form-data
    const formData = new FormData(form_declaration);

    // Calculate assessed value
    const fairMarketValue = parseFloat(formData.get('fair_market_value'));
    const assessmentLevel = parseFloat(formData.get('assessment_level')) / 100; // Convert to decimal
    const assessedValue = fairMarketValue * assessmentLevel;

    // Calculate real property tax
    const basicPropertyTax = parseFloat(formData.get('basic_property_tax')) / 100;
    const specialEducationFund = parseFloat(formData.get('special_education_fund')) / 100;
    const realPropertyTax = assessedValue * (basicPropertyTax + specialEducationFund);

    // Display assessed value and real property tax in console
    // console.log("Assessed Value: ", assessedValue);
    // console.log("Real Property Tax: ", realPropertyTax);

    // Format assessed value and real property tax with commas and .00
    const formattedAssessedValue = assessedValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const formattedRealPropertyTax = realPropertyTax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });


    // Display assessed value and real property tax in HTML
    document.getElementById('assessed_value_output').innerText = `Assessed Value: ${formattedAssessedValue}`;
    document.getElementById('real_property_tax_output').innerText = `Real Property Tax: ${formattedRealPropertyTax}`;

    // Fetch API User Item Store Endpoint for /api/classification
  //   const responseClassification = await fetch(backendURL + "/api/classificatio", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //       "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
  //     },
  //     body: formData,
  //   });

  //   if (!responseClassification.ok) {
  //     throw new Error(`HTTP error! Status: ${responseClassification.status}`);
  //   }

  //   // Fetch API User Item Store Endpoint for /api/tax
  //   const responseTax = await fetch(backendURL + "/api/ta", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //       "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
  //     },
  //     body: formData,
  //   });

  //   if (!responseTax.ok) {
  //     throw new Error(`HTTP error! Status: ${responseTax.status}`);
  //   }

  //   // Reset Form
  //   // form_declaration.reset();

  //   // Handle success
  //   successNotification("Successfully saved information", 10);

  //   // Reload Page
  //   // getData();
  // } catch (error) {
  //   console.error('Error:', error);

  //   // Handle error
  //   errorNotification("Failed to save information", 10);
  // } finally {
    // Enable the submit button after the request is complete
    submitButton.disabled = false;
    submitButton.innerHTML = "Calculate";
  };

  