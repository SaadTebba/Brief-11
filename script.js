// fetch("www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata")
fetch("https://reqres.in/api/users")
.then(res => res.json())
.then(data => console.log(data))