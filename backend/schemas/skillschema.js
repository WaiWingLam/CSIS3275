const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    postuser: {type: String, required: true},
    skillName: { type: String, required: true},
    requestSkill: { type: String, required: true},
    location: { type: String, required: true},
    timeAvailable: { type: String, required: true},
    postDate: { type: Date, required: true},
    description: { type: String}
});

module.exports = mongoose.model('Skill', skillSchema);