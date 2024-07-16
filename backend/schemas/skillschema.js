const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    postName: { type: String },
    postEmail: { type: String },
    learn: { type: String },
    learnLv: { type: String },
    teach: { type: String },
    teachLv: { type: String },
    location: { type: String },
    postDate: { type: Date },
    description: { type: String },
    pplChosen: { type: [String], default: [] },
    deal: { type: String }
});

module.exports = mongoose.model('Skill', skillSchema);