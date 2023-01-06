// ==================================== Random 6 meals appearing in the beginning ====================================

for (i = 0; i < 6; i++) {
  let mealsOutput = document.getElementById("mealsOutput");
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((response) => response.json())
    .then((data) => {
      let meals = "";

      if (data.meals) {
        data.meals.forEach((meal) => {
          meals += `
                        <div class="col-sm-3 d-inline-block m-5">
                            <div class="card" data-id = "${meal.idMeal}">
                                <div class="card-body">
                                    <h5 class="card-title">${meal.strMeal}</h5>
                                </div>
                                <img class="card-img-top" src="${meal.strMealThumb}" alt="Recipe image">
                                <div class="card-body">
                                    <button type="button" class="btn btn-primary more-information" data-bs-toggle="modal" data-bs-target="#exampleModal">More Information</button>
                                </div>
                            </div>
                        </div>
                        `;
        });
        mealsOutput.innerHTML += meals;
      }
    });
}

// ==================================== Search function ====================================

let generalMealsArray = [];

function getMealsList() {
  let input = document.getElementById("searchbar").value.trim();
  let mealsOutput = document.getElementById("mealsOutput");

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let meals = "";

      if (data.meals) {
        data.meals.forEach((meal) => {
          meals += `
                        <div class="col-sm-3 d-inline-block m-5">
                            <div class="card" data-id = "${meal.idMeal}">
                                <div class="card-body">
                                    <h5 class="card-title">${meal.strMeal}</h5>
                                </div>
                                <img class="card-img-top" src="${meal.strMealThumb}" alt="Recipe image">
                                <div class="card-body">
                                    <button type="button" class="btn btn-primary more-information" data-bs-toggle="modal" data-bs-target="#exampleModal">More Information</button>
                                </div>
                            </div>
                        </div>
                        `;
                        generalMealsArray.push(1);
        });
        mealsOutput.innerHTML = meals;
        document.getElementById("searchbar").value = "";
      }
    });
}

// ==================================== Filter by categories ====================================

fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
  .then((response) => response.json())
  .then((data) => {
    let categorieslist = document.getElementById("categorieslist");
    categorieslist.innerHTML = `<option selected>${data.meals[5].strCategory}</option>`;
    for (i = 0; i < data.meals.length; i++) {
      categorieslist.innerHTML += `<option>${data.meals[i].strCategory}</option> `;
    }
  });

// ==================================== Filter by areas ====================================

fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  .then((response) => response.json())
  .then((data) => {
    let arealist = document.getElementById("arealist");
    arealist.innerHTML = `<option selected>${data.meals[17].strArea}</option>`;
    for (i = 0; i < data.meals.length; i++) {
      arealist.innerHTML += `<option>${data.meals[i].strArea}</option> `;
    }
  });

// ==================================== Modal window - Onclick: more information ====================================

let moreInformation = document.getElementById("moreInformation");

window.onclick = function moreInformation(e) {
  if (e.target.classList.contains("more-information")) {

    let mealItem = e.target.parentElement.parentElement;

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        let modalWindow = "";
        modalWindow = 
        `
        <p><b>Meal name: </b>${data.meals[0].strMeal}</p>
        <img src="${data.meals[0].strMealThumb}" alt="recipe image" style="width: 75%;">
        <p><b>Meal category: </b>${data.meals[0].strCategory}</p>
        <p><b>Meal area: </b>${data.meals[0].strArea}</p>
        <p><b>Meal ingredients: </b></p><ul>
        `

        // for (j = 0; j < 20; j++) {
        //   if (data.meals[0].strIngredient[j] != "") {
            modalWindow += `<li>${data.meals[0].strIngredient1}</li>`
        //   }
        // }

        modalWindow += 
        `
        </ul><p><b>Meal instructions: </b>${data.meals[0].strInstructions}</p>
        <p><b>YouTube Link: </b><a href="${data.meals[0].strYoutube}" target="_blank">${data.meals[0].strYoutube}</a></p>
        `
        let modalWindowOutput = document.getElementById('modalwindowbody')
        modalWindowOutput.innerHTML = modalWindow;
      });
  }
};

// ==================================== Pagination for max 6 meals in each page ====================================

const list_items = generalMealsArray;

const list_element = document.getElementById("list");
const pagination_element = document.getElementById("pagination");

let current_page = 1;
let rows = 6;

function DisplayList(items, wrapper, rows_per_page, page) {
  wrapper.innerHTML = "";
  page--;

  let start = rows_per_page * page;
  let end = start + rows_per_page;
  let paginatedItems = items.slice(start, end);

  for (let i = 0; i < paginatedItems.length; i++) {
    let item = paginatedItems[i];

    let item_element = document.createElement("div");
    item_element.classList.add("item");
    item_element.innerText = item;

    wrapper.appendChild(item_element);
  }
}

function SetupPagination(items, wrapper, rows_per_page) {
  wrapper.innerHTML = "";

  let page_count = Math.ceil(items.length / rows_per_page);
  for (let i = 1; i < page_count + 1; i++) {
    let btn = PaginationButton(i, items);
    wrapper.appendChild(btn);
  }
}

function PaginationButton(page, items) {
  let button = document.createElement("button");
  button.innerText = page;

  if (current_page == page) button.classList.add("active");

  button.addEventListener("click", function () {
    current_page = page;
    DisplayList(items, list_element, rows, current_page);

    let current_btn = document.querySelector(".pagenumbers button.active");
    current_btn.classList.remove("active");

    button.classList.add("active");
  });

  return button;
}

DisplayList(list_items, list_element, rows, current_page);
SetupPagination(list_items, pagination_element, rows);