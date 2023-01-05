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
                            <div class="card">
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

function getMealsList() {
  let input = document.getElementById("searchbar").value.trim();
  const mealsOutput = document.getElementById("mealsOutput");

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`)
    .then((response) => response.json())
    .then((data) => {
      let meals = "";

      if (data.meals) {
        data.meals.forEach((meal) => {
          meals += `
                        <div class="col-sm-3 d-inline-block m-5">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">${meal.strMeal}</h5>
                                </div>
                                <img class="card-img-top" src="${meal.strMealThumb}" alt="Recipe image">
                                <div class="card-body">
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">More Information</button>
                                </div>
                            </div>
                        </div>
                        `;
        });
        mealsOutput.innerHTML = meals;
        document.getElementById("searchbar").value = "";
      }
    });
}

// ==================================== Filling modal window with information ====================================

let moreInformation = document.getElementById('moreInformation');
moreInformation.addEventListener('click', moreInformationFunction)

function moreInformationFunction(e) {
  e.preventDefault();
  console.log(e.target);
  console.log("test working");
//   if (e.target.classList.contains("more-information")) {
//     let mealItem = e.target.parentElement.parentElement;
//     console.log(mealItem);
//     fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772`)
//       .then((response) => response.json())
//       .then((data) => {
//         // console.log(data)
//         let modalwindowbody = document.getElementById("modalwindowbody");
//         for (i = 0; i < data.meals.length; i++) {
//           modalwindowbody.innerHTML += `
//             <p><b>Meal name:</b> ${data.meals[i].strMeal}</p>
//             <p><b>Meal category:</b> ${data.meals[i].strCategory}</p>
//             <p><b>Meal area:</b> ${data.meals[i].strArea}</p>
//             <p><b>Meal instructions:</b> ${data.meals[i].strInstructions}</p>
//             <p><b>Youtube link:</b> ${data.meals[i].strYoutube}</p>
//       `;
//         }
//       });
//   }
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

// ==================================== Pagination for max 6 meals in each page ====================================

// const list_items = mealsOutput;

// const list_element = document.getElementById("list");
// const pagination_element = document.getElementById("pagination");

// let current_page = 1;
// let rows = 6;

// function DisplayList(items, wrapper, rows_per_page, page) {
//   wrapper.innerHTML = "";
//   page--;

//   let start = rows_per_page * page;
//   let end = start + rows_per_page;
//   let paginatedItems = items.slice(start, end);

//   for (let i = 0; i < paginatedItems.length; i++) {
//     let item = paginatedItems[i];

//     let item_element = document.createElement("div");
//     item_element.classList.add("item");
//     item_element.innerText = item;

//     wrapper.appendChild(item_element);
//   }
// }

// function SetupPagination(items, wrapper, rows_per_page) {
//   wrapper.innerHTML = "";

//   let page_count = Math.ceil(items.length / rows_per_page);
//   for (let i = 1; i < page_count + 1; i++) {
//     let btn = PaginationButton(i, items);
//     wrapper.appendChild(btn);
//   }
// }

// function PaginationButton(page, items) {
//   let button = document.createElement("button");
//   button.innerText = page;

//   if (current_page == page) button.classList.add("active");

//   button.addEventListener("click", function () {
//     current_page = page;
//     DisplayList(items, list_element, rows, current_page);

//     let current_btn = document.querySelector(".pagenumbers button.active");
//     current_btn.classList.remove("active");

//     button.classList.add("active");
//   });

//   return button;
// }

// DisplayList(list_items, list_element, rows, current_page);
// SetupPagination(list_items, pagination_element, rows);
