function generateMeal(event) {
     console.log("f1");
    const caloriesInput = document.querySelector('input[name="username"]');
    if (caloriesInput.value === "") {
        return false;
    }
    event.preventDefault();
    fetch('js/meals.json')
        .then(response => response.json())
        .then(data => {
            generateDayMealPlan(data, parseInt(caloriesInput.value));
        })
        .catch(error => console.error('Error loading meals data:', error));
   
}

function getRandomMeal(meals) {
    return meals[Math.floor(Math.random() * meals.length)];
}

function getBestSnack(snacks, remainingCalories, usedSnacks) {
    let bestSnack = null;
    let closestDifference = Infinity;

    const availableSnacks = snacks.filter(snack => !usedSnacks.includes(snack));
    if (availableSnacks.length === 0) return false;

    availableSnacks.forEach(snack => {
        const snackCalories = parseNutritionalValue(snack.calories);
        const difference = Math.abs(snackCalories - remainingCalories);
        if (difference < closestDifference) {
            closestDifference = difference;
            bestSnack = snack;
        }
    });

    return bestSnack;
}

function getHighestCaloriesMeal(meals) {
    return meals.reduce((max, meal) => (parseNutritionalValue(meal.calories) > parseNutritionalValue(max.calories) ? meal : max), meals[0]);
}

function getLowestCaloriesMeal(meals) {
    return meals.reduce((min, meal) => (parseNutritionalValue(meal.calories) < parseNutritionalValue(min.calories) ? meal : min), meals[0]);
}

function parseNutritionalValue(value) {
    return parseInt(value.replace(/[^\d.-]/g, ''));
}

function generateDayMealPlan(mealsData, targetCalories) {
    const mealCardsContainer = document.getElementById('meal-cards-container');
    mealCardsContainer.innerHTML = '';

    let breakfasts = mealsData.filter(meal => meal.meal_time === 'breakfast');
    let lunches = mealsData.filter(meal => meal.meal_time === 'lunch');
    let dinners = mealsData.filter(meal => meal.meal_time === 'dinner');
    let snacks = mealsData.filter(meal => meal.meal_time === 'snack');

    let selectedMeals = [];
    let breakfast = null, lunch = null, dinner = null;
    let usedSnacks = [];

    if (targetCalories > 2000) {
        breakfast = getHighestCaloriesMeal(breakfasts);
    } else {
        breakfast = getRandomMeal(breakfasts);
    }

    if (lunches.length > 0) lunch = getRandomMeal(lunches);
    if (dinners.length > 0) dinner = getRandomMeal(dinners);

    if (breakfast) selectedMeals.push(breakfast);
    if (lunch) selectedMeals.push(lunch);
    if (dinner) selectedMeals.push(dinner);

    let totalCalories = selectedMeals.reduce((sum, meal) => sum + parseNutritionalValue(meal.calories), 0);
    let remainingCalories = targetCalories - totalCalories;

    while (remainingCalories > 150 && snacks.length > 0) {
        if (usedSnacks.length >= 3) {
            break; // Stop if we have 3 snacks already
        }
        let bestSnack = getBestSnack(snacks, remainingCalories, usedSnacks);
        if (!bestSnack) {
            break; // No suitable snack found or already included
        }
        selectedMeals.push(bestSnack);
        usedSnacks.push(bestSnack);
        totalCalories += parseNutritionalValue(bestSnack.calories);
        remainingCalories = targetCalories - totalCalories;
    }

    while (remainingCalories > 250 && lunches.length > 0) {
        let bestLunch = getBestSnack(lunches, remainingCalories, selectedMeals);
        if (!bestLunch) {
            break; // No suitable lunch found or already included
        }
        selectedMeals.push(bestLunch);
        totalCalories += parseNutritionalValue(bestLunch.calories);
        remainingCalories = targetCalories - totalCalories;
    }

    const divHeader = document.createElement('div');
    const titleHeader = document.createElement('h3');
    titleHeader.id = 'total-calories'
    titleHeader.innerHTML = `Total calories: ${totalCalories} kcal`;

    let totalProtein = selectedMeals.reduce((sum, meal) => sum + parseNutritionalValue(meal.protein), 0);
    let totalFat = selectedMeals.reduce((sum, meal) => sum + parseNutritionalValue(meal.fat), 0);
    let totalCarbs = selectedMeals.reduce((sum, meal) => sum + parseNutritionalValue(meal.carbohydrates), 0);

    let info = {
        protein: totalProtein,
        fat: totalFat,
        carbs: totalCarbs
    };

    const chartContainer = document.createElement('div');
    chartContainer.id = 'chartContainer';
    chartContainer.style.width = '250px';
    chartContainer.style.height = '180px';

    divHeader.appendChild(titleHeader)
    divHeader.appendChild(chartContainer);

    divHeader.classList.add('header-chart')

    mealCardsContainer.appendChild(divHeader);

    generateChart(info);

    selectedMeals.forEach(meal => {
        appendMealCard(mealCardsContainer, meal);
    });

    console.log(`Total Calories: ${totalCalories}`);
}

function appendMealCard(container, meal) {
    const card = document.createElement('div');
    card.classList.add('meal-card');

    const mealName = document.createElement('h3');
    mealName.textContent = meal.meal_time;
    card.appendChild(mealName);

    const image = document.createElement('img');
    image.src = meal.imageUrl;
    image.alt = meal.meal;
    image.classList.add('meal-image');

    const containerImg = document.createElement('div');
    containerImg.appendChild(image);
    containerImg.classList.add('container-img');

    const type = document.createElement('p');
    type.textContent = `${meal.meal}`;
    containerImg.appendChild(type);

    const servingsDropdown = document.createElement('select');
    servingsDropdown.classList.add('servings-dropdown');
    for (let i = 1; i <= 3; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.text = `${i} serving${i > 1 ? 's' : ''}`;
        servingsDropdown.appendChild(option);
    }
    servingsDropdown.addEventListener('change', (event) => updateServings(event, meal));

    const macrosContainer = document.createElement('div');
    macrosContainer.classList.add('macros-container');

    const calories = document.createElement('div');
    calories.textContent = `Calories: ${meal.calories}`;
    calories.classList.add('calories');
    macrosContainer.appendChild(calories);

    const carbo = document.createElement('div');
    carbo.textContent = `Carbohydrates: ${meal.carbohydrates}`;
    carbo.classList.add('carbohydrates');
    macrosContainer.appendChild(carbo);

    const protein = document.createElement('div');
    protein.textContent = `Protein: ${meal.protein}`;
    protein.classList.add('protein');
    macrosContainer.appendChild(protein);

    const fat = document.createElement('div');
    fat.textContent = `Fat: ${meal.fat}`;
    fat.classList.add('fat');
    macrosContainer.appendChild(fat);

    containerImg.appendChild(macrosContainer);
    containerImg.appendChild(servingsDropdown);

    card.appendChild(containerImg);
    
    container.appendChild(card);
}

function updateServings(event, meal) {
    const servings = parseInt(event.target.value);
    const card = event.target.closest('.meal-card');

    const caloriesElement = card.querySelector('.calories');
    const proteinElement = card.querySelector('.protein');
    const fatElement = card.querySelector('.fat');
    const carbsElement = card.querySelector('.carbohydrates');

    const baseCalories = parseNutritionalValue(meal.calories);
    const baseProtein = parseNutritionalValue(meal.protein);
    const baseFat = parseNutritionalValue(meal.fat);
    const baseCarbs = parseNutritionalValue(meal.carbohydrates);

    caloriesElement.textContent = `Calories: ${baseCalories * servings}`;
    proteinElement.textContent = `Protein: ${baseProtein * servings}`;
    fatElement.textContent = `Fat: ${baseFat * servings}`;
    carbsElement.textContent = `Carbohydrates: ${baseCarbs * servings}`;

    updateTotals();
}

function updateTotals() {
    const cards = document.querySelectorAll('.meal-card');
    let totalCalories = 0;
    let totalProtein = 0;
    let totalFat = 0;
    let totalCarbs = 0;
    let caloriesHeader = 0;

    cards.forEach(card => {
        const calories = parseNutritionalValue(card.querySelector('.calories').textContent);
        const protein = parseNutritionalValue(card.querySelector('.protein').textContent);
        const fat = parseNutritionalValue(card.querySelector('.fat').textContent);
        const carbs = parseNutritionalValue(card.querySelector('.carbohydrates').textContent);

        totalCalories += calories;
        totalProtein += protein;
        totalFat += fat;
        totalCarbs += carbs;
    });

    const titleHeader = document.getElementById('total-calories');
    if (titleHeader) {
        titleHeader.textContent = `Total calories: ${totalCalories} kcal`;
    }

    generateChart({ protein: totalProtein, fat: totalFat, carbs: totalCarbs });
}

function generateChart(info) {
    console.log(info)
    const elem = document.getElementById('chartContainer')
    elem.innerHTML = ''
    var chart = new CanvasJS.Chart("chartContainer",
        {
            title: {
                text: "Macros"
            },
            legend: {
                maxWidth: 200,
                itemWidth: 150
            },
            data: [
                {
                    type: "pie",
                    showInLegend: true,
                    toolTipContent: "{y}g",
                    legendText: "{indexLabel}",
                    dataPoints: [
                        {
                            y: info.protein,
                            indexLabel: "protein"
                        },
                        {
                            y: info.fat,
                            indexLabel: "fat"
                        },
                        {
                            y: info.carbs,
                            indexLabel: "carbs"
                        }
                    ]
                }
            ]
        });
    chart.render();
}

const mealFormButton = document.getElementById("mealForm");
mealFormButton.addEventListener("click", generateMeal);
