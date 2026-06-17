const popup = document.getElementById("popup");
const closePopup = document.getElementById("close-popup");
const popupTitle = document.getElementById("popup-title");
const popupDescription = document.getElementById("popup-description");
const popupImage = document.getElementById("popup-image");
const popupSkills = document.getElementById("popup-skills");
const popupSkillsTitre = document.getElementById("popup-skills-titre");
const popupLearnedTitre = document.getElementById("popup-learned-titre");
const popupLearned = document.getElementById("popup-learned");

const projectButtons = document.querySelectorAll(".card .action button");

projectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const title = button.getAttribute("data-title");
    const description = button.getAttribute("data-description").replace(/\n/g, '<br>');
    const image = button.getAttribute("data-image");
    const skills = button.getAttribute("data-skills");
    const learned = button.getAttribute("data-learned");

    popupTitle.innerText = title;
    popupDescription.innerHTML = description; // Use innerHTML to render <br> tags
    popupImage.src = image;

    // Clear previous skills
    popupSkills.innerHTML = '';

    // Add new skills
    if (skills) {
      const skillsArray = skills.split(',').map(skill => skill.trim());
      skillsArray.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.classList.add('skill-box');
        const svgPath = `assets/icon/${skill.toLowerCase()}.svg`;
        const pngPath = `assets/icon/${skill.toLowerCase()}.png`;

        // Check if SVG exists
        fetch(svgPath, { method: 'HEAD' })
          .then(response => {
            if (response.ok) {
              skillElement.innerHTML = `<img src="${svgPath}" alt="${skill}" />`;
            } else {
              // If SVG doesn't exist, use PNG
              skillElement.innerHTML = `<img src="${pngPath}" alt="${skill}" />`;
            }
            popupSkills.appendChild(skillElement);
          })
          .catch(() => {
            // If fetch fails, use PNG
            skillElement.innerHTML = `<img src="${pngPath}" alt="${skill}" />`;
            popupSkills.appendChild(skillElement);
          });
      });
      popupSkillsTitre.innerText = "Skills:";
    } else {
      popupSkillsTitre.innerText = "";
    }

    // Add learned information
    if (learned) {
      popupLearnedTitre.innerText = "Information apprise:";
      popupLearned.innerText = learned;
    } else {
      popupLearnedTitre.innerText = "";
      popupLearned.innerText = "";
    }

    popup.style.display = "flex";
  });
});

closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === popup) {
    popup.style.display = "none";
  }
});