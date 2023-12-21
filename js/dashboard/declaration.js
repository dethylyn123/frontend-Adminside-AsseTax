// Function to calculate real property tax
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