const mongoose = require('mongoose');

const buildDB = require('../../../database/data/test');

const { getMyTrainers } = require('../../../database/queries/users/loaclLead');

const User = require('../../../database/models/User');

describe('Test getMyTrainers query', () => {
  beforeAll(async done => {
    // build dummy data
    await buildDB();
    done();
  });

  afterAll(() => {
    // close the connection
    mongoose.disconnect();
  });

  test('gets trainers with correct id', async done => {
    // get a user who has a group of trainers stored
    const lead = await User.findOne({ name: 'nisha' });

    getMyTrainers(lead.id).then(result => {
      expect(result).toBeDefined();
      expect(result.length).toBe(4);
      expect(result[0][0].name).toBeDefined();
      done();
    });
  });

  test('returns empty array if they dont have trainers', async done => {
    // get a user who has no group of trainers stored
    const lead = await User.findOne({ name: 'julie' });

    getMyTrainers(lead.id).then(result => {
      expect(result).toBeDefined();
      expect(result.length).toBe(0);
      done();
    });
  });
});
