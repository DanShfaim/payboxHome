const mongoose = require('mongoose');

const LogsSchema = new mongoose.Schema({
  cDate: { type: Date, default: Date.now },
  numberWhoDied: { type: Number }
});

const Logs = mongoose.model('Logs', LogsSchema);

exports.Logs = Logs;
