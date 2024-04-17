// document.getElementById("github-form").addEventListener("submit", function (event) {
//     event.preventDefault();
//     const searchQuery = document.getElementById("search").value;
//     searchGitHubUsers(searchQuery);
// });

// function searchGitHubUsers(searchQuery) {
//     const url = `https://api.github.com/search/users?q=${searchQuery}`;
//     const headers = { "Accept": "application/vnd.github.v3+json" };
//     fetch(url, { headers })
//         .then(response => response.json())
//         .then(data => {
//             const userList = document.getElementById("user-list");
//             userList.innerHTML = "";
//             data.items.forEach(user => {
//                 const listItem = document.createElement("li");
//                 const username = document.createElement("span");
//                 const avatar = document.createElement("img");
//                 const profileLink = document.createElement("a");
//                 username.textContent = user.login;
//                 avatar.src = user.avatar_url;
//                 avatar.alt = `${user.login}'s avatar`;
//                 profileLink.href = user.html_url;
//                 profileLink.textContent = "View Profile";
//                 listItem.appendChild(username);
//                 listItem.appendChild(document.createElement("br"));
//                 listItem.appendChild(avatar);
//                 listItem.appendChild(document.createElement("br"));
//                 listItem.appendChild(profileLink);
//                 listItem.addEventListener("click", function () {
//                     getUserRepositories(user.login);
//                 });
//                 userList.appendChild(listItem);
//             });
//         })
//         .catch(error => {
//             console.error("Error:", error);
//         });
// }
// function getUserRepositories(username) {
//     const url = `https://api.github.com/users/${username}/repos`;
//     const headers = { "Accept": "application/vnd.github.v3+json" };
//     fetch(url, { headers })
//         .then(response => response.json())
//         .then(data => {
//             const reposList = document.getElementById("repos-list");
//             reposList.innerHTML = "";
//             data.forEach(repo => {
//                 const listItem = document.createElement("li");
//                 const repoLink = document.createElement("a");
//                 repoLink.href = repo.html_url;
//                 repoLink.textContent = repo.name;
//                 listItem.appendChild(repoLink);
//                 reposList.appendChild(listItem);
//             });
//         })
//         .catch(error => {
//             console.error("Error:", error);
//         });
// }

// js/index.js

document.getElementById('github-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const searchInput = document.getElementById('search').value.trim();
    
    if (searchInput === '') {
      alert('Please enter a GitHub username');
      return;
    }
  
    fetchUserData(searchInput)
      .then(function(userData) {
        displayUserData(userData);
      })
      .catch(function(error) {
        console.error('Error fetching user data:', error);
        alert('Error fetching user data. Please try again.');
      });
  });
  
  function fetchUserData(username) {
    return fetch(`https://api.github.com/search/users?q=${username}`)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        return data.items; // Assuming the response contains an array of user objects
      });
  }
  
  function displayUserData(users) {
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
    
    userList.innerHTML = '';
    reposList.innerHTML = '';
  
    users.forEach(function(user) {
      const userItem = document.createElement('li');
      userItem.textContent = user.login;
      userItem.addEventListener('click', function() {
        fetchUserRepos(user.login);
      });
      userList.appendChild(userItem);
    });
  }
  
  function fetchUserRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(function(response) {
        return response.json();
      })
      .then(function(repos) {
        displayUserRepos(repos);
      })
      .catch(function(error) {
        console.error('Error fetching user repositories:', error);
        alert('Error fetching user repositories. Please try again.');
      });
  }
  
  function displayUserRepos(repos) {
    const reposList = document.getElementById('repos-list');
    reposList.innerHTML = '';
  
    repos.forEach(function(repo) {
      const repoElement = document.createElement('div');
      repoElement.innerHTML = `
        <div>
          <h3>${repo.name}</h3>
          <p>Description: ${repo.description || 'No description available'}</p>
          <p>Language: ${repo.language || 'Not specified'}</p>
          <p>Stars: ${repo.stargazers_count}</p>
          <p>Forks: ${repo.forks_count}</p>
          <p><a href="${repo.html_url}" target="_blank">View on GitHub</a></p>
        </div>
      `;
      reposList.appendChild(repoElement);
    });
  }
  
