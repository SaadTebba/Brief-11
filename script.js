// ==================================== Random 6 meals in first screen ====================================

for (i = 0; i < 6; i++) {
  let mealsOutput = document.getElementById("mealsOutput");
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((response) => response.json())
    .then((data) => {
      let meals = "";

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
    });
}

// ==================================== Search function ====================================

let generalMealsArray = [];

function getMealsList() {
  generalMealsArray = [];
  let input = document.getElementById("searchbar").value;
  const mealsOutput = document.getElementById("mealsOutput");

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
    .then((response) => response.json())
    .then((data) => {
      let meals = "";

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
        generalMealsArray.push(meal.idMeal);
        mealsOutput.innerHTML = meals;
        document.getElementById("searchbar").value = "";
      });
    });
}

// ==================================== Pagination ====================================

if(generalMealsArray.length > 6) {
  console.log("message")
}

// ==================================== Categories list ====================================

fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
  .then((response) => response.json())
  .then((data) => {
    let categorieslist = document.getElementById("categorieslist");
    categorieslist.innerHTML = `<option selected>${data.meals[5].strCategory}</option>`;
    for (i = 0; i < data.meals.length; i++) {
      categorieslist.innerHTML += `<option>${data.meals[i].strCategory}</option>`;
    }
  });

// ==================================== Areas list ====================================

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
};

// ==================================== Filter by Lamb ====================================

fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Lamb`)
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
      mealsOutputSecondPage.innerHTML = meals;
    }
  });

// ==================================== Filter by category ====================================

function selectedOptionCategory() {
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
      mealsOutputSecondPage.innerHTML = meals;
    });
}

// ==================================== Filter by area ====================================

function selectedOptionArea() {
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
      mealsOutputSecondPage.innerHTML = meals;
    });
}

// ==================================== Filter by both category and area ====================================

function filterBoth() {
  let categorieslist = document.getElementById("categorieslist");
  let j = categorieslist.selectedIndex;
  let selectedValueCategory = categorieslist.options[j].value;

  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedValueCategory}`
  )
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
        mealsOutputSecondPage.innerHTML = meals;
      }
    });

  let arealist = document.getElementById("arealist");
  let i = arealist.selectedIndex;
  let selectedValueArea = arealist.options[i].value;

  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedValueArea}`
  )
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
        mealsOutputSecondPage.innerHTML = meals;
      }
    });
}
