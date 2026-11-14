const membersUrl = "data/members.json";
const membersContainer = document.querySelector("#members-container");
const gridBtn = document.querySelector("#grid-btn");
const listBtn = document.querySelector("#list-btn");
const menuBtn = document.querySelector("#menu-button");
const primaryNav = document.querySelector("#primary-nav");

const LEVEL_MAP = {
  3: { label: "Gold Member", badgeClass: "badge-gold" },
  2: { label: "Silver Member", badgeClass: "badge-silver" },
  1: { label: "Member", badgeClass: "badge-member" }
};

async function getMembersData() {
  try {
    const response = await fetch(membersUrl);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    console.error("Error fetching member directory data:", error);
    membersContainer.innerHTML = `<p>Unable to load member directory at this time.</p>`;
  }
}

function displayMembers(members) {
  const fragment = document.createDocumentFragment();

  members.forEach((member) => {
    const card = document.createElement("section");
    card.className = "member-card";

    // Business Logo Image (Hidden automatically via CSS when in List View)
    const img = document.createElement("img");
    img.className = "member-logo";
    img.src = member.image;
    img.alt = `${member.name} logo`;
    img.loading = "lazy";
    img.width = 160;
    img.height = 100;

    // Business Name
    const name = document.createElement("h2");
    name.className = "member-name";
    name.textContent = member.name;

    // Membership Level Badge
    const levelInfo = LEVEL_MAP[member.membershipLevel] || LEVEL_MAP[1];
    const badge = document.createElement("span");
    badge.className = `member-badge ${levelInfo.badgeClass}`;
    badge.textContent = levelInfo.label;

    // Tagline
    const tagline = document.createElement("p");
    tagline.className = "member-tagline";
    tagline.textContent = member.tagline;

    // Address
    const address = document.createElement("p");
    address.className = "member-address";
    address.textContent = member.address;

    // Phone 
    const phone = document.createElement("p");
    phone.className = "member-phone";
    phone.textContent = member.phone;

    // Website Link
    const link = document.createElement("a");
    link.className = "member-link";
    link.href = member.website;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = new URL(member.website).hostname.replace("www.", "");
    link.setAttribute("aria-label", `Visit ${member.name} website`);

    card.append(img, name, badge, tagline, address, phone, link);
    fragment.appendChild(card);
  });

  membersContainer.replaceChildren(fragment);
}

gridBtn.addEventListener("click", () => {
  membersContainer.classList.add("members-grid");
  membersContainer.classList.remove("members-list");
  gridBtn.classList.add("active");
  listBtn.classList.remove("active");
  gridBtn.setAttribute("aria-pressed", "true");
  listBtn.setAttribute("aria-pressed", "false");
});

listBtn.addEventListener("click", () => {
  membersContainer.classList.add("members-list");
  membersContainer.classList.remove("members-grid");
  listBtn.classList.add("active");
  gridBtn.classList.remove("active");
  listBtn.setAttribute("aria-pressed", "true");
  gridBtn.setAttribute("aria-pressed", "false");
});

menuBtn.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modification: ${document.lastModified}`;

getMembersData();