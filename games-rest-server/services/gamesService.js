const Games = require('../models/Games');
const User = require('../models/User');

exports.getOne = (gamesId) => {
    return Games.findById(gamesId);
};

exports.getOneDetailed = (gamesId) => {
    return Games.findById(gamesId).populate('owner')
};

// Get all Games
exports.getAll = () => {
    return Games.find();
};

exports.create = async (userId, gamesData) => {
    const createdGame = await Games.create({
        owner: userId,
        ...gamesData,
    });

    await User.findByIdAndUpdate(userId, {$push: { createdGame: createdGame._id }});

    return createdGame;
};

exports.edit = (gamesId, gamesData) => {
    return Games.findByIdAndUpdate(gamesId, gamesData, { runValidators: true });
}

exports.delete = (gamesId) => {
    return Games.findByIdAndDelete(gamesId);
};

exports.getLatest = () => {
    return Games.find().sort({ createdAt: -1 }).limit(3); // show the 3 latest created games
};

exports.search = (name) => {
    let query = {};

    if (name) {    
        query.name = new RegExp(name, 'i');
    }
    
    return Games.find(query);
};