let searchButton = document.getElementById('searchButton')

let input = document.getElementById('searchbar').value.trim();

fetch('www.themealdb.com/api/json/v1/1/filter.php?i=egg')
.then(response => response.json())
.then(data => console.log(data))