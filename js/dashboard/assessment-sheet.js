document.addEventListener("DOMContentLoaded", function () {
  // DOM Element Selectors
  const classificationSelects = document.querySelectorAll(
    'select[name="classification"]'
  );
  const subClassificationSelects = document.querySelectorAll(
    'select[name="sub-classification"]'
  );
  const areaInputs = document.querySelectorAll('input[name="area"]');
  const unitValueInputs = document.querySelectorAll(
    'input[name="unit-value-input"]'
  );
  const baseMarketValueInputs = document.querySelectorAll(
    'input[name="base-market-value"]'
  );
  const totalBaseMarketValueOutputs = document.querySelectorAll(
    ".total-base-market-value"
  );
  const actualUseInputs = document.querySelectorAll(".actual-use");

  const adjustmentMarketValueInputs = document.querySelectorAll(
    ".adjustment-market-value"
  );
  const assessmentLevelInputs = document.querySelectorAll(".assessment-level");

  // Function to initialize classification dropdowns
  function initializeClassificationDropdowns() {
    classificationSelects.forEach((classificationSelect) => {
      classificationSelect.addEventListener("change", function () {
        const selectedClassification = this.value;
        const parentRow = this.closest("tr");
        const subClassificationSelect = parentRow.querySelector(
          'select[name="sub-classification"]'
        );
        // Hide all options first
        subClassificationSelect.querySelectorAll("option").forEach((option) => {
          option.style.display = "none";
        });
        // Show sub-classifications based on the selected classification
        switch (selectedClassification) {
          case "Residential":
            showSubClassifications(subClassificationSelect, [
              "R-1",
              "R-2",
              "R-3",
              "R-4",
            ]);
            break;
          case "Commercial":
            showSubClassifications(subClassificationSelect, [
              "C-1",
              "C-2",
              "C-3",
              "C-4",
            ]);
            break;
          case "Timberland":
            showSubClassifications(subClassificationSelect, ["PT"]);
            break;
          case "Industrial":
            showSubClassifications(subClassificationSelect, [
              "I-1",
              "I-2",
              "I-3",
              "I-4",
            ]);
            break;
          case "Agricultural":
            showSubClassifications(subClassificationSelect, [
              "UPLR-1",
              "UPLR-2",
              "UPLR-3",
              "UPLR-4",
              "COCO-1",
              "COCO-2",
              "COCO-3",
              "COCO-4",
              "CORN-1",
              "CORN-2",
              "CORN-3",
              "CORN-4",
              "COFE-1",
              "COFE-2",
              "COFE-3",
              "COFE-4",
              "ABA-1",
              "ABA-2",
              "ABA-3",
              "ABA-4",
              "OR-1",
              "OR-2",
              "OR-3",
              "OR-4",
              "BANA-1",
              "BANA-2",
              "BANA-3",
              "BANA-4",
              "CRC-1",
              "CRC-2",
              "CRC-3",
              "CRC-4",
              "CACAO-1",
              "CACAO-2",
              "CACAO-3",
              "CACAO-4",
              "RUB-1",
              "RUB-2",
              "RUB-3",
              "RUB-4",
            ]);
            break;
          default:
            // If other classifications are selected, show all options
            subClassificationSelect
              .querySelectorAll("option")
              .forEach((option) => {
                option.style.display = "block";
              });
            break;
        }
        // Reset selected sub-classification
        subClassificationSelect.value = "";
      });
    });
  }

  // Function to show sub-classifications based on the selected classification
  function showSubClassifications(selectElement, subClassifications) {
    subClassifications.forEach((subClassification) => {
      const option = selectElement.querySelector(
        `option[value="${subClassification}"]`
      );
      if (option) {
        option.style.display = "block";
      }
    });
  }

  // Function to initialize sub-classification dropdowns
  function initializeSubClassificationDropdowns() {
    subClassificationSelects.forEach((subClassificationSelect) => {
      subClassificationSelect.addEventListener("change", function () {
        const selectedSubClassification = this.value;
        const unitValueInput = this.closest("tr").querySelector(
          'input[name="unit-value-input"]'
        );
        // Set unit value based on the selected sub-classification
        switch (selectedSubClassification) {
          case "R-1":
            unitValueInput.value = "400";
            break;
          case "R-2":
            unitValueInput.value = "300";
            break;
          case "R-3":
            unitValueInput.value = "200";
            break;
          case "R-4":
            unitValueInput.value = "100";
            break;
          case "C-1":
            unitValueInput.value = "470"; // Set unit value for C-1
            break;
          case "C-2":
            unitValueInput.value = "410"; // Set unit value for C-2
            break;
          case "C-3":
            unitValueInput.value = "350"; // Set unit value for C-3
            break;
          case "C-4":
            unitValueInput.value = "310"; // Set unit value for C-4
            break;
          case "I-1":
            unitValueInput.value = "550"; // Set unit value for C-1
            break;
          case "I-2":
            unitValueInput.value = "410"; // Set unit value for C-2
            break;
          case "I-3":
            unitValueInput.value = "310"; // Set unit value for C-3
            break;
          case "I-4":
            unitValueInput.value = "230"; // Set unit value for C-4
            break;
          case "UPLR-1":
            unitValueInput.value = "36,300";
          case "UPLR-2":
            unitValueInput.value = "29,100";
            break;
          case "UPLR-3":
            unitValueInput.value = "21,800";
            break;
          case "UPLR-4":
            unitValueInput.value = "14,500";
            break;
          case "COCO-1":
            unitValueInput.value = "57,200";
          case "COCO-2":
            unitValueInput.value = "45,800";
            break;
          case "COCO-3":
            unitValueInput.value = "34,300";
            break;
          case "COCO-4":
            unitValueInput.value = "22,800";
            break;
          case "CORN-1":
            unitValueInput.value = "59,600";
          case "CORN-2":
            unitValueInput.value = "47,700";
            break;
          case "CORN-3":
            unitValueInput.value = "35,800";
            break;
          case "CORN-4":
            unitValueInput.value = "23,900";
            break;
          case "COFE-1":
            unitValueInput.value = "72,300";
          case "COFE-2":
            unitValueInput.value = "58,000";
            break;
          case "COFE-3":
            unitValueInput.value = "43,300";
            break;
          case "COFE-4":
            unitValueInput.value = "29,000";
            break;
          case "ABA-1":
            unitValueInput.value = "42,400";
          case "ABA-2":
            unitValueInput.value = "33,900";
            break;
          case "ABA-3":
            unitValueInput.value = "25,400";
            break;
          case "ABA-4":
            unitValueInput.value = "16,900";
            break;
          case "OR-1":
            unitValueInput.value = "53,300";
          case "OR-2":
            unitValueInput.value = "42,600";
            break;
          case "OR-3":
            unitValueInput.value = "32,000";
            break;
          case "OR-4":
            unitValueInput.value = "21,300";
            break;
          case "BANA-1":
            unitValueInput.value = "56,500";
          case "BANA-2":
            unitValueInput.value = "45,200";
            break;
          case "BANA-3":
            unitValueInput.value = "33,900";
            break;
          case "BANA-4":
            unitValueInput.value = "22,600";
            break;
          case "CRC-1":
            unitValueInput.value = "57,100";
          case "CRC-2":
            unitValueInput.value = "45,700";
            break;
          case "CRC-3":
            unitValueInput.value = "34,200";
            break;
          case "CRC-4":
            unitValueInput.value = "22,800";
            break;
          case "CACAO-1":
            unitValueInput.value = "87,700";
          case "CACAO-2":
            unitValueInput.value = "70,100";
            break;
          case "CACAO-3":
            unitValueInput.value = "52,600";
            break;
          case "CACAO-4":
            unitValueInput.value = "35,100";
            break;
          case "RUB-1":
            unitValueInput.value = "85,900";
          case "RUB-2":
            unitValueInput.value = "68,700";
            break;
          case "RUB-3":
            unitValueInput.value = "51,500";
            break;
          case "RUB-4":
            unitValueInput.value = "34,300";
            break;
          case "PT":
            unitValueInput.value = "22,500";
            break;
          default:
            unitValueInput.value = "";
            break;
        }
      });
    });
  }

  // Function to update base market value
  function updateBaseMarketValue() {
    // Handle area and unit value inputs
    function handleInput(input, index) {
      input.addEventListener("input", function () {
        // Get the current value of the area input
        let areaValue = input.value;
        // Remove non-digit characters and add commas to the numeric part
        areaValue = areaValue.replace(/[^\dha\ sqm]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // Update the value of the area input
        input.value = areaValue;
        
        // Parse the area value to float for calculations
        const area = parseFloat(areaValue.replace(/,/g, ''));
        
        const unitValue = parseFloat(unitValueInputs[index].value.replace(/,/g, ''));
        const baseMarketValue = area * unitValue;
        if (!isNaN(baseMarketValue)) {
          baseMarketValueInputs[index].value = baseMarketValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
          baseMarketValueInputs[index].value = "";
        }
        updateTotalBaseMarketValue();
      });
    }

    // Update base market value on input change
    areaInputs.forEach(handleInput);
    unitValueInputs.forEach(handleInput);
  }

  // Function to update total base market value
  function updateTotalBaseMarketValue() {
    let totalBaseMarketValue = 0;
    baseMarketValueInputs.forEach((input) => {
      const valueWithoutCommas = input.value.replace(/,/g, '');
      const value = parseFloat(valueWithoutCommas);
      if (!isNaN(value)) {
        totalBaseMarketValue += value;
      }
    });
    totalBaseMarketValueOutputs.forEach((output) => {
      output.textContent = totalBaseMarketValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });
  }

  // Function to handle actual use inputs
  function handleActualUseInputs() {
    actualUseInputs.forEach((input) => {
      input.addEventListener("change", function () {
        const index = Array.from(input.parentNode.parentNode.children).indexOf(
          input.parentNode
        );
        const assessmentLevelInput = document.querySelectorAll(
          ".assessment-level-input"
        )[index];
        const actualUseValue = input.value.trim().toLowerCase();
        switch (actualUseValue) {
          case "residential":
          case "timberland":
            assessmentLevelInput.value = 20;
            break;
          case "agricultural":
            assessmentLevelInput.value = 40;
            break;
          case "commercial":
          case "industrial":
          case "mineral":
            assessmentLevelInput.value = 50;
            break;
          default:
            assessmentLevelInput.value = "";
            break;
        }
      });
      input.dispatchEvent(new Event("change")); // Trigger change event to initialize assessment level
    });
  }

  function calculateAssessedValue() {
    const assessedValueOutput = document.getElementById("assessed-value-output");
    const totalAssessedValueOutput = document.getElementById("total-assessed-value-output");
  
    function handleInput(input, index) {
      input.addEventListener("input", function () {
        let adjustedValue = input.value.replace(/[^\d.]/g, ''); // Remove non-digit characters except '.'
  
        // Remove decimal places
        adjustedValue = adjustedValue.split('.')[0];
  
        // Format value with commas
        adjustedValue = parseFloat(adjustedValue).toLocaleString('en-US');
  
        // Set the formatted value
        input.value = adjustedValue;
  
        // Set cursor position to the end
        input.selectionStart = input.selectionEnd = input.value.length;
  
        const adjustmentMarketValue = parseFloat(adjustedValue.replace(/,/g, '')); // Remove commas from adjusted value
        const assessmentLevel = parseFloat(assessmentLevelInputs[index].value);
  
        if (!isNaN(adjustmentMarketValue) && !isNaN(assessmentLevel)) {
          const assessedValue = (adjustmentMarketValue * assessmentLevel) / 100;
          assessedValueOutput.value = assessedValue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}); // Format assessed value with commas and 2 decimal places
  
          totalAssessedValueOutput.value = assessedValue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}); // Format total assessed value with commas and 2 decimal places
        }
      });
    }
  
    const adjustmentMarketValueInputs = document.querySelectorAll(".adjustment-market-value");
    const assessmentLevelInputs = document.querySelectorAll(".assessment-level-input");
  
    // Add event listeners to adjustment market value inputs
    adjustmentMarketValueInputs.forEach((input, index) => {
      handleInput(input, index);
    });
  
    // Add event listeners to assessment level inputs
    assessmentLevelInputs.forEach((input, index) => {
      handleInput(input, index);
    });
  }

  // Initialize functions
  initializeClassificationDropdowns();
  initializeSubClassificationDropdowns();
  updateBaseMarketValue();
  handleActualUseInputs();
  calculateAssessedValue();
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

  // Other Improvements 
  document.addEventListener('DOMContentLoaded', function() {
    var inputs = document.querySelectorAll('.other-improv-base-market-value');
    var totalInput = document.querySelector('.other-improv-base-market-value-total');

    // Function to update the total value
    function updateTotal() {
    inputs.forEach(function(input) {
        var cursorPosition = input.selectionStart; // Save cursor position
        var formattedValue = input.value.replace(/,/g, '').replace(/[^\d.]/g, ''); // Remove non-digit characters except '.'

        // Clear input if no digits or decimal points are present
        if (!formattedValue.match(/\d|\.+/)) {
            input.value = '';
            return;
        }

        var parsedValue = parseFloat(formattedValue).toFixed(2); // Convert to floating point with 2 decimal places
        var formattedString = parseFloat(parsedValue).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }); // Format input value with commas and 2 decimal places
        var newCursorPosition = cursorPosition + (formattedString.length - input.value.length); // Adjust cursor position

        input.value = formattedString; // Set formatted value

        // Ensure ".00" at the very right side
        if (newCursorPosition === formattedString.length && input.value.indexOf('.') === -1) {
            input.value += ".00";
            newCursorPosition += 3; // Move cursor to the end
        }

        // Restore cursor position
        input.setSelectionRange(newCursorPosition, newCursorPosition);
    });

    var total = Array.from(inputs).reduce(function(acc, input) {
      var formattedValue = input.value.replace(/[,.]/g, ''); // Remove commas and decimal points
      var parsedValue = parseInt(formattedValue, 10) || 0; // Convert to integer, default to 0 if NaN
      return acc + parsedValue;
  }, 0);
  
  // Convert the total back to a decimal with two decimal places
  total = total / 100;
  
  // Display the total in the totalInput field
  totalInput.value = total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    
}
  

    // Add event listeners to each input
    inputs.forEach(function(input) {
        input.addEventListener('input', updateTotal);
    });

    // Calculate the initial total value
    updateTotal();
});




// End Other Improvements

// Value Adjustment 
document.addEventListener('DOMContentLoaded', function() {
  var inputs = document.querySelectorAll('.val-adjust-market-value');
  var totalInput = document.querySelector('.val-adjust-market-value-total');
  var adjustmentMarketValue = document.querySelector('.adjustment-market-value');

  // Function to update the total value
  function updateTotal() {
      var total = 0;
      inputs.forEach(function(input) {
          var cursorPosition = input.selectionStart; // Save cursor position
          var formattedValue = input.value.replace(/,/g, '').replace(/[^\d.]/g, ''); // Remove non-digit characters except '.'

          // Clear input if no digits or decimal points are present
          if (!formattedValue.match(/\d|\.+/)) {
              input.value = '';
              return;
          }

          var parsedValue = parseFloat(formattedValue).toFixed(2); // Convert to floating point with 2 decimal places
          var formattedString = parseFloat(parsedValue).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
          }); // Format input value with commas and 2 decimal places
          var newCursorPosition = cursorPosition + (formattedString.length - input.value.length); // Adjust cursor position

          input.value = formattedString; // Set formatted value

          // Ensure ".00" at the very right side
          if (newCursorPosition === formattedString.length && input.value.indexOf('.') === -1) {
              input.value += ".00";
              newCursorPosition += 3; // Move cursor to the end
          }

          // Restore cursor position
          input.setSelectionRange(newCursorPosition, newCursorPosition);

          total += parseFloat(parsedValue) || 0; // Add parsed value to the total
      });

      totalInput.value = total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}); // Format total with commas and 2 decimal places
  }

  // Add event listeners to each input
  inputs.forEach(function(input) {
      input.addEventListener('input', updateTotal);
  });

  // Calculate the initial total value
  updateTotal();
});

// Add commas and decimal places in the value-adjustment field
document.addEventListener('DOMContentLoaded', function() {
  var valueAdjustmentInput = document.querySelector('.value-adjustment');

  function formatInputValue(input) {
      var cursorPosition = input.selectionStart;
      var unformattedValue = input.value.replace(/,/g, ''); // Remove commas
      var parsedValue = parseFloat(unformattedValue) || 0;
      var formattedValue = parsedValue.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0}); // Set maximumFractionDigits to 0 to remove decimal point
      input.value = formattedValue;
      var newPosition = cursorPosition + (formattedValue.length - unformattedValue.length);
      input.setSelectionRange(newPosition, newPosition);
  }

  valueAdjustmentInput.addEventListener('input', function() {
      formatInputValue(valueAdjustmentInput);
  });
});
