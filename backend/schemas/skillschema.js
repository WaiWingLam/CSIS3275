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
    deal: { type: String },
    caseDone: { type: Boolean, default: false},
    rateFromLearner: { type: Number },
    rateFromTeacher: { type: Number}
});

module.exports = mongoose.model('Skill', skillSchema);