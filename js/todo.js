// Check for existing TODOs in localStorage or start fresh
let todos = JSON.parse(localStorage.getItem("todos")) || [];

const body = document.body;
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");

const table = document.getElementById("todo-table");
const thead = document.getElementById("todo-thead");

function renderTodos() {
    // clear then rebuild the list    
    table.innetHTML = "";
    
    if(todos != 0) {
      thead.innerHTML = `<th>Task:</th><th>Task Created On:</th><th>Task Completed:</th><th></th>`;
    }
    
    todos.forEach((todo, index) => {      
      const tr = document.createElement("tr");
      
      if (todo.completed) {
        tr.innerHTML = `     
        <td style="text-decoration:line-through; padding: 5px; text-align: left">${todo.text}</td><td style="padding: 5px;">${new Date(todo.timestamp).toLocaleString()}</td>
        <td><input type="checkbox" id="Completed" name="Completed" checked="checked">Completed</input></td>
        <td><button onclick="deleteTodo(${index})">Delete</button></td>
        `;                
      }
      else {        
        tr.innerHTML = `     
        <td style="padding: 5px; text-align: left">${todo.text}</td><td style="padding: 5px;">${new Date(todo.timestamp).toLocaleString()}</td>
        <td><input type="checkbox" id="Completed" name="Completed">Completed</input></td>
        <td><button onclick="deleteTodo(${index})">Delete</button></td>
        `;
      }
      
      tr.addEventListener("click", () => toggleComplete(todo.text, tr));
      table.appendChild(tr);      
    });    
  }
  
// Add new TODO
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newToDo = {
        text: input.value.trim(),
        timestamp: Date.now(),
        completed: false
    };
    if (newToDo.text !== "") {
        todos.push(newToDo);
        localStorage.setItem("todos", JSON.stringify(todos));
        input.value = "";
        location.reload();
    }
});

// Delete TODO
function deleteTodo(index) {
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    location.reload();
    renderTodos();
}

// Load any saved TODOs on page load
renderTodos();

function saveTodosToLocalStorage(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function toggleComplete(todoText, li) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.map(todo => {
        if (todo.text == todoText) {
            todo.completed = !todo.completed;
        }
        return todo;
    });
    
    saveTodosToLocalStorage(todos); 
    console.log(todos);   
    li.classList.toggle("completed");
    location.reload();
}