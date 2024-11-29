const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Import path only once
const { Category, Word, Detail } = require('./models');

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data

// Static Files (Serve Front-End)
app.use(express.static(path.join(__dirname, '.'))); // Serve static files from the current directory

// Routes
// Serve `index.html` for the root `/` route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Get all categories
app.get('/categories', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories); // Send back all categories as JSON
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new category
app.post('/categories', async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.create({ name });
        res.status(201).json(category); // Send back the created category
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get words by category ID
app.get('/categories/:id/words', async (req, res) => {
    const { id } = req.params;
    try {
        const words = await Word.findAll({ where: { categoryId: id } });
        res.json(words);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

app.get('/add-sample-categories', async (req, res) => {
    try {
        await Category.bulkCreate([
            { name: 'School Items' },
            { name: 'Furniture' },
            { name: 'Fruits and Vegetables' }
        ]);
        res.send('Sample categories added!');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/add-sample-words', async (req, res) => {
    try {
        // Find the School Items category
        const schoolItemsCategory = await Category.findOne({ where: { name: 'School Items' } });

        if (schoolItemsCategory) {
            // Add sample words linked to the School Items category
            await Word.bulkCreate([
                {
                    categoryId: schoolItemsCategory.id,
                    wordName: 'Pen',
                    singularText: 'Pen',
                    singularArabic: 'قلم',
                    pluralText: 'Pens',
                    pluralArabic: 'أقلام'
                },
                {
                    categoryId: schoolItemsCategory.id,
                    wordName: 'Book',
                    singularText: 'Book',
                    singularArabic: 'كتاب',
                    pluralText: 'Books',
                    pluralArabic: 'كتب'
                }
            ]);
        }

        // Find the Furniture category
        const furnitureCategory = await Category.findOne({ where: { name: 'Furniture' } });

        if (furnitureCategory) {
            // Add sample words linked to the Furniture category
            await Word.bulkCreate([
                {
                    categoryId: furnitureCategory.id,
                    wordName: 'Table',
                    singularText: 'Table',
                    singularArabic: 'طاولة',
                    pluralText: 'Tables',
                    pluralArabic: 'طاولات'
                },
                {
                    categoryId: furnitureCategory.id,
                    wordName: 'Chair',
                    singularText: 'Chair',
                    singularArabic: 'كرسي',
                    pluralText: 'Chairs',
                    pluralArabic: 'كراسي'
                }
            ]);
        }

        res.send('Sample words added!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding sample words.');
    }
});
app.post('/categories', async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.create({ name });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/words', async (req, res) => {
    try {
        const { categoryId, wordName, singularText, singularArabic, pluralText, pluralArabic } = req.body;
        const word = await Word.create({
            categoryId,
            wordName,
            singularText,
            singularArabic,
            pluralText,
            pluralArabic
        });
        res.status(201).json(word); // Send back the created word
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

