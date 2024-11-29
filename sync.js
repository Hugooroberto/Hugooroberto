const { sequelize, Category, Word, Detail } = require('./models');

async function initializeDatabase() {
    try {
        await sequelize.sync({ force: true }); // Sync database and recreate tables
        console.log('Database synced successfully!');
    } catch (error) {
        console.error('Error syncing the database:', error);
    } finally {
        process.exit();
    }
}

initializeDatabase();
