const localText = document.getElementById("localOnlyText");
const repoContainer = document.getElementById("repos");
const experienceContainer = document.getElementById("experienceList");
const educationContainer = document.getElementById("educationList");
const aboutMe = document.getElementById("aboutMe");
const skillsContainer = document.getElementById("skills");
const displayedRepos = [
  "Create-a-service-from-an-API-frontend", 
  "Create-a-service-from-an-API-backend", 
  "login-Tibbe90",
]

displayTextLocally();
fetchRepos();
fetchExperience();
fetchEducation();
renderAbout();
renderSkills();

async function displayTextLocally() {
  const getLocalText = await fetch(`./lokalText.md`)
  if (!getLocalText.ok) return;
  const text = document.createElement("p")
  text.innerHTML = await getLocalText.text();
  console.log(text);
  localText.appendChild(text);
}

async function fetchRepos() {
  const repos = await Promise.all (
    displayedRepos.map(repo => 
      fetch(`https://api.github.com/repos/Tibbe90/${repo}`)
      .then (res => res.json())
    )) 
      renderRepos(repos);
    }

function renderRepos(repos) {
  repos.forEach((repo) => {

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <a href="${repo.html_url}" target="_blank">${repo.name}</a>
      <p>${repo.description || "Ingen beskrivning"}</p>
    `;

    repoContainer.appendChild(card);
  });
}


function fetchExperience() {
  fetch("./arbetserfarenheter.json")
    .then(res => res.json())
    .then(data => renderExperience(data));
}

function fetchEducation() {
  fetch("./utbildningar.json")
    .then(res => res.json())
    .then(data => renderEducations(data));
}

function renderAbout() {
  aboutMe.innerHTML = `
    <p>Jag trivs bäst när jag får lösa problem, bygga kod och lära mig nya saker.</p>
    <p>Bakgrund inom industri har gett mig god stresstålighet och en vana att ta ansvar och arbeta strukturerat.</p>
    <p>Privat är jag familjefar med stort intresse för natur, film och bilprojekt – när det blir lugnare kvällar hittar du mig oftast vid datorn med ett spel eller ett eget litet kodprojekt.</p>
  `;
}

function renderSkills() {
  const skills = ["C#", "Java", "Spring Boot", "Jakarta EE", "JavaScript", "TypeScript", "React", "Git", "SQL", "HTML", "Postman"];

  skills.forEach(skill => {
    const span = document.createElement("span");
    span.classList.add("skill");
    span.textContent = skill;
    skillsContainer.appendChild(span);
  });
}

function renderExperience(data) {
  data.forEach(job => {
    const div = document.createElement("div");
    div.classList.add("job");

    div.innerHTML = `
      <div class="jobHeader">
        <strong>${job.Arbetstitel}</strong>
        <span class="meta">${job.Tidsperiod}</span>
      </div>
      <div class="company">${job.Företag}</div>
    `;

    experienceContainer.appendChild(div);
  });
  const references = document.createElement("h4")
  references.textContent = "Referenser kan delas på begäran"
  experienceContainer.appendChild(references)
}

function renderEducations(data) {
  data.forEach(edu => {
    const div = document.createElement("div");
    div.classList.add("job");

    div.innerHTML = `
      <div class="jobHeader">
        <strong>${edu.Utbildning}</strong>
        <span class="meta">${edu.Tidsperiod}</span>
      </div>
      <div class="company">${edu.Skola}</div>
    `;

    educationContainer.appendChild(div);
  });
  const certificates = document.createElement("h4")
  certificates.textContent = "Betyg kan delas på begäran"
  educationContainer.appendChild(certificates)
}
