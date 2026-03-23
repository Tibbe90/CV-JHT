let repoList = document.getElementById("repos");
let experienceList = document.getElementById('experienceList')
let aboutMe = document.getElementById('aboutMe')

fetchRepos();
fetchArbetsErfarenheter()
printOmMig()

function fetchRepos() {
  fetch("https://api.github.com/users/Tibbe90/repos")
    .then((response) => response.json())
    .then((repos) => {
        repos.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
      printRepoLinks(repos);
    });
}

function printRepoLinks(repos) {
  repos.forEach((repo) => {
    let repositoryLi = document.createElement("li");
    repositoryLi.classList.add("repoLi");

    let repoLink = document.createElement("a");
    repoLink.href = repo.html_url;
    repoLink.textContent = repo.name;
    repoLink.classList.add("repoLink")

    let repoDescription = document.createElement("p");
    repoDescription.innerText =
      repo.description || "Ingen beskrivning är skapad.";
    repoDescription.classList.add("repoDescription")

    repositoryLi.appendChild(repoLink);
    repositoryLi.appendChild(repoDescription);
    repoList.appendChild(repositoryLi);
  });
}


async function fetchArbetsErfarenheter() {
  await fetch('./arbetserfarenheter.json')
  .then(res => res.json())
  .then(erfarenheter => {
    printErfarenheter(erfarenheter)
  })
}

function printErfarenheter(erfarenheter) {
 erfarenheter.forEach(erfarenhet => {
  console.log(erfarenhet.Arbetstitel)
  const experienceLi = document.createElement('li')
  experienceLi.classList.add("repoList")
experienceLi.innerHTML = `
  <p>
  Företag: "${erfarenhet.Företag}"
  Jobbtitel: "${erfarenhet.Arbetstitel}"
  Tidsperiod: "${erfarenhet.Tidsperiod}"
  </p> `
  experienceList.appendChild(experienceLi)
 })
}

function printOmMig() {
  aboutMe.innerHTML = `<span>Jag är ambitiös en student på Jönköping unversitet som studerar på Javautvecklare programmet och med en bakgrund i industriella miljöer där jag lärt mig stark stresshantering, ansvarstagande och snabb inlärning av nya system. Jag trivs bäst när jag får lösa problem, bygga robust kod och kontinuerligt utvecklas – teknikintresset driver mig att hela tiden vilja testa nya ramverk, verktyg och projekt.
Punktlig, engagerad och prestigelös lagspelare som tar ansvar för leverans från start till mål.
Privat är jag familjefar med stort intresse för natur, film och bilprojekt – när det blir lugnare kvällar hittar du mig oftast vid datorn med ett spel eller ett eget litet kodprojekt.</span>`
  
}
