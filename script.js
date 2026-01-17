let repoList = document.getElementById("repos");

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

fetchRepos();
