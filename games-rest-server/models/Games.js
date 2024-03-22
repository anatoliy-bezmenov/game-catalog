const mongoose = require('mongoose');

const gamesSchemma = new mongoose.Schema({
    name: {
        type: String,
        minLength: [2, 'Name should be at least 2 characters'],
        required: true,
    },
    category: {
        type: String,
        minLength: [3, 'Category should be at least 3 characters'],
        required: true,
    },
    image: {
        type: String,
        match: [/^https?:\/\//, 'Invalid image url'],
        required: true,
    },
    description: {
        type: String,
        minLength: [10, 'Description should be at least 10 characters'],
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    createdAt: Date,
});

gamesSchemma.pre('save', function() {
    if (!this.createdAt) {
        this.createdAt = Date.now();
    };
});

const Games = mongoose.model('Games', gamesSchemma);

module.exports = Games;