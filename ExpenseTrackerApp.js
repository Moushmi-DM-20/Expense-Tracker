let expenseList = [];
let budget = 0;
let balance = 0;
let myChart;
let totalExpenses = 0;

function budgetDetails(){
  const inputElement1 = document.querySelector('.js-input-budget');

  const newBudget = Number(inputElement1.value);

  if(!newBudget){
    alert("Please enter a valid budget amount.");
    return;
  }
  else{
    budget = newBudget;
    expenseList = [];
    totalExpenses = 0;
    balance = budget;
    alert('Your budget updation is successfully completed');
  }

  console.log(`Budget ${budget}`);

  inputElement1.value = '';
}

function expenseDisplay()
{
  let expenseHTML = '';
  const totalExpenses = expenseList.reduce((acc,expense) => acc+expense.amountSpent,0);
  const balance = budget - totalExpenses;
  
  const html1 = `<div class="output-details">
                      <div class="output-three-title">
                      <p class="output-title">
                        Budget
                      </p>
                      <p class="output-title">
                        Expenses
                      </p>
                      <p class="output-title">
                        Balance
                      </p>
                      </div>
                      <div class="output-three-answer">
                      <p class="output-title">
                      ${budget}
                      </p>
                      <p class="output-title">
                      ${totalExpenses}
                      </p>
                      <p class="output-title">
                      ${balance}
                      </p>
                      </div>
                  </div>`;

    document.querySelector('.js-output').innerHTML = html1;

  for(let i=0;i<=expenseList.length-1;i++)
  {
    const list2 = expenseList[i];

    const description = list2.description;
    const amountSpent = list2.amountSpent;
    const date = list2.date;

    const html2 = `<div class="output-expense-list">
                    <p class="output-title">
                    ${description}
                    </p>
                    <p class="output-title">
                    ${amountSpent}
                    </p>
                    <p class="output-title">
                    ${date}
                    </p>
                    <p class="output-title">
                    <button class="delete-button" onclick="
                      deleteExpense(${i})
                    ">
                      Delete
                    </button>
                    </p>
                    </div>`;
    
    expenseHTML += html2;
  }
  document.querySelector('.js-expense-list').innerHTML = expenseHTML;
}

function deleteExpense(index)
{
  expenseList.splice(index,1);
  expenseDisplay();
  chartDisplay();
}

function expenseShow(){

  const inputElement2 = document.querySelector('.js-input-description');
  const inputElement3 = document.querySelector('.js-input-amount-spent');
  const inputElement4 = document.querySelector('.js-input-date');

  const description = inputElement2.value;
  const amountSpent = Number(inputElement3.value);
  const date = inputElement4.value;

  if(!description || isNaN(amountSpent)){
    alert("Please");
    return;
  }

  expenseList.push({description,amountSpent,date});

  inputElement2.value = '';
  inputElement3.value = '';
  inputElement4.value = '';

  expenseDisplay();
  chartDisplay();
}

function chartDisplay(){
const names = ["Budget","Expenses","Balance"];
const barColor = ["#b91d47","#00aba9","#2b5797"];
const percent = [budget,totalExpenses,balance];

totalExpenses = expenseList.reduce((acc,expense) => acc+expense.amountSpent,0);
balance = budget - totalExpenses;

if(myChart)
{
  myChart.destroy();
}

myChart = new Chart(document.querySelector('.js-donut-chart'),{
  type : 'doughnut',
  data : {
    labels : names,
    datasets : [{
      backgroundColor : barColor,
      data : percent
  }]
  },
  options : {
    title : {
      display : true,
      text : 'SAVE FOR YOUR FUTURE'
    }
    
  }
});
}