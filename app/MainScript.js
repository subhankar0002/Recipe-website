const SearchBar = document.getElementById("search-bar");
const SearchBtn = document.querySelector(".search-btn");
const SearchBox = document.querySelector(".search-box");
const RecipeCards = document.querySelector(".recipe-grid");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

// Search Bar control
const GetSearchbar = () => {
    SearchBar.style.display = "flex";
    navLinks.classList.remove("active");
    hamburger.innerHTML = "&#9776;";
};
const RemoveSearchbar = () => {
    SearchBar.style.display = "none";
    navLinks.classList.remove("active");
    hamburger.innerHTML = "&#9776;";
};

// menubar.....
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    if (navLinks.classList.contains("active")) {
        hamburger.innerHTML = "&#9776;"; // Change to close icon
    } else {
        hamburger.innerHTML = "&#9776;"; // Change back to hamburger icon
    }
});

// Add event listener to the search button
SearchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInput = SearchBox.value.trim();
    if (searchInput) {
        fetchRecipes(searchInput);
    } else {
        RecipeCards.innerHTML = `<p>Please enter a search term!</p>`;
    }
});


// Fetch Recipes and display all recipes
const fetchRecipes = async (query) => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();

        // Clear existing cards
        RecipeCards.innerHTML = "";

        // Check if meals exist
        if (data.meals) {
            data.meals.forEach(meal => {
                // Create a new recipe card
                const recipeDiv = document.createElement('div');
                recipeDiv.classList.add('recipe-card');
                recipeDiv.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <div class="card-content">
                        <h3>${meal.strMeal}</h3>
                        <p>A creamy classic ${meal.strArea} dish.</p>
                        <button class="btn" data-id="${meal.idMeal}">View Recipe</button>
                    </div>`;
                RecipeCards.appendChild(recipeDiv);
            });
            // Add event listener to view recipe button
            document.querySelectorAll(".btn").forEach((button) => {
            button.addEventListener("click", () => {
            const idMeal = button.getAttribute("data-id");
            DataGoTORecipePage(idMeal);
                });
            });
        } else {
            RecipeCards.innerHTML = `<p>No recipes found. Try searching for something else!</p>`;
        }
    } catch (error) {
        console.error("Error fetching recipes:", error);
        RecipeCards.innerHTML = `<p>There was an error fetching the recipes. Please try again later.</p>`;
    }
};
// data go to recipe page
const DataGoTORecipePage=(idMeal)=>{
    const data = { a: idMeal };
    localStorage.setItem("sharedData", JSON.stringify(data));
    window.location.href = 'app/RecipeDetails.html';
};

// main page loaded
document.addEventListener('DOMContentLoaded', () => {

    //  fetchRecipes(spaghetti);
    const spaghetti = async () => {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=Spaghetti`);
        const data = await response.json();
        RecipeCards.innerHTML = "";
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe-card');
        recipeDiv.innerHTML = `
            <img src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMeal}">
            <div class="card-content">
                <h3>${data.meals[0].strMeal}</h3>
                <p>A creamy classic ${data.meals[0].strArea} dish.</p>
                <button class="btn" id="abc" data-id="${data.meals[0].idMeal}">View Recipe</button>
            </div>`;
        RecipeCards.appendChild(recipeDiv);
    
        // Attach the event listener AFTER the button is created
        document.getElementById("abc").addEventListener("click", () => {
            const idMeal = document.getElementById("abc").getAttribute("data-id");
            DataGoTORecipePage(idMeal);
        });
    };
    spaghetti();

    //  fetchRecipes(chicken);
    const chicken = async () => {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=Chicken`);
        const data = await response.json();
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe-card');
        recipeDiv.innerHTML = `
            <img src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMeal}">
            <div class="card-content">
                <h3>${data.meals[0].strMeal}</h3>
                <p>A creamy classic ${data.meals[0].strArea} dish.</p>
                <button class="btn" id="abcd" data-id="${data.meals[0].idMeal}">View Recipe</button>
            </div>`;
        RecipeCards.appendChild(recipeDiv);
    
        // Attach the event listener AFTER the button is created
        document.getElementById("abcd").addEventListener("click", () => {
            const idMeal = document.getElementById("abcd").getAttribute("data-id");            
            DataGoTORecipePage(idMeal);
        });
    };
    chicken();

    //  fetchRecipes(Chocolate Cake);
    const Cake = async () => {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=Cake`);
        const data = await response.json();
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe-card');
        recipeDiv.innerHTML = `
            <img src="${data.meals[0].strMealThumb}" alt="${data.meals[0].strMeal}">
            <div class="card-content">
                <h3>${data.meals[0].strMeal}</h3>
                <p>A creamy classic ${data.meals[0].strArea} dish.</p>
                <button class="btn" id="cakeabcd" data-id="${data.meals[0].idMeal}">View Recipe</button>
            </div>`;
        RecipeCards.appendChild(recipeDiv);
    
        // Attach the event listener AFTER the button is created
        document.getElementById("cakeabcd").addEventListener("click", () => {
            const idMeal = document.getElementById("cakeabcd").getAttribute("data-id");
            DataGoTORecipePage(idMeal);
        });
    };
    Cake();

    // Add interactive hover effects
    const cards = document.querySelectorAll('.recipe-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
});

// export data from contact form
const scriptURL = 'https://script.google.com/macros/s/AKfycby47qwIKl8fAaWXNZW0UxLLHCSRKoWHTGcZoeaGVFP6e_aOj7zwajHSnbzuzE69P538/exec';
const form = document.forms['contact-form'];
form.addEventListener('submit', function (e) {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(() => {
      alert("Thank you for Your Feedback! Form is submitted");
      window.location.reload();
    })
    .catch(error => console.error('Error!', error.message));
});


