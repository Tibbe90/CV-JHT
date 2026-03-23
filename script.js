const repoContainer = document.getElementById("repos");
const experienceContainer = document.getElementById("experienceList");
const aboutMe = document.getElementById("aboutMe");
const skillsContainer = document.getElementById("skills");

fetchRepos();
fetchExperience();
renderAbout();
renderSkills();

function fetchRepos() {
  fetch("https://api.github.com/users/Tibbe90/repos")
    .then((response) => response.json())
    .then((repos) => {
        repos.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
      renderRepos(repos);
    });
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
}

function printErfarenheter(erfarenheter) {
 erfarenheter.forEach(erfarenhet => {
  console.log(erfarenhet.Arbetstitel)
  const experienceLi = document.createElement('li')
  experienceLi.classList.add("repoList")
experienceLi.innerHTML = `
  <p>
  Företag: ${erfarenhet.Företag}
  Jobbtitel: ${erfarenhet.Arbetstitel}
  Tidsperiod: ${erfarenhet.Tidsperiod}
  </p> `
  experienceList.appendChild(experienceLi)
 })
}

function renderAbout() {
  aboutMe.innerHTML = `
    <p>Jag är student på Jönköping universitet med inriktning Javautveckling.</p>
    <p>Jag trivs bäst när jag får lösa problem, bygga kod och lära mig nya saker.</p>
    <p>Bakgrund inom industri har gett mig stresstålighet och en bra känsla för ansvar.</p>
    <p>Privat är jag familjefar med stort intresse för natur, film och bilprojekt – när det blir lugnare kvällar hittar du mig oftast vid datorn med ett spel eller ett eget litet kodprojekt.</p>
  `;
}

function renderSkills() {
  const skills = ["Java", "Spring Boot", "Jakarta EE", "JavaScript", "Git", "SQL", "HTML", "Postman"];

  skills.forEach(skill => {
    const span = document.createElement("span");
    span.classList.add("skill");
    span.textContent = skill;
    skillsContainer.appendChild(span);
  });
}