const _ = require('underscore');
const mongoose = require('mongoose');

// mongoDB Schemas
const { Logs } = require('./logs');
const { DailyLogs } = require('./dailyLogs');

// config - change to your local handpoint
// user & pwd - not secured (need to be defined by env)
const mongoAddress = `mongodb://admin:admin1@ds225442.mlab.com:25442/paybox`;

const postMongo = numberWhoDied => {
  // parallel writing to DB
  new Logs({ numberWhoDied }).save().catch(console.error);
  new DailyLogs({ numberWhoDied }).save().catch(console.error);
};
const getLastStanding = numOfPersons => {
  let persons = _.range(numOfPersons);
  let zordIndex = 0;
  while (persons.length !== 1) {
    if (zordIndex > persons.length - 3) zordIndex -= persons.length;
    // post mongo without await because it isn't necessary
    postMongo(persons[zordIndex + 2]);

    // kill right second person
    // can use _.filter(persons,callback)
    persons = persons.filter((p, i) => i !== zordIndex + 2);
    // inc by 2 and not by 3 because second person was killed
    zordIndex = zordIndex + 2;
  }
  return persons[0];
};

const connection = mongoose
  .connect(mongoAddress, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB...');
    console.log('getLastStanding Result:', getLastStanding(10));
  })
  .catch(err => console.error('Could not connect to MongoDB...', err));
