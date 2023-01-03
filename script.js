// ==================================== Random 6 meals appearing in the beginning ====================================

for (i = 0; i < 6; i++) {
    let mealsOutput = document.getElementById('mealsOutput');
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let meals = "";

            if (data.meals) {
                data.meals.forEach(meal => {
                    meals +=
                        `
                        <div class="col-sm-3 d-inline-block m-5">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">${meal.strMeal}</h5>
                                </div>
                                <img class="card-img-top" src="${meal.strMealThumb}" alt="Recipe image">
                                <div class="card-body">
                                    <a href="#" class="btn btn-primary">More Information</a>
                                </div>
                            </div>
                        </div>
                        `;
                })
                mealsOutput.innerHTML += meals
            }
        })
}

// ==================================== Search function ====================================

function getMealsList() {

    let input = document.getElementById('searchbar').value.trim();
    let mealsOutput = document.getElementById('mealsOutput');

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let meals = "";

            if (data.meals) {
                data.meals.forEach(meal => {
                    meals +=
                        `
                        <div class="col-sm-3 d-inline-block m-5">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">${meal.strMeal}</h5>
                                </div>
                                <img class="card-img-top" src="${meal.strMealThumb}" alt="Recipe image">
                                <div class="card-body">
                                    <a href="#" class="btn btn-primary">More Information</a>
                                </div>
                            </div>
                        </div>
                        `;
                })
                mealsOutput.innerHTML = meals
            }
        })
    document.getElementById('searchbar').value = "";
}