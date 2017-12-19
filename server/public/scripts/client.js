

$(document).ready(onReady);


// Runs when DOM is ready
function onReady() {
  $('#submitEmployee').on('click', addNewEmployee);
  $('#employeeData').on('click', '.empDelete', removeEmployee);
} // end onReady() function


// Gets info out of input fields and returns an array of the data
function newEmployeeInfo() {
  var employeeFName = $('#firstName').val();
  var employeeLName = $('#lastName').val();
  var employeeID = $('#empID').val();
  var employeeTitle = $('#jobTitle').val();
  var employeeSal = Number($('#annualSalary').val());
  var employeeInfoArray = [employeeFName, employeeLName, employeeID,
    employeeTitle, employeeSal];
  return employeeInfoArray;
} // end newEmployeeInfo()


// Adds new employee information to the DOM and updates monthy cost calculations
function addNewEmployee() {
  // Runs newEmployeeInfo() function to retrieve info from input fields so
  // that the data can be appended to the DOM
  var employeeData = newEmployeeInfo();

  var $row = $('<tr>');
  var $button = '<button type="button" class="btn btn-danger empDelete">Delete</button>';
  $row.append('<td>'+ employeeData[0] + '</td>');
  $row.append('<td>'+ employeeData[1] + '</td>');
  $row.append('<td>'+ employeeData[2] + '</td>');
  $row.append('<td>'+ employeeData[3] + '</td>');
  $row.append('<td>'+ employeeData[4] + '</td>');
  $row.append('<td>'+ $button + '</td>');

  // adds a data tag to each row containing the employees salary
  $row.data('salary', employeeData[4]);
  // Appends values from the employeeData array to the DOM
  $('#employeeData').append($row);
  // Clears input boxes after submission
  $('input').not('#submitEmployee').val('');
  // Runs the monthyCosts() function each time a new row is created to get accurate
  // calculations of the current montly costs.
  var totalMontlyCost = monthyCosts();
  $('#salTotal').html(totalMontlyCost); // Adds monthly costs to the DOM
} // end addNewEmployee()


// Does calculations for getting the monthly salary costs.
function monthyCosts() {
  var  employeeSalaryTotal = 0;
  var employeeCount = $('tbody').children().length;

  // Loops through all of the <tr>'s in the table body and get the value of
  // data.('salary') and add that number to the variable employeeSalaryTotal
  for (var i = 1; i <= employeeCount; i++) {
    employeeSalaryTotal += $('tbody tr:nth-child(' + i + ')').data('salary');
  }

  // Takes output of the loop and divides the number by 12 to give monthly total.
  // Uses toFixed(2) so that the number will only have two places after the
  // decimal and then returns that value to a number.
  var monthlySalaryTotal = Number((employeeSalaryTotal / 12).toFixed(2));
  return monthlySalaryTotal;
} // end monthyCosts()


// Removes employee rows off DOM
function removeEmployee() {
  $(this).parents('tr').remove();
  // Once a employee is removed the monthlyCosts function is ran, giving a total
  var decreaseCost = monthyCosts();
  $('#salTotal').html(decreaseCost);
} // end removeEmployee()
