let categories = document.getElementById('categories');

fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
    .then(response => response.json())
    .then(data => {
        for(i = 0; i < data.length; i++) {
            let categorieslist = document.getElementById('categorieslist');

            categorieslist.innerHTML = `
            <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">${data}</a></li>
            </ul>
            `
        }
    })