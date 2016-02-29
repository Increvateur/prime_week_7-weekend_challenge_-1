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

      // This pushes the object into an array.
      employeeArray.push(values);

      salaryCalc();
    };
  });

  salaryCalc();

});

var employeeArray = [];

// This calculates the salaries.
function salaryCalc(){
  var finalSalary = 0
  for (var i = 0; i < employeeArray.length; i++){
    var employee = employeeArray[i];
    finalSalary += parseInt(employee.salary) / 12;
  };

  displayInfo();

  // This displays the employee information that was entered.
  function displayInfo(){
    $(".output-area").append('<div class="employee"></div>');
    var $el = $(".output-area").children().last();

    $el.append("<li>" + employee.firstname + " " + employee.lastname + "</li>");
    $el.append("<li>Employee ID: " + employee.employeeid + "</li>");
    $el.append("<li>Job Title: " + employee.jobtitle + "</li>");
    $el.append("<li>Yearly Salary: $" + employee.salary + "</li>");
    $el.append("<button class='remove'>Remove Entry</button>");

  };

  // This allows the user to delete an entry.
  function deleteInfo(){
    $(this).parent().remove();

  };

  $('.total-monthly').text('Money Spent Monthly on Employee Salaries: ' + Math.round(finalSalary));

  $('.output-area').on('click', '.remove', deleteInfo);

};
