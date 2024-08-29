//get display values
let balance = document.querySelector(".Balance")
let Earned = document.querySelector(".Earned");
let Spent = document.querySelector(".Spent");
//title
let btitle = document.getElementById("title1");
//tab selectors
let listContainer = document.querySelector(".listContainer");
let tab1 = document.querySelector(".tab1");
let tab2 = document.querySelector(".tab2");
let tab3 = document.querySelector(".tab3");
let tab4 = document.querySelector(".tab4");
//pages for each tab
let page1 = document.querySelector(".addMoney");
let page2 = document.querySelector(".spendMoney");
let page3 = document.querySelector(".tHistory");
let page4 = document.querySelector(".wishlist");
//welcome message
let welcomeMessage = document.querySelector(".welcome");
//input
let inputVal = document.getElementById("inputNum");
let inputMemo = document.getElementById("inputMemo");
let expenseVal = document.getElementById("expenseNum");
let expenseMemo = document.getElementById("expenseMemo");

//lists
let historyList = document.querySelector(".tHistory .list");
let expenseList = document.querySelector(".spendMoney .list");
let incomeList = document.querySelector(".addMoney .list");

//
let formVal = document.getElementById("sel");

//holds money values
TRANSACTIONS = JSON.parse(localStorage.getItem("transactions")) || [];
let moneyEarned = 0;
let moneySpent = 0;
let total = 0;

update(TRANSACTIONS);

//event listeners to move between tabs
tab1.addEventListener("click", function(){
    listContainer.style.backgroundColor = "rgb(114, 230, 112)"
    show(page1);
    hide([page2, page3, page4]);
});
tab2.addEventListener("click", function(){
    listContainer.style.backgroundColor = "rgb(248, 187, 143)"
    show(page2);
    hide([page1, page3, page4]);
});
tab3.addEventListener("click", function(){
    listContainer.style.backgroundColor = "rgb(248, 206, 143)"
    show(page3);
    hide([page2, page1, page4]);
});
tab4.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});


//functions
//controls add button
function addButton(){
    //if an input is missing, send alert
    if(!inputMemo.value || !inputVal.value){
        alert("Please Fill All Fields");
        return;
    }
    
    let income = {
        type : "income",
        val : inputVal.value,
        memo : inputMemo.value,
        form : null
    };

    TRANSACTIONS.push(income);

    //update variables and clear UI input
    calcMoneyEarned(parseInt(income.val));
    clearInput(inputVal,inputMemo);
    calcBalance(moneyEarned, moneySpent);
    showList(incomeList, income.type, income.memo, income.val);
    showListH(historyList, income.type, income.memo, income.val);
    localStorage.setItem("transactions", JSON.stringify(TRANSACTIONS));

}

function subButton(){
    //if an input is missing, send alert
    if(!expenseMemo.value || !expenseVal.value){
        alert("Please Fill All Fields");
        return;
    }

    let expense = {
        type : "expense",
        val : expenseVal.value,
        memo : expenseMemo.value,
        form : formVal.options[formVal.selectedIndex].value
    };

    TRANSACTIONS.push(expense);

    //update variables and clear UI input
    calcMoneySpent(parseInt(expense.val));
    clearInput(expenseVal, expenseMemo);
    calcBalance(moneyEarned, moneySpent);
    showList(expenseList, expense.type, expense.memo, expense.val);
    showListH(historyList, expense.type, expense.memo, expense.val);
    localStorage.setItem("transactions", JSON.stringify(TRANSACTIONS));

    //update chart
    updateChart(expense.val, expense.form);
}

//make calculations
function calcMoneyEarned(val){
    moneyEarned += val;
    Earned.innerHTML = "$" + moneyEarned;
}
function calcMoneySpent(val){
    moneySpent += val;
    Spent.innerHTML = "$" + moneySpent;
}
function calcBalance(moneyEarned, moneySpent){
    total = moneyEarned - moneySpent;
    balance.innerHTML = "$" + total;
}

//clear input
function clearInput(value, memo){
    value.value = "";
    memo.value = "";
}

//add to list
function showList(list, type, title, amount){
    let entry = `<li class="${type}">
                    <div class="entry">${title}: $${amount}</div>
                </li>`;

    list.insertAdjacentHTML("afterbegin", entry)
}

//add to history list
function showListH(list, type, title, amount, ){
    let entry = `<li class="${type}">
                    <div class="expenseLi">
                        <div class="entry">${title}: $${amount}</div>
                        <div class="entry" id="Ttype">type:${type}</div>
                    </div>
                </li>`;

    list.insertAdjacentHTML("afterbegin", entry)
}

//controls display
function hide(pages){
    for(let i = 0; i < pages.length; i++){
        pages[i].style.visibility = "hidden";
    }
    welcomeMessage.style.visibility = "hidden";
}
function show(page){
    page.style.visibility = "visible";
}

function update(){
    for(let i = 0; i < TRANSACTIONS.length; i++){
        if(TRANSACTIONS[i].type == "expense"){
            calcMoneySpent(parseInt(TRANSACTIONS[i].val));
            calcBalance(moneyEarned, moneySpent);
            showList(expenseList, TRANSACTIONS[i].type, TRANSACTIONS[i].memo, TRANSACTIONS[i].val);
            showListH(historyList, TRANSACTIONS[i].type, TRANSACTIONS[i].memo, TRANSACTIONS[i].val);
        }
        else{
            calcMoneyEarned(parseInt(TRANSACTIONS[i].val));
            calcBalance(moneyEarned, moneySpent);
            showList(incomeList, TRANSACTIONS[i].type, TRANSACTIONS[i].memo, TRANSACTIONS[i].val);
            showListH(historyList, TRANSACTIONS[i].type, TRANSACTIONS[i].memo, TRANSACTIONS[i].val);
        }

    }
    
}






