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
            unitValueInput.value = "36300";
          case "UPLR-2":
            unitValueInput.value = "29100";
            break;
          case "UPLR-3":
            unitValueInput.value = "21800";
            break;
          case "UPLR-4":
            unitValueInput.value = "14500";
            break;
          case "COCO-1":
            unitValueInput.value = "57200";
          case "COCO-2":
            unitValueInput.value = "45800";
            break;
          case "COCO-3":
            unitValueInput.value = "34300";
            break;
          case "COCO-4":
            unitValueInput.value = "22800";
            break;
          case "CORN-1":
            unitValueInput.value = "59600";
          case "CORN-2":
            unitValueInput.value = "47700";
            break;
          case "CORN-3":
            unitValueInput.value = "35800";
            break;
          case "CORN-4":
            unitValueInput.value = "23900";
            break;
          case "COFE-1":
            unitValueInput.value = "72300";
          case "COFE-2":
            unitValueInput.value = "58000";
            break;
          case "COFE-3":
            unitValueInput.value = "43300";
            break;
          case "COFE-4":
            unitValueInput.value = "29000";
            break;
          case "ABA-1":
            unitValueInput.value = "42400";
          case "ABA-2":
            unitValueInput.value = "33900";
            break;
          case "ABA-3":
            unitValueInput.value = "25400";
            break;
          case "ABA-4":
            unitValueInput.value = "16900";
            break;
          case "OR-1":
            unitValueInput.value = "53300";
          case "OR-2":
            unitValueInput.value = "42600";
            break;
          case "OR-3":
            unitValueInput.value = "32000";
            break;
          case "OR-4":
            unitValueInput.value = "21300";
            break;
          case "BANA-1":
            unitValueInput.value = "56500";
          case "BANA-2":
            unitValueInput.value = "45200";
            break;
          case "BANA-3":
            unitValueInput.value = "33900";
            break;
          case "BANA-4":
            unitValueInput.value = "22600";
            break;
          case "CRC-1":
            unitValueInput.value = "57100";
          case "CRC-2":
            unitValueInput.value = "45700";
            break;
          case "CRC-3":
            unitValueInput.value = "34200";
            break;
          case "CRC-4":
            unitValueInput.value = "22800";
            break;
          case "CACAO-1":
            unitValueInput.value = "87700";
          case "CACAO-2":
            unitValueInput.value = "70100";
            break;
          case "CACAO-3":
            unitValueInput.value = "52600";
            break;
          case "CACAO-4":
            unitValueInput.value = "35100";
            break;
          case "RUB-1":
            unitValueInput.value = "85900";
          case "RUB-2":
            unitValueInput.value = "68700";
            break;
          case "RUB-3":
            unitValueInput.value = "51500";
            break;
          case "RUB-4":
            unitValueInput.value = "34300";
            break;
          case "PT":
            unitValueInput.value = "22500";
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
        const area = parseFloat(areaInputs[index].value);
        const unitValue = parseFloat(unitValueInputs[index].value);
        const baseMarketValue = area * unitValue;
        if (!isNaN(baseMarketValue)) {
          baseMarketValueInputs[index].value = baseMarketValue.toFixed(2);
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
      const value = parseFloat(input.value);
      if (!isNaN(value)) {
        totalBaseMarketValue += value;
      }
    });
    totalBaseMarketValueOutputs.forEach((output) => {
      output.textContent = totalBaseMarketValue.toFixed(2);
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
    const assessedValueOutput = document.getElementById(
      "assessed-value-output"
    );

    function handleInput(input, index) {
      input.addEventListener("input", function () {
        const adjustmentMarketValue = parseFloat(
          adjustmentMarketValueInputs[index].value
        );
        const assessmentLevel = parseFloat(assessmentLevelInputs[index].value);

        if (!isNaN(adjustmentMarketValue) && !isNaN(assessmentLevel)) {
          const assessedValue = adjustmentMarketValue * assessmentLevel;
          assessedValueOutput.textContent = assessedValue.toFixed(2);
        }
      });
    }

    function calculateAssessedValue() {
      const adjustmentMarketValueInputs = document.querySelectorAll(
        ".adjustment-market-value"
      );
      const assessmentLevelInputs = document.querySelectorAll(
        ".assessment-level-input"
      );
      const assessedValueOutput = document.getElementById(
        "assessed-value-output"
      );

      const totalAssessedValueOutput = document.getElementById(
        "total-assessed-value-output"
      );

      // Assessed Value Output
      function handleInput(input, index) {
        input.addEventListener("input", function () {
          const adjustmentMarketValue = parseFloat(input.value);
          const assessmentLevel = parseFloat(
            assessmentLevelInputs[index].value
          );

          if (!isNaN(adjustmentMarketValue) && !isNaN(assessmentLevel)) {
            const assessedValue =
              (adjustmentMarketValue * assessmentLevel) / 100;
            assessedValueOutput.value = assessedValue.toFixed(2);

            totalAssessedValueOutput.value = assessedValue.toFixed(2);
          }
        });
      }

      // Add event listeners to adjustment market value inputs
      adjustmentMarketValueInputs.forEach((input, index) => {
        handleInput(input, index);
      });

      // Add event listeners to assessment level inputs
      assessmentLevelInputs.forEach((input, index) => {
        handleInput(input, index);
      });
    }

    calculateAssessedValue();

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
        var total = 0;
        inputs.forEach(function(input) {
            total += parseFloat(input.value) || 0;
        });
        totalInput.value = total.toFixed(2);
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
          total += parseFloat(input.value) || 0;
      });
      totalInput.value = total.toFixed(2);
  }

  // Add event listeners to each input
  inputs.forEach(function(input) {
      input.addEventListener('input', updateTotal);
  });

  // Calculate the initial total value
  updateTotal();
});