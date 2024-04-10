let inputValue = document.getElementById("search")

inputValue.addEventListener("submit", fetchUsers)

function fetchUsers(e){
    let searchItem = inputValue.value
    e.preventDefault()
    fetch(`https://api.github.com/search/users?q=${inputValue}`)
    .then((res)=> res.json())
    .then(data => data.items.forEach(user => createList(data.items)))
    }
function createList(users){
    let ul = document.getElementById("user-list")
    let li = document.createElement("li")
    li.innerText = inputValue
    ul.appendChild(li)


}