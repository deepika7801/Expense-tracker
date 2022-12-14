var inputname = document.getElementById("username");
var inputpassword = document.getElementById("password");
var login = document.getElementById("login-button");
var infoPage = document.getElementById("info-page");
var mainPage = document.getElementById("main-page");
var newUser = document.getElementById("new-user");
var newPassword = document.getElementById("new-password");
var confirmPassword = document.getElementById("confirm-password");
var signupPage = document.getElementById("signup-page");
var signupSubmit = document.getElementById("signup-submit");
var loginInfo = document.getElementById("login-box"),
  walletAmount = document.getElementById("display-wallet");
var username, password;
let transactionDetails;
let previousWalletAmt = 0;
let previousWallet = document.getElementById("previous-wallet");
let currentWallet = document.getElementById("current-wallet");

walletAmount.addEventListener("submit", (e) => {
  e.preventDefault();
  let budget = document.getElementById("budget");
  fetch("http://localhost:3000/addAmount", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      budget: budget.value,
    }),
  })
    .then(async (addAmount) => {
      if (addAmount.ok) {
        alert("Amount updated");
        let amount = await addAmount.json();
        console.log("amount: ", amount);
        currentWallet.value = amount.currentWalletValue;
        previousWallet.style.display = "block";
        previousWallet.value = amount.previousValue;
      }
    })

    .catch((err) => console.log(err));

	walletCloseButton.click();
});

login.addEventListener("click", async () => {
  await getLoginData(inputname, inputpassword);
});
var signup = document.getElementById("signup");
signup.addEventListener("click", navigateToSignupPage);
// Function to navigate the user to sign up page.
function navigateToSignupPage() {
  loginInfo.style = "display:none";
  signupPage.style = "display:flex";
  newUser.value = "";
  newPassword.value = "";
  confirmPassword.value = "";
}
// Function to add a new user when the submit button is clicked.
signupSubmit.addEventListener("click", async () => {
  if (!(newUser.value.length == 0)) {
    if (validateEmail(newUser)) {
      if (!(newPassword.value.length == 0)) {
        if (newPassword.value == confirmPassword.value) {
          await addNewUser(newUser, newPassword);
        } else {
          mismatch.innerHTML = "Password mismatch";
        }
      } else {
        alert("Enter new password");
      }
    } else {
      alert("Enter username with @domain");
    }
  } else {
    alert("Enter username");
  }
});
// Function to validate email id is with domain
function validateEmail(input) {
  var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (input.value.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}
var backToLogin = document.getElementById("back-to-login");
backToLogin.addEventListener("click", ()=> {
	loginInfo.style = "display: block";
	signupPage.style = "display : none";
	inputname.value = "";
	inputpassword.value = "";
})
async function addNewUser(newUser, newPassword) {
  try {
    var newUserId = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        username: newUser.value,
        password: newPassword.value,
      }),
    });
    if (newUserId.ok) {
      infoPage.style = "display:none";
      signupPage.style = "display:none";
      mainPage.style = "display:block";
      let tempUser = newUser.value;
      username = tempUser;
    }
  } catch (Error) {
    alert(Error.message);
  }
}

async function getLoginData(inputname, inputpassword) {
  var fetchUserData = await fetch("http://localhost:3000/loginPage", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      username: inputname.value,
      password: inputpassword.value,
    }),
  });
  if (fetchUserData.ok) {
    alert("Login success");
    infoPage.style = "display:none";
    mainPage.style = "display:block";
    username = inputname.value;
    password = inputpassword.value;
    inputname.value = "";
    inputpassword.value = "";
    await defaultFunction();
    previousWallet.style = "display:none";
    previousWallet.value = 0;
    currentWallet.value = transactionDetails.wallet;
  } else {
    alert("login failed");
  }
}

let newTransaction = document.getElementById("new-transaction");
newTransaction.addEventListener("submit", (e) => {
  let category = document.getElementById("category"),
    date = document.getElementById("date"),
    amount = document.getElementById("amount");
  console.log(document.getElementById("necessary").checked);
  console.log(document.getElementById("unnecessary").checked);
  let expense;
  if (document.getElementById("unnecessary").checked) {
    expense = document.getElementById("unnecessary").value;
  } else if (document.getElementById("necessary").checked) {
    expense = document.getElementById("necessary").value;
  }
  e.preventDefault();

  fetch("http://localhost:3000/addTransaction", {
    method: "POST",

    headers: {
      Accept: "application/json, text/plain,*/*",

      "Content-type": "application/json",
    },

    body: JSON.stringify({
      category: category.value,
      date: date.value,
      amount: amount.value,
      expense: expense,
    }),
  })
    .then(async (data) => {
		let walletAmounts = await data.json();
      
      if (data.ok) {
        defaultFunction();
        alert("Entry successful");
		currentWallet.value= walletAmounts.currentvalue;
      }
      console.log(expense);
    })

    .catch((err) => console.log(err));

  closeButton.click();
});
//transaction
const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

//budget
const wallet = document.querySelector(".wallet");
const walletTrigger = document.querySelector(".wallet-trigger");
const walletCloseButton = document.querySelector(".wallet-close-button");

function toggleModal1() {
  wallet.classList.toggle("wallet-show-modal");
}

function windowOnClick1(event) {
  if (event.target === wallet) {
    toggleModal1();
  }
}

walletTrigger.addEventListener("click", toggleModal1);
walletCloseButton.addEventListener("click", toggleModal1);
window.addEventListener("click", windowOnClick1);

// function displayCard(){
//   console.log(username);
// 	fetch("http://localhost:3000/getDetails", {
//     method: "GET",

//     headers: {
//       Accept: "application/json, text/plain,*/*",

//       "Content-type": "application/json",
//     }
// }).then((data)=>{
//   let currentUserData=data.json();
//   userData=currentUserData;
// })
// }
function createCard(amount,date,category,expensetype){
  console.log(date);
  let card = document.getElementById("expense-card");
  let expenseCard = document.createElement("div");
  expenseCard.setAttribute("class", "expense-card-details");
  card.appendChild(expenseCard);
  let expenseAmount=document.createElement("div");
  let expenseDate=document.createElement("div");
  let expenseCategory=document.createElement("div");
  let expenseAmounttext=document.createElement("div");
  let expenseDatetext=document.createElement("div");
  let expenseCategorytext=document.createElement("div");
  let expenseAmountvalue=document.createElement("div");
  let expenseDatevalue=document.createElement("div");
  let expenseCategoryvalue=document.createElement("div");
  let expenseType=document.createElement("div");
  let expenseTypeText=document.createElement("div");
  let expenseTypeValue=document.createElement("div");
  expenseAmount.setAttribute("class","expense-amount");
  expenseDate.setAttribute("class","expense-date");
  expenseCategory.setAttribute("class","expense-category");
  expenseCard.appendChild(expenseAmount);
  expenseCard.appendChild(expenseType);
  expenseType.appendChild(expenseTypeText);
  expenseType.appendChild(expenseTypeValue);
  expenseCard.appendChild(expenseDate);
  expenseCard.appendChild(expenseCategory);
  expenseAmount.appendChild(expenseAmounttext);
  expenseDate.appendChild(expenseDatetext);
  expenseCategory.appendChild(expenseCategorytext);
  expenseAmount.appendChild(expenseAmountvalue);
  expenseDate.appendChild(expenseDatevalue);
  expenseCategory.appendChild(expenseCategoryvalue);
  expenseAmounttext.innerHTML="Amount:";
  expenseAmounttext.style.fontWeight = '900';
  expenseDatetext.style.fontWeight = '900';
  expenseCategorytext.style.fontWeight = '900';
  expenseTypeText.style.fontWeight = '900';
  expenseDatetext.innerHTML="Date:";
  expenseCategorytext.innerHTML="Category:";
  expenseAmountvalue.innerHTML=amount;
  expenseDatevalue.innerHTML=date;
  expenseCategoryvalue.innerHTML=category;
  expenseTypeText.innerHTML="Expense Type";
  expenseTypeValue.innerHTML=expensetype;
}


async function defaultFunction() {
  let taskData = await fetch("http://localhost:3000/getDetails", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  transactionDetails = await taskData.json();
  console.log(transactionDetails);
    let expense_card=document.getElementById("expense-card");
    expense_card.replaceChildren();
  for (let i = 0; i < transactionDetails.transactions.length; i++) {
    createCard(transactionDetails.transactions[i].amount,transactionDetails.transactions[i].date,transactionDetails.transactions[i].category,transactionDetails.transactions[i].typeOfExpense);
   
  }

}
