let inputValue = document.getElementById("search");

inputValue.addEventListener("submit", fetchUsers);

function fetchUsers(e) {
    e.preventDefault();
    let searchTerm = inputValue.value;
    fetch(`https://api.github.com/search/users?q=${searchTerm}`)
    .then((res)=> res.json())
    .then(data => {
        createList(data.items);
    })
    .catch(error => {
        console.error('Error fetching users:', error);
    });
}

function createList(users) {
    let ul = document.getElementById("user-list");
    ul.innerHTML = ""; // Clear previous results
    users.forEach(user => {
        let li = document.createElement("li");
        li.innerText = user.login; // Display username
        ul.appendChild(li);
        li.addEventListener("click", () => {
            fetchUserRepos(user.login);
        });
    });
}

function fetchUserRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(res => res.json())
    .then(data => {
        console.log(data); // Here you can handle repository data
    })
    .catch(error => {
        console.error('Error fetching user repos:', error);
    });
}
