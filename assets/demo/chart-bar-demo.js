import { backendURL, showNavAdminPages, successNotification, errorNotification, getLoggedUser, userId } from "../../js/utils/utils.js";

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Bar Chart Example
var ctx = document.getElementById("myBarChart");
var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["Residential", "Agricultural", "Commercial", "Industrial", "Mineral", "Timberland"],
    datasets: [{
      label: "Land Classification",
      backgroundColor: "#60AB9A",
      borderColor: "rgba(2,117,216,1)",
      data: [], // Empty initial data
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 6
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 6, // Adjust the max value based on your data = 3
          maxTicksLimit: 5
        },
        gridLines: {
          display: true
        }
      }],
    },
    legend: {
      display: false
    }
  }
});

// Fetch data from the Laravel API endpoint for statistics
async function statisticsData() {
  try {
    const response = await fetch(
      backendURL + "/api/statistics",
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          "ngrok-skip-browser-warning": "69420",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data); // Log the entire data received from the API

      // Check if the data is in the expected format
      if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
        const chartData = data[0][0];
        console.log(chartData); // Check the extracted chart data

        // Update the chart data with the fetched data
        myLineChart.data.datasets[0].data = [
          chartData.Residential,
          chartData.Agricultural,
          chartData.Commercial,
          chartData.Industrial,
          chartData.Mineral,
          chartData.Timberland
        ];
        myLineChart.update(); // Update the chart to reflect the changes

        // Set default values for "This Month"
        document.getElementById("classification").innerHTML = chartData.Residential;
      } 

      // Add an event listener to the filter links
      document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', event => {
          // Prevent the default behavior of the link
          event.preventDefault();

          // Get the selected filter value
          const selectedFilter = event.target.innerHTML;

          // Assuming data is an array containing another array
          if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
            const chartData = data[0][0]; // Access the first object in the inner array

            console.log("Data structure:", chartData); // Log the structure of the data

            // Update values based on the selected filter
            switch (selectedFilter) {
              case 'Residential':
                document.getElementById("classification").innerHTML = chartData.Residential;
                document.getElementById("filter1").innerHTML = "| Residential";
                break;
              case 'Agricultural':
                document.getElementById("classification").innerHTML = chartData.Agricultural;
                document.getElementById("filter1").innerHTML = "| Agricultural";
                break;
              case 'Commercial':
                document.getElementById("classification").innerHTML = chartData.Commercial;
                document.getElementById("filter1").innerHTML = "| Commercial";
                break;
              case 'Industrial':
                document.getElementById("classification").innerHTML = chartData.Industrial;
                document.getElementById("filter1").innerHTML = "| Industrial";
                break;
              case 'Mineral':
                document.getElementById("classification").innerHTML = chartData.Mineral;
                document.getElementById("filter1").innerHTML = "| Mineral";
                break;
              case 'Timberland':
                document.getElementById("classification").innerHTML = chartData.Timberland;
                document.getElementById("filter1").innerHTML = "| Timberland";
                break;
              default:
                break;
            }
          }
        });
      });
    } else {
      const errorData = await response.json();
      console.error('Error fetching data:', errorData.message);
    }
  } catch (error) {
    console.error('Unexpected error:', error);
  }
}



// Get Statistics
async function statisticsCount(){

  // Access User Profile API Endpoint
  const response = await fetch(
    backendURL + "/api/statistics/owners",
    {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
        "ngrok-skip-browser-warning": "69420", // Include ngrok bypass header directly
      },
    }
  );

// Get response if 200-299 status code
  if (response.ok) {
    const json = await response.json();
    console.log("result",json);

    // Assuming json is an array containing another array
    if (Array.isArray(json) && json.length > 0 && Array.isArray(json[0])) {
      const data = json[0][0];
    // Set default values for "This Month"
    document.getElementById("property_owner").innerHTML = data.property_owner_this_month;


    // Set the monthly change percentage and type if available
    if (
      data.monthly_change_percentage !== null &&
      data.monthly_change !== null &&
      !isNaN(parseFloat(data.monthly_change_percentage)) &&
      !isNaN(data.monthly_change)
    ) {
      var changePercentage = parseFloat(data.monthly_change_percentage).toFixed(2);
      var changeType = parseFloat(data.monthly_change) > 0 ? "increase" : (parseFloat(data.monthly_change) < 0 ? "decrease" : "no-change");

      var changePercentageElement = document.getElementById("change_percentage");
      var changeTypeElement = document.getElementById("change_type");

      changePercentageElement.innerHTML = `${changePercentage}%`;
      changeTypeElement.innerHTML = changeType;

      // Set color based on change_type
      changePercentageElement.style.color = changeType === "increase" ? "green" : (changeType === "decrease" ? "red" : "black");
      changeTypeElement.style.color = changeType === "increase" ? "green" : (changeType === "decrease" ? "red" : "black");

    } else {
      document.getElementById("change_percentage").innerHTML = "N/A";
      document.getElementById("change_type").innerHTML = "N/A";
      document.getElementById("change_percentage").style.color = "black"; // Set default color
      document.getElementById("change_type").style.color = "black"; // Set default color
    }

    }
    // EMAIL
    // Using getElementsByClassName instead of getElementById

    // const userLoggedEmailElements = document.getElementsByClassName("user_logged_email");

    // Loop through all elements with the given class

    // for (let i = 0; i < userLoggedEmailElements.length; i++) {
    //   const element = userLoggedEmailElements[i];
    //   element.innerHTML = element.value = json.email;
    // }

    // Add an event listener to the filter links
    document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', event => {
    // Prevent the default behavior of the link
    event.preventDefault();

    // Get the selected filter value
    const selectedFilter = event.target.innerHTML;

    // Assuming json is an array containing another array
    if (Array.isArray(json) && json.length > 0 && Array.isArray(json[0])) {
      const data = json[0][0]; // Access the first object in the inner array

      console.log("Data structure:", data); // Log the structure of the data

      // Update values based on the selected filter
switch (selectedFilter) {
  case 'Today':
    document.getElementById("property_owner").innerHTML = data.property_owner_today;
    document.getElementById("filter").innerHTML = "| Today";
    // Set the monthly change percentage and type if available
    if (
      data.daily_change_percentage !== null &&
      data.daily_change !== null &&
      !isNaN(parseFloat(data.daily_change_percentage)) &&
      !isNaN(data.daily_change)
    ) {
      var changePercentage = parseFloat(data.daily_change_percentage).toFixed(2);
      var changeType = parseFloat(data.daily_change) > 0 ? "increase" : (parseFloat(data.daily_change) < 0 ? "decrease" : "no-change");

      var changePercentageElement = document.getElementById("change_percentage");
      var changeTypeElement = document.getElementById("change_type");

      changePercentageElement.innerHTML = `${changePercentage}%`;
      changeTypeElement.innerHTML = changeType;

      // Set color based on change_type
      changePercentageElement.style.color = changeType === "increase" ? "green" : (changeType === "decrease" ? "red" : "black");
      changeTypeElement.style.color = changeType === "increase" ? "green" : (changeType === "decrease" ? "red" : "black");

    } else {
      document.getElementById("change_percentage").innerHTML = "N/A";
      document.getElementById("change_type").innerHTML = "N/A";
      document.getElementById("change_percentage").style.color = "black"; // Set default color
      document.getElementById("change_type").style.color = "black"; // Set default color
    }

    break;
  case 'This Month':
    document.getElementById("property_owner").innerHTML = data.property_owner_this_month;
    document.getElementById("filter").innerHTML = "| This Month";
    // Set the monthly change percentage and type if available
    if (
      data.monthly_change_percentage !== null &&
      data.monthly_change !== null &&
      !isNaN(parseFloat(data.monthly_change_percentage)) &&
      !isNaN(data.monthly_change)
    ) {
      var changePercentage = parseFloat(data.monthly_change_percentage).toFixed(2);
      var changeType = parseFloat(data.monthly_change) > 0 ? "increase" : (parseFloat(data.monthly_change) < 0 ? "decrease" : "no-change");

      var changePercentageElement = document.getElementById("change_percentage");
      var changeTypeElement = document.getElementById("change_type");

      changePercentageElement.innerHTML = `${changePercentage}%`;
      changeTypeElement.innerHTML = changeType;

      // Set color based on change_type
      changePercentageElement.style.color = changeType === "increase" ? "green" : (changeType === "decrease" ? "red" : "black");
      changeTypeElement.style.color = changeType === "increase" ? "green" : (changeType === "decrease" ? "red" : "black");

    } else {
      document.getElementById("change_percentage").innerHTML = "N/A";
      document.getElementById("change_type").innerHTML = "N/A";
      document.getElementById("change_percentage").style.color = "black"; // Set default color
      document.getElementById("change_type").style.color = "black"; // Set default color
    }

    break;
  case 'This Year':
    document.getElementById("property_owner").innerHTML = data.property_owner_this_year;
    document.getElementById("filter").innerHTML = "| This Year";
  
    // Set the monthly change percentage and type if available
    if (
      data.yearly_change_percentage !== null &&
      data.yearly_change !== null &&
      !isNaN(parseFloat(data.yearly_change_percentage)) &&
      !isNaN(data.yearly_change)
    ) {
      var changePercentage = parseFloat(data.yearly_change_percentage).toFixed(2);
      var changeType = parseFloat(data.yearly_change) > 0 ? "increase" : (parseFloat(data.yearly_change) < 0 ? "decrease" : "no-change");

      var changePercentageElement = document.getElementById("change_percentage");
      var changeTypeElement = document.getElementById("change_type");

      changePercentageElement.innerHTML = `${changePercentage}%`;
      changeTypeElement.innerHTML = changeType;

      // Set color based on change_type
      changePercentageElement.style.color = changeType === "increase" ? "green" : (changeType === "decrease" ? "red" : "black");
      changeTypeElement.style.color = changeType === "increase" ? "green" : (changeType === "decrease" ? "red" : "black");

    } else {
      document.getElementById("change_percentage").innerHTML = "N/A";
      document.getElementById("change_type").innerHTML = "N/A";
      document.getElementById("change_percentage").style.color = "black"; // Set default color
      document.getElementById("change_type").style.color = "black"; // Set default color
    }

    break;
    default:
    break;
    }
    }
  });
});
} 

// Get response if 400 or 500 status code
  else {
    const json = await response.json();

    errorNotification(json.message, 10);

  }
};

// Call the function to fetch and update statistics data
statisticsData();
statisticsCount();


