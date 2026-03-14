document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

const menuButton = document.getElementById("menu-button");
const nav = document.getElementById("main-nav");

menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuButton.textContent = nav.classList.contains("open") ? "X" : "☰";
});

const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: false },
    { subject: 'WDD', number: 231, title: 'Frontend Web Development I', credits: 2, completed: false }
];

const courseContainer = document.getElementById("course-container");
const creditTotal = document.getElementById("credit-total");

function renderCourses(filteredCourses) {
    courseContainer.innerHTML = ""; 

    filteredCourses.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");
        
        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `<h3>${course.subject} ${course.number}</h3>`;
        courseContainer.appendChild(card);
    });

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    creditTotal.textContent = totalCredits;
}

document.getElementById("btn-all").addEventListener("click", () => renderCourses(courses));
document.getElementById("btn-wdd").addEventListener("click", () => renderCourses(courses.filter(c => c.subject === 'WDD')));
document.getElementById("btn-cse").addEventListener("click", () => renderCourses(courses.filter(c => c.subject === 'CSE')));

renderCourses(courses);