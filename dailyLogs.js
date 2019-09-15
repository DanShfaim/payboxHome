const mongoose = require('mongoose');

const DailyLogsSchema = new mongoose.Schema({
  cDate: { type: Date, default: Date.now },
  numberWhoDied: { type: Number }
});

const date = new Date();
const formatDate = `${date.getDate()}-${date.getMonth() +
  1}-${date.getFullYear()}`;
const DailyLogs = mongoose.model(`dailyLogs_${formatDate}`, DailyLogsSchema);

exports.DailyLogs = DailyLogs;
