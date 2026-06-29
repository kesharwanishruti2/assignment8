let name = document.querySelector(".name")
let password =  document.querySelector(".password")
let register =  document.querySelector("#register")
let reg2 =  document.querySelector("#LoginHere")
let btn = document.querySelector("#login")
let reg = document.querySelector("#reg")
let form1 = document.querySelector("#form1")
let form2 = document.querySelector("#form2")
let section1 = document.querySelector(".section1")
let section2 = document.querySelector(".section2")
let section3 = document.querySelector(".section3")



let Addo = document.querySelector("#Addtransaction")
let add  = document.querySelector("#Add")
let section4 = document.querySelector(".section4")


const closeBtn = document.querySelector(".close");
const formDiv = document.querySelector(".form")

//ye register form open hona ka liye hai
register.addEventListener("click",(e)=>{
    e.preventDefault()
    section1.style.display = "none";
    section2.style.display = "flex";
})
// ye login form open hona ke liye hai 
reg2.addEventListener("click",(e)=>{
     e.preventDefault()
    section1.style.display = "flex";
    section2.style.display = "none"; 
})
//Register ka logic local storage ye aka temporay storage hai 

reg.addEventListener("click",()=>{
let users = {
    username : name.value,
    Password: password.value
}

localStorage.setItem("users",JSON.stringify(users));
alert("Register sucessfully!")
 section1.style.display = "flex";
    section2.style.display = "none"; 
})
//ye login mai save ho ka aka new interface open kara 

btn.addEventListener("click",()=>{
let data = JSON.parse(localStorage.getItem("users")) || {};
 if(!data){
    alert("Please register first")
    return
 }
if(name.value === data.username && password.value === data.Password){
 section3.style.display = "flex";
  section1.style.display = "none";
}
else{
    alert("Invalid Username or password")
}
})
 

//add transaction vala page open hoga overlay 
add.addEventListener("click",()=>{
    section4.style.display = "flex";  
    
})

closeBtn.addEventListener("click",()=>{ // ye close hona ke liye hai 
    section4.style.display = "none";
})




// ye todod jaise logic hai uska content  hai ye transaction app ke dashboard per show ho ga 


let save = document.querySelector(".save-btn")
let transactions = JSON.parse(localStorage.getItem("transaction")) || []


let editIndex = null;
save.addEventListener("click", () => {
    let type = document.querySelector("#type").value.toLowerCase();;
    let description = document.querySelector("#description").value;
    let amount = document.querySelector("#amount").value;
    let date = document.querySelector("#date").value;
    let category = document.querySelector("#category").value;
//ye object bana ga 
    let transaction = {
        type,
        description,
        amount: Number(amount) || 0,
        date,
        category,
    };

    // cheze add or edit chanae ka liye 
    if (editIndex !== null) {
        transactions[editIndex] = transaction;
        editIndex = null;
    } else {
        transactions.push(transaction);
    }

    // save kara localStorage or vlaue accept in parse akr kle ga 
    localStorage.setItem("transaction", JSON.stringify(transactions));

    // UI update
    console.log(document.querySelector("#balance"));
   renderDashboard()

    //  yw pura value ko khali karan ko kam atata hai 
    document.querySelector("#type").value = "";
    document.querySelector("#description").value = "";
    document.querySelector("#amount").value = "";
    document.querySelector("#date").value = "";
    document.querySelector("#category").value = "";
});


// eidt ka alag se input 
function editTransaction(index) {
    let t = transactions[index];

    document.querySelector("#type").value = t.type;
    document.querySelector("#description").value = t.description;
    document.querySelector("#amount").value = t.amount;
    document.querySelector("#date").value = t.date;
    document.querySelector("#category").value = t.category;

    editIndex = index;
      section4.style.display = "flex";
}
 
function ui() {
  let income = 0;
  let expense = 0;

  for (let i = 0; i < transactions.length; i++) {
    let t = transactions[i];

    if (t.type == "income") {
      income += Number(t.amount);
    } else {
      expense += Number(t.amount);
    }
  }

  update(income, expense);
   
 }
function update(income, expense) {
    document.querySelector("#income").innerText = income;
    document.querySelector("#expense").innerText = expense;
     document.querySelector("#displayBalance").innerText = income - expense;
     document.querySelector("#balance").innerText = transactions.length;
}

// ye dash board ke liye hai ye jo show hoga 
// function saveToLocal(){
//     localStorage.setItem("transaction", JSON.stringify(transactions));
// }

// delete ka logic
function deleteTransaction(index){
transactions.splice(index,1);
ui();
saveToLocal();  
displayTransaction();
}

function renderDashboard() {
    displayTransaction();
    ui();
}

// jo changes upar dash board per dekha ga 
function displayTransaction() {
    let tbody = document.querySelector("#tbody");
    tbody.innerHTML = "";

    transactions.forEach((t, index) => {
        tbody.innerHTML += `
        <tr>
            
            <td>${t.date}</td>
            <td>${t.description}</td>
            <td><span class="category">${t.category}</span></td>
            <td>${t.amount}</td>
            <td class="actions">
                <i onclick="editTransaction(${index})" class="ri-pencil-fill edit"></i>
                <i onclick="deleteTransaction(${index})" class="ri-delete-bin-fill delete"></i>
            </td>
        </tr>
        `;
    });
}

//search 
let search = document.querySelector("#searchBox")
if(search){
search.addEventListener("input",()=>{
     let value = search.value.toLowerCase();

    let rows = document.querySelectorAll("#tbody tr");
     rows.forEach((row)=>{
         let text = row.innerText.toLowerCase();
      row.style.display = text.includes(value) ? "" : "none";
    });

     })}

//===============================filter===========================
let filter = document.querySelector("#filter");

filter.addEventListener("change", () => {
    let value = filter.value;
    let rows = document.querySelectorAll("#tbody tr");

    rows.forEach((row) => {

         let amount = parseFloat(row.children[3].innerText);
        if (value === "all") {
            row.style.display = "";
        }
        else if (value === "income") {
            row.style.display = amount > 0 ? "" : "none";
        }
        else if (value === "expense") {
              row.style.display = amount > 0 ? "none" : "";
        }
    });
});
displayTransaction();
ui()
// document.querySelector("#search-box").value = "";

//____________________________________________________reset btn__________________________________________
let reset = document.querySelector(".reset-btn");
 reset.addEventListener("click",()=>{
let tbody = document.querySelector("#tbody");
//ye array ke liye
 let transactions = [];
localStorage.removeItem("transaction");
tbody.innerHTML = "";

income = 0;
expense = 0;
balance = 0;
document.querySelector("#income").innerText = "0";
document.querySelector("#expense").innerText = "0";
document.querySelector("#displayBalance").innerText = "0";
document.querySelector("#balance").innerText = "0";
tbody.innerHTML = "";
 })

 //===============================setting=====================================
// settingBtn.addEventListener("click", () => {
//     dashboard.style.display = "none";
//     settings.classList.add("show");
// });

// dashboardBtn.addEventListener("click", () => {
//     dashboard.style.display = "flex";
//     settings.classList.remove("show");
// });

let themeToggle1 = document.querySelector("#themeToggle1")
themeToggle1.addEventListener("change",()=>{
        console.log(themeToggle1.checked);
    if(themeToggle1.checked){
        document.body.classList.add("dark")
        
    }
    else{
          document.body.classList.remove("dark")
    }
})