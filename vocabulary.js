// Fetch and display categories
fetch('/categories')
    .then(response => response.json())
    .then(categories => {
        const categoryList = document.getElementById('category-list');
        categoryList.innerHTML = ''; // Clear placeholder content

        categories.forEach(category => {
            // Create a card for each category
            const categoryCard = document.createElement('div');
            categoryCard.className = 'category-card';
            categoryCard.innerHTML = `
                <h3>${category.name}</h3>
                <button onclick="loadWords(${category.id}, '${category.name}')">View Words</button>
            `;
            categoryList.appendChild(categoryCard);
        });
    })
    .catch(error => {
        console.error('Error fetching categories:', error);
        document.getElementById('category-list').textContent = 'Failed to load categories.';
    });

// Load words for a specific category
function loadWords(categoryId, categoryName) {
    const wordList = document.getElementById('word-list');
    wordList.innerHTML = '<p>Loading words...</p>'; // Show loading message

    fetch(`/categories/${categoryId}/words`)
        .then(response => response.json())
        .then(words => {
            const categoryTitle = document.getElementById('category-title');
            wordList.innerHTML = ''; // Clear loading message
            categoryTitle.textContent = `Words in ${categoryName}`;

            if (words.length === 0) {
                wordList.innerHTML = '<p>No words available for this category.</p>';
            } else {
                words.forEach(word => {
                    const wordCard = document.createElement('div');
                    wordCard.className = 'word-card';
                    wordCard.innerHTML = `
                        <img src="images/${word.wordName.toLowerCase()}.jpg" alt="${word.wordName}" onerror="this.src='images/default.jpg'">
                        <h3>${word.wordName}</h3>
                        <p>Singular: <span class="arabic">${word.singularArabic}</span> (${word.singularText})</p>
                        <p>Plural: <span class="arabic">${word.pluralArabic}</span> (${word.pluralText})</p>
                        <div class="audio-controls">
                            <button onclick="playAudio('audio/${word.wordName.toLowerCase()}-singular.mp3')">Singular Audio</button>
                            <button onclick="playAudio('audio/${word.wordName.toLowerCase()}-plural.mp3')">Plural Audio</button>
                        </div>
                    `;
                    wordList.appendChild(wordCard);
                });
            }

            // Show the words section and hide the categories section
            document.getElementById('categories').style.display = 'none';
            document.getElementById('words').style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching words:', error);
            wordList.innerHTML = '<p>Failed to load words.</p>';
        });
}

// Go back to the categories list
function goBackToCategories() {
    document.getElementById('categories').style.display = 'block';
    document.getElementById('words').style.display = 'none';
}

// Play audio file
function playAudio(audioFile) {
    const audio = new Audio(audioFile);
    audio.play();
}

