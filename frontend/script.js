const todoContainer = document.querySelector(".todo-container");
const inputTodo = document.getElementById("input-todo");
const addTodo = document.getElementById("add-todo");

const modalBG = document.querySelector(".modal-background");
const closeModal = document.getElementById("close-modal");
const editTodoName = document.getElementById("edit-todo-name");
const editTodocompleted = document.getElementById("edit-todo-completed");
const savetodo = document.getElementById("save-todo");

let todoArray = [];
let currentEditTodo = null;

const URL = "http://localhost:3000/todos";

// ฟังก์ชันดึงข้อมูล todos จาก API
async function get_todos() {
    try {
        const resp = await fetch(URL); 
        const data = await resp.json();
        return data;
    } catch (err) {
        console.error("Error fetching todos:", err);
        return [];
    }
}

// ฟังก์ชันส่งข้อมูล todo ใหม่ไปยัง API
async function post_todos() {
    try {
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: inputTodo.value,
                completed: false,
            }),
        };
        const resp = await fetch(URL, options);
        const data = await resp.json();
        inputTodo.value = ''; // Clear input after adding
        return data.data; // Return the updated todos array
    } catch (err) {
        console.error("Error posting todo:", err);
    }
}

// ฟังก์ชันลบ todo จาก API
async function del_Todo(todoElem) {
    try {
        const confirmDelete = confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบ "${todoElem.name}"?`);
        if (!confirmDelete) return;

        const del_url = URL + "/" + todoElem.id;
        const resp = await fetch(del_url, {
            method: "DELETE",
        });
        const data = await resp.json();
        
        // อัปเดต UI หลังจากลบสำเร็จ
        todoArray = todoArray.filter(todo => todo.id !== todoElem.id);
        display_Todos(todoArray);
    } catch (err) {
        console.error("Error deleting todo:", err);
        alert('เกิดข้อผิดพลาดในการลบรายการ');
    }
}

// ฟังก์ชันแก้ไข todo ใน API
async function edit_Todo(todoElem) {
    try {
        let edit_url = URL + "/" + todoElem.id;
        let options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: todoElem.name,
                completed: todoElem.completed
            }),
        };

        const resp = await fetch(edit_url, options);
        const data = await resp.json();
        return data.data; // ส่งข้อมูล todos กลับ
    } catch (err) {
        console.error("Error editing todo:", err);
        return null;
    }
}

// ฟังก์ชันเปิด modal เพื่อแก้ไข todo
function open_modal(todoElem) {
    currentEditTodo = todoElem; // เก็บ todo ที่กำลังแก้ไข
    editTodoName.value = todoElem.name;
    editTodocompleted.checked = todoElem.completed;
    modalBG.style.display = "block";
}

// จัดการปิด Modal
closeModal.addEventListener("click", () => {
    modalBG.style.display = "none";
});

// จัดการบันทึก Todo
savetodo.addEventListener("click", (e) => {
    e.preventDefault(); // ป้องกันการ submit form
    
    if (currentEditTodo) {
        const editedTodo = {
            id: currentEditTodo.id,
            name: editTodoName.value,
            completed: editTodocompleted.checked
        };

        edit_Todo(editedTodo).then(updatedTodos => {
            if (updatedTodos) {
                // อัปเดต UI
                todoArray = updatedTodos;
                display_Todos(todoArray);
                modalBG.style.display = "none";
            }
        });
    }
});

// ฟังก์ชันแสดง todos ในหน้าจอ
function display_Todos(todoArr) {
    todoContainer.innerHTML = ""; // ล้างข้อมูลเดิมใน container

    todoArr.forEach((todoElem) => {
        let todo = document.createElement("div");
        todo.classList.add("todo");

        let todoInfo = document.createElement("div");
        todoInfo.classList.add("todo-info");
        let todoBtn = document.createElement("div");
        todoBtn.classList.add("todo-btn");

        let todoCompleted = document.createElement("input");
        todoCompleted.classList.add("todo-completed");
        todoCompleted.setAttribute("type", "checkbox");
        todoCompleted.checked = todoElem.completed;

        let todoName = document.createElement("p");
        todoName.classList.add("todo-name");
        todoName.innerHTML = todoElem.name;

        let todoEdit = document.createElement("button");
        todoEdit.classList.add("todo-edit");
        todoEdit.innerHTML = "Edit";
        todoEdit.addEventListener("click", (e) => {
            e.preventDefault();
            open_modal(todoElem); // เปิด modal เมื่อคลิก "Edit"
        });

        let todoDel = document.createElement("button");
        todoDel.classList.add("todo-delete");
        todoDel.innerHTML = "Delete";
        todoDel.addEventListener("click", (e) => {
            e.preventDefault();
            del_Todo(todoElem); // ลบ todo เมื่อคลิก "Delete"
        });

        todoInfo.appendChild(todoCompleted);
        todoInfo.appendChild(todoName);
        todoBtn.appendChild(todoEdit);
        todoBtn.appendChild(todoDel);

        todo.appendChild(todoInfo);
        todo.appendChild(todoBtn);

        todoContainer.appendChild(todo);
    });
}

// เรียกใช้ฟังก์ชัน get_todos เพื่อดึงข้อมูล todos และแสดงผล
get_todos()
    .then((todoArr) => {
        todoArray = todoArr;
        display_Todos(todoArray); // แสดง todos ใน UI
    })
    .catch((err) => console.log("Error fetching todos:", err));

// เพิ่ม todo ใหม่เมื่อคลิกปุ่ม "Add Todo"
addTodo.addEventListener("click", (e) => {
    e.preventDefault(); // ป้องกันการ submit form
    
    if (inputTodo.value !== "") {
        post_todos().then(newTodos => {
            if (newTodos) {
                todoArray = newTodos;
                display_Todos(todoArray);
            }
        });
    }
});