const mongoose = require('mongoose');
const mongoDB_test = require('../config/keys').mongoURI_TEST

mongoose.connect(mongoDB_test);

const Trainer = require('../server/database/models/Trainer');

const validateRegisterTrainer = require('../server/validation/register-trainer-val');

// dummy data requests to be tested
const request1 =
{
  firstName: 'Tester',
  lastName: 'Jones',
  email: 'tester@tester.com',
  password: 'abcdef',
  password2: 'abcdef',
};

const request2 =
{
  firstName: 'T',
  lastName: '',
  email: 'tester@tester.com',
  password: '1234',
  password2: '1244',
};

const request3 =
{
  firstName: 'Tester',
  lastName: 'Jones Two',
  email: 'tester@tester.com',
  password: 'dfghjk',
  password2: 'dfghjk'
};

// start test build
describe('Test Trainer model', () => {
  // clear db before each test
  beforeAll(async () => {
    await Trainer.remove({});
  });
  // clear db afer each test
  afterEach(async () => {
    await Trainer.remove({});
  });
  // close connection after test
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // 1) check for Trainer model existence
  it('has a module', () => {
    expect(Trainer).toBeDefined();
  });

// 2) test to sign up Trainer using req 1
  it('gets a trainer', async () => {
    const { errors, isValid } = validateRegisterTrainer(request1);
    // check for errors
        if (!isValid) {
          return errors;
        } else {
    // register new trainer
     const testTrainer = new Trainer({
        firstName: request1.firstName,
        lastName: request1.lastName,
        email: request1.email,
        password: request1.password,
     });
    await testTrainer.save();
    const foundTrainer = await Trainer.findOne({ firstName: 'Tester' });
    const expected = 'Tester';
    const actual = foundTrainer.firstName;
    expect(actual).toEqual(expected);
    }
  });
// 3) test for validation of input
  it('returns an error object', async () => {
    const { errors, isValid } = validateRegisterTrainer(request2);
    // check for errors
        if (!isValid) {
          return errors;
        } else {
    const testTrainer2 = new Trainer({
      firstName: request2.firstName,
      lastName: request2.lastName,
      email: request2.email,
      password: request2.password,
    });
    await testTrainer2.save();
    const expected = {
      firstName: 'First name must be between 2 and 30 characters',
      lastName: 'Last name field is required',
      password: 'Password must be at least 6 characters',
      password2: 'Passwords must match'
    }
    const actual = errors;
    expect(actual).toEqual(expected);
  }
  });
  // 4) check validation of trainer already registered
  it('checks if email is already registered and returns error', async () => {
    // save test trainer as base to check if email already exists
    const testTrainer1 = new Trainer({
      firstName: 'Tester',
      lastName: 'Jones',
      email: 'tester@tester.com',
      password: 'abcdef',
    })
    await testTrainer1.save();
    // try to save second test trainer using email validation
    const { errors, isValid } = validateRegisterTrainer(request3);
    // check for errors
        if (!isValid) {
          return errors;
        } else {
      Trainer.findOne({ email: request3.email })
      .then(trainer => {
        if (trainer) {
          errors.email = 'Email already exists';
        } else {
         const testTrainer2 = new Trainer({
            firstName: request3.firstName,
            lastName: request3.lastName,
            email: request3.email,
            password: request3.password,
          })
          testTrainer2.save();
        }
         const expected = { email: 'Email already exists' };
         const actual = errors;
         expect(actual).toEqual(expected);
      })
    }
  })
});