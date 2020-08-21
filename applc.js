// Listen for submit
const clearBtn=document.querySelector('.clear-tasks');
clearBtn.addEventListener('click',clearTasks);


document.getElementById('loan-form').addEventListener('submit',function(e)

{
  document.getElementById('results').style.display='none';
  document.getElementById('loading').style.display='block';
  setTimeout(calculateResults,2000);
  e.preventDefault();
}
);

const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#Years');
function clearTasks()
{
    if(confirm("Are You Sure ?"))
   { amount.value='';
   interest.value='';
   years.value='';
   localStorage.clear();}
}

// Calculate Results
function calculateResults(){
  // UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('Years');
  const monthlyPayment = document.getElementById('monthly payment');
  const totalPayment = document.getElementById('total payment');
  const totalInterest = document.getElementById('total interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
    document.getElementById('results').style.display='block';
    document.getElementById('loading').style.display='none';
  } else {
    showError('Please check your numbers');
  }
}
  
function showError(error){

  document.getElementById('results').style.display='none';
    document.getElementById('loading').style.display='none';
  // Creating a div
  const errorDiv = document.createElement('div');
  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  // Adding class
  errorDiv.className = 'alert alert-danger';
  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));
  // Insert error above heading
  card.insertBefore(errorDiv, heading);
  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}
function clearError(){
  document.querySelector('.alert').remove();
}