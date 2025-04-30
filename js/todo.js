// Lesson 06 - JSON-Powered TODO App

// Check for existing TODOs in localStorage or start fresh
let todos = JSON.parse(localStorage.getItem("todos")) || [];

const body = document.body;
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");

//const list = document.getElementById("todo-list");

const table = document.getElementById("todo-table");
const thead = document.getElementById("todo-thead");
//const table = document.createElement("table");

// insert missing-javascript here, you need to add two functions
function renderTodos() {
    // clear then rebuild the list
    //list.innerHTML = "";
    table.innetHTML = "";
    //thead.innerHTML = `<th>Task:</th><th>Task Created On:</th><th>Task Completed:</th><th></th>`;

    if(todos != 0) {
      thead.innerHTML = `<th>Task:</th><th>Task Created On:</th><th>Task Completed:</th><th></th>`;
    }
    //let i = 0;
    todos.forEach((todo, index) => {
      //const li = document.createElement("li");
      const tr = document.createElement("tr");
      //const tr = table.insertRow();
      //const checkbox = document.createElement("checkbox");
      /* Have to add the checkbox element to the local storage and save the status */
      //need to be able to see if todo is getting data as one entry or if it is being put in as an array.
      if (todo.completed) {
        tr.innerHTML = `     
        <td style="text-decoration:line-through; padding: 5px; text-align: left">${todo.text}</td><td style="padding: 5px;">${new Date(todo.timestamp).toLocaleString()}</td>
        <td><input type="checkbox" id="Completed" name="Completed" checked="checked">Completed</input></td>
        <td><button onclick="deleteTodo(${index})">Delete</button></td>${index}
        `;        
        //console.log(todo.completed);
        //console.log("Hello 1");
        /*<p style="text-decoration:line-through">${todo.text} - <em>${new Date(todo.timestamp).toLocaleString()}</em></p>        
        <input type="checkbox" id="Completed" name="Completed" checked="checked">Completed</input>
        <button onclick="deleteTodo(${index})">Delete</button>
        `;*/
      }
      else {
        /*for(let i = 0; i >= 3; i++){
            if(i==0)
            {
                const td = tr.insertCell();
                td.appendChild(document.createTextNode(`${todo.text} ${new Date(todo.timestamp).toLocaleString()}`));
                td.style.border = '1px solid black';
            }
            if(i==1){
                const td = tr.insertCell();
                td.innerHTML = `<input type="checkbox" id="Completed" name="Completed" checked="checked">Completed</input>`;
                td.style.border = '1px solid black';
            }
            if(i==2){
                const td = tr.insertCell();
                td.innerHTML = `<button onclick="deleteTodo(${index})">Delete</button>`;
                td.style.border = '1px solid black';
            }
        }*/
        tr.innerHTML = `     
        <td style="padding: 5px; text-align: left">${todo.text}</td><td style="padding: 5px;">${new Date(todo.timestamp).toLocaleString()}</td>
        <td><input type="checkbox" id="Completed" name="Completed">Completed</input></td>
        <td><button onclick="deleteTodo(${index})">Delete</button></td>${index}
        `;
        
        //const td = tr.insertCell();
        //td.appendChild(document.createTextNode(`${todo.text} ${new Date(todo.timestamp).toLocaleString()}`));
        //td.innerHTML = `<input type="checkbox" id="Completed" name="Completed" checked="checked">Completed</input>`;
        //td.innerHTML = `<button onclick="deleteTodo(${index})">Delete</button>`;
        //td.appendChild(document.createTextNode(td.innerHTML = `<input type="checkbox" id="Completed" name="Completed" checked="checked">Completed</input>`));
        //td.appendChild(document.createTextNode(`<input type="checkbox" id="Completed" name="Completed" checked="checked">Completed</input>`));
        //td.appendChild(document.createTextNode(`<button onclick="deleteTodo(${index})">Delete</button>`));
        //td.style.border = '1px solid black';
      /*tr.innerHTML = `
        <td style="text-decoration:line-through">${todo.text} - <em>${new Date(todo.timestamp).toLocaleString()}</em></td>
        <td><input type="checkbox" id="Completed" name="Completed" checked="checked">Completed</input></td>
        <td><button onclick="deleteTodo(${index})">Delete</button></td>
        </tr>
        </table>`;*/
      /*${todo.text} - <em>${new Date(todo.timestamp).toLocaleString()}</em>
        <input type="checkbox" id="Completed" name="Completed">Completed</input>
        <button onclick="deleteTodo(${index})">Delete</button>
        `;*/
        //console.log(todo[index], todo.text, " ", i);
        //i++;
      }
      //console.log("Hello 5");      
      tr.addEventListener("click", () => toggleComplete(todo.text, tr));
      //console.log("Hello 6");
      table.appendChild(tr);
      //body.appendChild(table);
      //console.log("Hello 3");
      //location.reload();
    });
    //console.log("outside loop", i);
  }

  /*function tableCreate() {
    const body = document.body,
          tbl = document.createElement('table');
    tbl.style.width = '100px';
    tbl.style.border = '1px solid black';
  
    for (let i = 0; i < 3; i++) {
      const tr = tbl.insertRow();
      for (let j = 0; j < 2; j++) {
        if (i === 2 && j === 1) {
          break;
        } else {
          const td = tr.insertCell();
          td.appendChild(document.createTextNode(`Cell I${i}/J${j}`));
          td.style.border = '1px solid black';
          if (i === 1 && j === 1) {
            td.setAttribute('rowSpan', '2');
          }
        }
      }
    }
    body.appendChild(tbl);
  }*/

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
        //renderTodos();
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
    console.log(todos);
}

//issue is here with everything getting "Completed"
function toggleComplete(todoText, li) {
  console.log("Hello 4");
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