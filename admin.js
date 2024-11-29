// Add a category
document.getElementById('add-category-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the page from reloading

    const categoryName = document.getElementById('category-name').value;

    fetch('/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: categoryName })
    })
        .then(response => response.json())
        .then(category => {
            alert(`Category "${category.name}" added successfully!`);
            loadCategories(); // Reload the categories list
        })
        .catch(error => {
            console.error('Error adding category:', error);
        });

    // Clear the input field
    document.getElementById('category-name').value = '';
});

// Add a word
document.getElementById('add-word-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the page from reloading

    const categoryId = document.getElementById('category-select').value;
    const wordName = document.getElementById('word-name').value;
    const singularText = document.getElementById('singular-text').value;
    const singularArabic = document.getElementById('singular-arabic').value;
    const pluralText = document.getElementById('plural-text').value;
    const pluralArabic = document.getElementById('plural-arabic').value;

    fetch('/words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryId, wordName, singularText, singularArabic, pluralText, pluralArabic })
    })
        .then(response => response.json())
        .then(word => {
            alert(`Word "${word.wordName}" added successfully!`);
            loadWords(categoryId); // Optionally reload words for the category
        })
        .catch(error => {
            console.error('Error adding word:', error);
        });

    // Clear the input fields
    document.getElementById('add-word-form').reset();
});

// Load categories into the category list
function loadCategories() {
    fetch('/categories')
        .then(response => response.json())
        .then(categories => {
            const categoryList = document.getElementById('category-list');
            const categorySelect = document.getElementById('category-select'); // Dropdown for adding words
            categoryList.innerHTML = ''; // Clear existing content
            categorySelect.innerHTML = ''; // Clear dropdown options

            categories.forEach(category => {
                // Add category to the list
                const li = document.createElement('li');
                li.textContent = category.name;
                categoryList.appendChild(li);

                // Add category to the dropdown
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error loading categories:', error);
        });
}

// Call the function to load categories when the page loads
loadCategories();

function loadCategoriesForDropdown() {
    fetch('/categories')
        .then(response => response.json())
        .then(categories => {
            const categorySelect = document.getElementById('category-select');
            categorySelect.innerHTML = ''; // Clear existing options

            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error loading categories for dropdown:', error);
        });
}

// Call this function when the page loads
loadCategoriesForDropdown();

function loadWords(categoryId) {
    fetch(`/categories/${categoryId}/words`)
        .then(response => response.json())
        .then(words => {
            const wordList = document.getElementById('word-list');
            wordList.innerHTML = ''; // Clear existing content

            if (words.length === 0) {
                wordList.innerHTML = '<p>No words available for this category.</p>';
            } else {
                words.forEach(word => {
                    const li = document.createElement('li');
                    li.textContent = `${word.wordName}: Singular (${word.singularText} - ${word.singularArabic}), Plural (${word.pluralText} - ${word.pluralArabic})`;
                    wordList.appendChild(li);
                });
            }
        })
        .catch(error => {
            console.error('Error loading words:', error);
        });
}
