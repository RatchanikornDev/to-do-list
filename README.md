# **Todo List App**

A simple, responsive web application to manage your daily tasks efficiently. Users can create, edit, delete, and mark tasks as completed with a clean and intuitive interface. This project integrates with a RESTful API to dynamically store and manage task data.

---

## **Features**
- **Add Tasks:** Quickly add new tasks using a simple input form.
- **Edit Tasks:** Modify task descriptions or mark them as completed through a modal dialog box.
- **Delete Tasks:** Remove tasks you no longer need.
- **Mark as Completed:** Track progress by marking tasks as completed.
- **Dynamic Data Management:** Tasks are stored and updated in real-time using an API.
- **Responsive Design:** Works seamlessly on desktop and mobile devices.

---

## **Technologies Used**
### **Frontend**
- **HTML5:** Provides the structure of the application.
- **CSS3:** Styles the app with a modern, user-friendly interface.
- **JavaScript:** Handles dynamic user interactions and API communication.

### **API Integration**
The app interacts with a RESTful API to manage tasks.
- **GET:** Fetch all tasks.
- **POST:** Add new tasks.
- **PUT:** Update tasks.
- **DELETE:** Remove tasks.

---

## **How It Works**
1. **On Page Load:**
   - Existing tasks are fetched from the API and displayed.

2. **Adding a Task:**
   - Enter a task description in the input box and click the "+" button.
   - The task is sent to the API and dynamically added to the task list.

3. **Editing a Task:**
   - Click the "Edit" button to open a modal.
   - Update the task description or mark it as completed.
   - Save changes, which are updated in both the UI and the API.

4. **Deleting a Task:**
   - Click the "Delete" button to remove a task.
   - The task is deleted from both the UI and the API.

---

## **Project Structure**
Todo List App

├── index.html          # Main HTML structure

├── style.css           # Stylesheet for the application

├── script.js           # JavaScript logic and API communication

└── README.md           # Project documentation

---

## **Setup and Usage**
### **Prerequisites**
- A local or hosted RESTful API for task management. (Use a tool like [json-server](https://github.com/typicode/json-server) to simulate an API if needed.)

### **Steps to Run the Project**

   1.   **Clone the repository:**   
 
 `` git clone https://github.com/RatchanikornDev/todo-list-app.git``
  
   2.  **Navigate to the project directory:**

       ``cd todo-list-app``
       
   4.	**Open the index.html file in your browser to run the application.**
   5.	**To use API functionality, ensure your API server is running at http://localhost:3000/todos.**

---

## **Example API Configuration (Using json-server)**

1.	**Install json-server:**
 
 ``npm install -g json-server``
 
2.	**Create a db.json file with the following content:**

``{
  "todos": []
}``

3. **Start the server:**	

``json-server --watch db.json --port 3000``

4.	**The API will be available at http://localhost:3000/todos.**

---

## **Future Improvements**

**•	Add user authentication for personalized task management.**

**•	Categorize tasks for better organization.**

**•	Add a priority feature to sort tasks.**

---

## **License**

This project is licensed under the MIT License. Feel free to use and modify it as needed.

---



 
