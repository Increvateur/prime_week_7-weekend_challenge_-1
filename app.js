$(document).ready(function(){
  $("#salaryForm").on("submit", function(event){
    event.preventDefault();

    var values = {};

    // This strips the form and creates an object with the info in it.
    $.each($("#salaryForm").serializeArray(), function(i, field){
    values[field.name] = field.value;
    });

    // This checks to make sure all fields are completed.
    if (values.firstname == "" || values.lastname == "" || values.employeeid == "" || values.jobtitle == "" || values.salary == "") {
      $('.header').text('Please complete all fields before proceeding.');
    } else {
      $('.header').text('');

      // This clears out the form.
      $('#salaryForm').find('input[type=text]').val('');
      $('#salaryForm').find('input[type=number]').val('');

      // This pushes the object into an array.
      employeeArray.push(values);

      salaryCalc();
      displayInfo(values);
    };
  });

  salaryCalc();

});

var employeeArray = [];

// This calculates the amount paid monthly in salaries.
function salaryCalc(){
  var finalSalary = 0
  for (var i = 0; i < employeeArray.length; i++){
    var employee = employeeArray[i];
    finalSalary += parseInt(employee.salary) / 12;
  };

  $('.total-monthly').text('Money Spent Monthly on Employee Salaries: $' + Math.round(finalSalary));

  $('.output-area').on('click', '.remove', deleteInfo);

};

// This displays the employee information that was entered.
function displayInfo(employee){
  $(".output-area").append('<div class="employeePane"></div>');
  var $el = $(".output-area").children().last();

  $el.append("<li>" + employee.firstname + " " + employee.lastname + "</li>");
  $el.append("<li>Employee ID: " + employee.employeeid + "</li>");
  $el.append("<li>Job Title: " + employee.jobtitle + "</li>");
  $el.append("<li>Yearly Salary: $" + employee.salary + "</li>");
  $el.append("<button class='remove'>Remove Entry</button>");

};

// This deletes an entry when the user clicks the "Remove Entry" button.
function deleteInfo(){
  $(this).parent().remove();

};
