const { DataTypes } = require('sequelize');
const sequelize = require('./database');

// Define the Category model
const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
});

// Define the Word model
const Word = sequelize.define('Word', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    categoryId: { type: DataTypes.INTEGER, allowNull: false },
    wordName: { type: DataTypes.STRING, allowNull: false },
    singularText: { type: DataTypes.STRING },
    singularArabic: { type: DataTypes.STRING },
    pluralText: { type: DataTypes.STRING },
    pluralArabic: { type: DataTypes.STRING }
});

// Define the Detail model
const Detail = sequelize.define('Detail', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    wordId: { type: DataTypes.INTEGER, allowNull: false },
    formType: { type: DataTypes.STRING, allowNull: false },
    imageURL: { type: DataTypes.STRING },
    audioPronunciationURL: { type: DataTypes.STRING },
    exampleSentence: { type: DataTypes.TEXT },
    exampleAudioURL: { type: DataTypes.STRING }
});

// Define relationships
Word.belongsTo(Category, { foreignKey: 'categoryId' });
Detail.belongsTo(Word, { foreignKey: 'wordId' });

module.exports = { sequelize, Category, Word, Detail };
