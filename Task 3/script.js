const menubar = document.querySelector('#menu');
const Navbar = document.querySelector('.navbar');
menubar.onclick=()=>{
    menubar.classList.toggle('bx-x');
    Navbar.classList.toggle('active')
}
const section=document.querySelectorAll('section');
const navlink = document.querySelectorAll('header nav a')
window.onscroll = ()=>{
    section.forEach(sec=>{
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id')
        if(top>offset && top < offset + height){
            sec.classList.add('start-animation');
            navlink.forEach(links=>{
                links.classList.remove('active')
                document.querySelector('header nav a[href*='+id+']').classList.add('active')
              
            })
        }
    })
    var header = document.querySelector('.header');
    header.classList.toggle('sticky',window.scrollY>100)
    menubar.classList.remove('bx-x');
    Navbar.classList.remove('active')
}
//Contact

document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.querySelector(".contact form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const fullName = contactForm.querySelector("input[placeholder='Full Name']").value.trim();
            const email = contactForm.querySelector("input[placeholder='Email']").value.trim();
            const mobile = contactForm.querySelector("input[placeholder='Mobile Number']").value.trim();
            const subject = contactForm.querySelector("input[placeholder='Subject']").value.trim();
            const message = contactForm.querySelector("textarea").value.trim();

            if (fullName === "" || email === "" || mobile === "" || subject === "" || message === "") {
                swal("Oops!", "All fields are required.", "error");
                return;
            }

            if (!validateEmail(email)) {
                swal("Invalid Email!", "Please enter a valid email address.", "error");
                return;
            }

            if (!/^[0-9]{10}$/.test(mobile)) {
                swal("Invalid Mobile Number!", "Please enter a valid 10-digit mobile number.", "error");
                return;
            }

            swal("Thank You!", "Thanks for contacting us! We will get back to you soon.", "success");

            contactForm.reset(); // Clear the form after successful submission
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});


//login

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("#loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = loginForm.querySelector("input[type='text']").value.trim();
            const password = loginForm.querySelector("input[type='password']").value;

            if (email === "" || password === "") {
                alert("Both email and password are required.");
                return;
            }

            if (!validateEmail(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            alert("Login successful!");
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});

//register

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".register form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission

        const fullName = form.querySelector("input[type='text']").value.trim();
        const email = form.querySelector("input[type='email']").value.trim();
        const password = form.querySelector("input[type='password']:nth-of-type(1)").value;
        const confirmPassword = form.querySelector("input[type='password']:nth-of-type(2)").value;

        if (fullName === "" || email === "" || password === "" || confirmPassword === "") {
            alert("All fields are required.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        alert("Registration successful!");
        form.submit(); // Submit form if everything is valid
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});

//todo list
document.addEventListener("DOMContentLoaded", loadTasks);
document.getElementById("taskForm").addEventListener("submit", addTask);

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach((task, index) => displayTask(task, index));
}

function addTask(event) {
    event.preventDefault();
    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;
    const date = document.getElementById("taskDate").value; // 🆕 Get date

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ title, description, date }); // 🆕 Save date
    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTask({ title, description, date }, tasks.length - 1); // 🆕 Pass date to display
    document.getElementById("taskForm").reset();
}

function displayTask(task, index) {
    const taskList = document.getElementById("taskList");
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
    listItem.innerHTML = `
        <div>
            <strong style="font-size: 1.8rem;">${task.title}</strong><br>
        <span style="font-size: 1.5rem;">-   ${task.description}</span><br>
            <small style="font-size: 1rem;">${task.date}</small> <!-- 🆕 Show date -->
        </div>
        <span>
            <button class='btn' onclick='editTask(${index})'>Edit</button>
            <button class='btn' onclick='deleteTask(${index})'>Delete</button>
        </span>`;
    taskList.appendChild(listItem);
}

function editTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    const newTitle = prompt("Edit Task Title", tasks[index].title);
    const newDescription = prompt("Edit Task Description", tasks[index].description);
    const newDate = prompt("Edit Task Date", tasks[index].date); // 🆕 Prompt for date

    if (newTitle && newDescription && newDate) {
        tasks[index] = { title: newTitle, description: newDescription, date: newDate }; // 🆕 Save edited date
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}
