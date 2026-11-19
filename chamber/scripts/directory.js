document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

const menuButton = document.getElementById("menu-button");
const nav = document.getElementById("main-nav");

menuButton.addEventListener("click", () => {
    nav.classList.toggle("open");
    menuButton.textContent = nav.classList.contains("open") ? "X" : "☰";
});

const membersContainer = document.getElementById("members-container");
const gridBtn = document.getElementById("grid-btn");
const listBtn = document.getElementById("list-btn");

gridBtn.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
});

async function getMembers() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayMembers(data.members);
}

function getMembershipLabel(level) {
    if (level === 3) return "Gold";
    if (level === 2) return "Silver";
    return "Member";
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        const img = document.createElement("img");
        img.src = member.image;
        img.alt = `${member.name} logo`;
        img.loading = "lazy";
        img.width = 160;
        img.height = 100;

        const name = document.createElement("h2");
        name.textContent = member.name;

        const address = document.createElement("p");
        address.textContent = member.address;

        const phone = document.createElement("p");
        phone.textContent = member.phone;

        const level = document.createElement("p");
        level.textContent = `Level: ${getMembershipLabel(member.membershipLevel)}`;

        const link = document.createElement("a");
        link.href = member.website;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = member.website;

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(level);
        card.appendChild(link);

        membersContainer.appendChild(card);
    });
}

getMembers();
