// ==================================== Random 6 meals in first screen ====================================

for (i = 0; i < 6; i++) {
  const mealsOutput = document.getElementById("mealsOutput");
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((response) => response.json())
    .then((data) => {
      let meals = "";

      data.meals.forEach((meal) => {
        meals += `
                        <div class="col-sm-3 d-inline-block m-3">
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
    });
}

// ==================================== Search function ====================================

let searchResultPaginationArray = [];

function getMealsList() {
  searchResultPaginationArray = [];
  let input = document.getElementById("searchbar").value;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
    .then((response) => response.json())
    .then((data) => {

      if (data.meals !== null) {
        let meals = "";

        data.meals.forEach((meal) => {
          meals = `
                              <div class="card" data-id = "${meal.idMeal}">
                                  <div class="card-body">
                                      <h5 class="card-title">${meal.strMeal}</h5>
                                  </div>
                                  <img class="card-img-top" src="${meal.strMealThumb}" alt="Recipe image">
                                  <div class="card-body">
                                      <button type="button" class="btn btn-primary more-information" data-bs-toggle="modal" data-bs-target="#exampleModal">More Information</button>
                                  </div>
                              </div>
                          `;
          searchResultPaginationArray.push(meals);
          mealsOutput.innerHTML = meals;
          document.getElementById("searchbar").value = "";
        });
  
        // ==================================== Pagination ====================================
  
        if (searchResultPaginationArray.length > 6) {
          let list_items = searchResultPaginationArray;
  
          let pagination_element = document.getElementById("pagination");
  
          let current_page = 1;
          let cards = 6;
  
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
              item_element.classList.add("col-sm-3");
              item_element.classList.add("d-inline-block");
              item_element.classList.add("m-3");
              item_element.innerHTML = item;
  
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
  
          function PaginationButton(page) {
            let button = document.createElement("button");
            button.classList.add("btn");
            button.classList.add("btn-outline-primary");
            button.classList.add("pagination-buttons");
            button.innerText = page;
  
            if (current_page == page) button.classList.add("active");
  
            button.addEventListener("click", function () {
              current_page = page;
              DisplayList(list_items, mealsOutput, cards, current_page);
              let current_btn = document.querySelector("button.active");
              current_btn.classList.remove("active");
              button.classList.add("active");
            });
  
            return button;
          }
  
          DisplayList(list_items, mealsOutput, cards, current_page);
          SetupPagination(list_items, pagination_element, cards);
        } else {
          let pagination_element = document.getElementById("pagination");
          let mealsOutput = document.getElementById("mealsOutput");
          mealsOutput.innerHTML = ""
          pagination_element.innerHTML = "";
  
          let parentDiv = document.createElement("div");
          parentDiv.classList.add("col-sm-3");
          parentDiv.classList.add("d-inline-block");
          parentDiv.classList.add("m-3");
  
          let appendingParentDiv = mealsOutput.appendChild(parentDiv);
  
          appendingParentDiv.innerHTML = meals;
        }
      } else {
        let pagination_element = document.getElementById("pagination");
        pagination_element.innerHTML = "";
        mealsOutput.innerHTML = `<h2 id="nothingFound">Nothing found!</h2>`
      }

    });
}

// ==================================== Modal window - Onclick: more information ====================================

window.onclick = function moreInformation(e) {
  if (e.target.classList.contains("more-information")) {
    let mealItem = e.target.parentElement.parentElement;

    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        let modalWindow = "";
        modalWindow = `
                    <img src="${data.meals[0].strMealThumb}" alt="recipe image" style="width: 65%; float: left; margin-right: 5%">
                    <p><b>Meal name: </b>${data.meals[0].strMeal}</p>
                    <p><b>Meal category: </b>${data.meals[0].strCategory}</p>
                    <p><b>Meal area: </b>${data.meals[0].strArea}</p>
                    <p><b>Meal ingredients: </b></p><ul>
                    `;

        for (i = 1; i <= 20; i++) {
          if (
            data.meals[0]["strIngredient" + i] !== null &&
            data.meals[0]["strIngredient" + i] !== "" &&
            data.meals[0]["strIngredient" + i] !== " "
          ) {
            modalWindow += `<li>${data.meals[0]["strIngredient" + i]}</li>`;
          }
        }

        modalWindow += `
        </ul><p style="clear: left;"><b>Meal instructions: </b>${data.meals[0].strInstructions}</p>
        <p><b>YouTube Link: </b><a href="${data.meals[0].strYoutube}" target="_blank">${data.meals[0].strYoutube}</a></p>
        `;
        let modalWindowOutput = document.getElementById("modalwindowbody");
        modalWindowOutput.innerHTML = modalWindow;
      });
  }
}