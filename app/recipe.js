const mealContainer = document.getElementById('meal-details');

// Function to fetch and display meal details by idMeal
async function fetchMealDetails(data) {
    const { a: idMeal } = data;
    
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
        const data = await response.json();

        if (data.meals) {
            const meal = data.meals[0];
            displayMealDetails(meal);
        } else {
            mealContainer.innerHTML = '<p>Meal not found.</p>';
        }
    } catch (error) {
        mealContainer.innerHTML = `<p>Error fetching meal details: ${error.message}</p>`;
    }
}


// Function to display meal details
function displayMealDetails(meal) {
    const { strMeal, strYoutube, strMealThumb , strInstructions } = meal;
    const ingredients = [];

    // Extract the video ID from the YouTube URL
    const videoId = strYoutube.split("v=")[1] || "";
    const ampersandPosition = videoId.indexOf("&");
    const cleanVideoId = ampersandPosition !== -1 ? videoId.substring(0, ampersandPosition) : videoId;

    // Collect all non-empty ingredients and their measures
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push(`${ingredient} - ${measure ? measure.trim() : ''}`);
        } else {
            break;
        }
    }
    
    mealContainer.innerHTML = `
        <h1><u>${strMeal} Recipe</u></h1>
        
        <h2>Ingredients:</h2>
        <ul>
            ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
        <h2>Instructions:</h2>
        <p>${strInstructions}</p>
        <div class="video-container">
            <h2>Watch the Recipe Video:</h2>
            <iframe 
                src="https://www.youtube.com/embed/${cleanVideoId}" 
                allowfullscreen 
                style="width:100%; height:315px; border:0;">
            </iframe>
        </div>
        
    `;
}

const storedData = localStorage.getItem("sharedData");
if (storedData) {
    const data = JSON.parse(storedData);
    fetchMealDetails(data);
    } else {
    mealContainer.innerHTML = '<p>No Meal ID provided in URL.</p>';
    }

