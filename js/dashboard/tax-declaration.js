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
  // Send Email FUnctionality
  // Function to open the modal
  document.addEventListener("DOMContentLoaded", function() {
    // Get the button element
    var button = document.getElementById('button');
    
    // Get the modal element
    var modal = document.getElementById('emailModal');
  
    // Get the send button and close button inside the modal
    var sendButton = modal.querySelector('.btn-cyan');
    var closeButton = modal.querySelector('.btn-secondary');
  
    // When the button is clicked, open the modal
    button.addEventListener('click', function() {
      modal.style.display = 'block';
    });
  
    // Function to close the modal
    closeButton.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  
    // Function to send email
    sendButton.addEventListener('click', function() {
      var emailInput = modal.querySelector('#emailInput');
      var email = emailInput.value;
      
      // Here you can add code to send the form data via email using an API or server-side scripting
      // For demonstration purposes, let's just log the email to the console
      console.log("Sending form to email:", email);

      successNotification("Successfully sent to email.", 10);
      
      // Close the modal
      modal.style.display = 'none';

      // set the emailInput value to null; Another way of resetting a input value
      // emailInput.value="";

      //reset modal
      form_email.reset();
    });
  });
  
  // Print Form Functionality
  document.addEventListener("DOMContentLoaded", function() {
    var printButton = document.getElementById('print');
  
    printButton.addEventListener('click', function() {
      // Select the form element to print
      var formToPrint = document.getElementById('form_declaration');
  
      // Trigger the browser's print dialog
      window.print();
    });
  });

  // Calculation of assesses value
  document.addEventListener('DOMContentLoaded', function() {
    // Function to calculate the total assessed value
    function calculateTotalAssessedValue() {
        var totalMarketValue = 0;
        var totalAssessedValue = 0;

        // Get all market value and assessed value inputs
        var marketValueInputs = document.querySelectorAll('.market-value-input');
        var assessedValueInputs = document.querySelectorAll('.assessed-value-input');

        // Calculate total market value and total assessed value
        marketValueInputs.forEach(function(input) {
            totalMarketValue += parseFloat(input.value) || 0;
        });

        assessedValueInputs.forEach(function(input) {
            totalAssessedValue += parseFloat(input.value) || 0;
        });

        // Display the total market value
        document.getElementById('total-market-value').value = totalMarketValue.toFixed(2);

        // Display the total assessed value
        document.getElementById('total-assessed-value').value = totalAssessedValue.toFixed(2);

        // Update the total assessed value in words
        document.getElementById('total-assessed-value-words').value = convertToWords(totalAssessedValue.toFixed(2));
    }

    // Add event listeners for market value inputs to calculate assessed value
    var marketValueInputs = document.querySelectorAll('.market-value-input');
    marketValueInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            var index = Array.from(input.parentNode.parentNode.children).indexOf(input.parentNode);
            var marketValue = parseFloat(input.value);
            var assessmentLevel = parseFloat(document.querySelectorAll('.assessment-level-input')[index].value) / 100;
            var assessedValue = marketValue * assessmentLevel;
            document.querySelectorAll('.assessed-value-input')[index].value = assessedValue.toFixed(2);
            calculateTotalAssessedValue();
        });
    });

    // Add event listener for classification input to display assessment level
    var classificationInputs = document.querySelectorAll('.classification-input');
    classificationInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            var index = Array.from(input.parentNode.parentNode.children).indexOf(input.parentNode);
            var assessmentLevelInput = document.querySelectorAll('.assessment-level-input')[index];
            var classificationValue = input.value.trim().toUpperCase();

            switch (classificationValue) {
                case 'RESIDENTIAL':
                case 'TIMBERLAND':
                    assessmentLevelInput.value = 20 + '%';
                    break;
                case 'AGRICULTURAL':
                    assessmentLevelInput.value = 40 + '%';
                    break;
                case 'COMMERCIAL':
                case 'INDUSTRIAL':
                case 'MINERAL':
                    assessmentLevelInput.value = 30 + '%';
                    break;
                default:
                    assessmentLevelInput.value = '';
                    break;
            }
        });
    });

    // Trigger input event for classification inputs to initialize assessment level
    classificationInputs.forEach(function(input) {
        input.dispatchEvent(new Event('input'));
    });

    // Trigger input event for market value inputs to initialize total assessed value
    marketValueInputs.forEach(function(input) {
        input.dispatchEvent(new Event('input'));
    });

    // Function to convert number to words
function convertToWords(number) {
  // Function to convert a number less than 1000 to words
  function convertLessThanOneThousand(number) {
      var words = '';
      var unitsMap = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'];
      var teensMap = ['TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'];
      var tensMap = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];

      var hundreds = Math.floor(number / 100);
      var tens = Math.floor((number % 100) / 10);
      var ones = number % 10;

      if (hundreds > 0) {
          words += unitsMap[hundreds] + ' HUNDRED ';
      }

      if (tens === 1) {
          words += teensMap[ones] || '';
      } else {
          words += tensMap[tens] + ' ' + unitsMap[ones];
      }

      return words.trim();
  }

  var words = '';
  var units = ['', 'THOUSAND', 'MILLION', 'BILLION', 'TRILLION'];
  var num = parseFloat(number);

  // If the number is zero
  if (num === 0) return 'ZERO';

  // Splitting the number into groups of three digits
  var groups = [];
  while (num > 0) {
      groups.push(num % 1000);
      num = Math.floor(num / 1000);
  }

  // Converting each group to words
  for (var i = 0; i < groups.length; i++) {
      if (groups[i] !== 0) {
          var groupWords = convertLessThanOneThousand(groups[i]);
          if (groupWords) {
              words = groupWords + ' ' + units[i] + ' ' + words;
          }
      }
  }

  return words.trim() + ' ' + 'PESOS';
}

});

  
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
  
    try {
      // Get Values of Form (input, textarea, select) set it as form-data
      const formData = new FormData(form_declaration);
  
      // Calculate assessed value
      const fairMarketValue = parseFloat(formData.get('fair_market_value'));
      const assessmentLevel = parseFloat(formData.get('assessment_level')) / 100; // Convert to decimal
      const assessedValue = fairMarketValue * assessmentLevel;
  
      // Calculate real property tax
      const basicPropertyTax = parseFloat(formData.get('basic_property_tax')) * 1000;
      const specialEducationFund = parseFloat(formData.get('special_education_fund')) * 1000;
      const realPropertyTax = basicPropertyTax + specialEducationFund;
  
      // Display assessed value and real property tax in console
      // console.log("Assessed Value: ", assessedValue);
      // console.log("Real Property Tax: ", realPropertyTax);
  
      // Display assessed value and real property tax in HTML
      document.getElementById('assessed_value_output').innerText = `Assessed Value: ${assessedValue}`;
      document.getElementById('real_property_tax_output').innerText = `Real Property Tax: ${realPropertyTax}`;
  
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
      successNotification("Successfully saved information.", 10);
  
      // Reload Page
      // getData();
    } catch (error) {
      console.error('Error:', error);
  
      // Handle error
      errorNotification("Failed to save information", 10);
    } finally {
      // Enable the submit button after the request is complete
      submitButton.disabled = false;
      submitButton.innerHTML = "Calculate Tax";
    }
  };
  