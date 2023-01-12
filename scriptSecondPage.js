// ==================================== Modal window ====================================

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
          if (data.meals[0]["strIngredient" + i] !== null && data.meals[0]["strIngredient" + i] !== "" && data.meals[0]["strIngredient" + i] !== " ") {
            
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
};

// ==================================== Pagination ====================================

function pagination(arrayHere, output) {
  
  const pagination_element = document.getElementById("paginationSecondPage");
  const mealsOutputSecondPage = document.getElementById("mealsOutputSecondPage");

  if (arrayHere.length > 6) {


    let current_page = 1;
    let cards = 6;

    function DisplayList(wrapper, page) {
      wrapper.innerHTML = "";
      page--;

      let start = cards * page;
      let end = start + cards;
      let paginatedItems = arrayHere.slice(start, end);

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

    function SetupPagination() {
      pagination_element.innerHTML = "";

      let page_count = Math.ceil(arrayHere.length / cards);
      for (let i = 1; i < page_count + 1; i++) {
        let btn = PaginationButton(i, arrayHere);
        pagination_element.appendChild(btn);
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
        DisplayList(mealsOutputSecondPage, current_page);
        let current_btn = document.querySelector("button.active");
        current_btn.classList.remove("active");
        button.classList.add("active");
      });

      return button;
    }

    DisplayList(mealsOutputSecondPage, current_page);
    SetupPagination();

  } else {
    mealsOutputSecondPage.innerHTML = "";
    pagination_element.innerHTML = "";

    let parentDiv = document.createElement("div");
    parentDiv.classList.add("col-sm-3");
    parentDiv.classList.add("d-inline-block");
    parentDiv.classList.add("m-3");

    let appendingParentDiv = mealsOutputSecondPage.appendChild(parentDiv);

    appendingParentDiv.innerHTML = output;
  }
}

// ==================================== Categories list ====================================

fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
  .then((response) => response.json())
  .then((data) => {
    let categorieslist = document.getElementById("categorieslist");
    categorieslist.innerHTML = `<option selected hidden>${data.meals[5].strCategory}</option>`;
    for (i = 0; i < data.meals.length; i++) {
      categorieslist.innerHTML += `<option>${data.meals[i].strCategory}</option>`;
    }
  });

// ==================================== Areas list ====================================

fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  .then((response) => response.json())
  .then((data) => {
    let arealist = document.getElementById("arealist");
    arealist.innerHTML = `<option selected hidden>${data.meals[17].strArea}</option>`;
    for (i = 0; i < data.meals.length; i++) {
      arealist.innerHTML += `<option>${data.meals[i].strArea}</option> `;
    }
  });

// ==================================== Filter by Lamb ====================================

let filterByLambArray = [];

fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Lamb`)
  .then((response) => response.json())
  .then((data) => {
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
      filterByLambArray.push(meals);
    });
    pagination(filterByLambArray);
  });

// ==================================== Filter by category ====================================

let categoryPaginationArray = [];

function selectedOptionCategory() {
  categoryPaginationArray = [];
  let categorieslist = document.getElementById("categorieslist");
  let i = categorieslist.selectedIndex;
  let selectedValueCategory = categorieslist.options[i].value;

  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedValueCategory}`
  )
    .then((response) => response.json())
    .then((data) => {
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
        categoryPaginationArray.push(meals);
      });
      pagination(categoryPaginationArray, meals);
    });
}

// ==================================== Filter by area ====================================

let areaPaginationArray = [];

function selectedOptionArea() {
  areaPaginationArray = [];
  let arealist = document.getElementById("arealist");
  let i = arealist.selectedIndex;
  let selectedValueArea = arealist.options[i].value;

  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedValueArea}`
  )
    .then((response) => response.json())
    .then((data) => {
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
        areaPaginationArray.push(meals);
      });
      pagination(areaPaginationArray, meals);
    });
}

// ==================================== Filter by both category and area ====================================

let filterBothArray = [];
let ifConditionArray = [];

function filterBoth() {

  filterBothArray = [];
  ifConditionArray = [];

  let categorieslist = document.getElementById("categorieslist");
  let j = categorieslist.selectedIndex;
  let selectedValueCategory = categorieslist.options[j].value;

  let fetchCategory = fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedValueCategory}`
  );

  let arealist = document.getElementById("arealist");
  let i = arealist.selectedIndex;
  let selectedValueArea = arealist.options[i].value;

  let fetchArea = fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedValueArea}`
  );

  fetchCategory
    .then((response) => response.json())
    .then((firstData) => {
      fetchArea
        .then((response) => response.json())
        .then((secondData) => {
          for (i = 0; i < firstData.meals.length; i++) {
            let firstArray = firstData.meals[i];
            for (j = 0; j < secondData.meals.length; j++) {
              let secondArray = secondData.meals[j];
              if (firstArray.idMeal == secondArray.idMeal) {
                ifConditionArray.push("if worked");
                let meals = "";

                meals = `
                            <div class="card" data-id = "${firstArray.idMeal}">
                                <div class="card-body">
                                    <h5 class="card-title">${firstArray.strMeal}</h5>
                                </div>
                                <img class="card-img-top" src="${firstArray.strMealThumb}" alt="Recipe image">
                                <div class="card-body">
                                    <button type="button" class="btn btn-primary more-information" data-bs-toggle="modal" data-bs-target="#exampleModal">More Information</button>
                                </div>
                            </div>
                        `;
                filterBothArray.push(meals);
                pagination(filterBothArray, filterBothArray);
              }
            }
          }

          if (ifConditionArray.length == null || ifConditionArray.length == 0) {
            let pagination_element = document.getElementById(
              "paginationSecondPage"
            );
            let mealsOutputSecondPage = document.getElementById(
              "mealsOutputSecondPage"
            );
            pagination_element.innerHTML = "";
            mealsOutputSecondPage.innerHTML = `<h2 id="nothingFound">Nothing found!</h2>`;
          }
        });
    });
}