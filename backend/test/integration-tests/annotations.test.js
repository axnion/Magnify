const request = require('supertest');
const server = require('../../index');
const Account = require('../../model/account/schema');
const Company = require('../../model/company/schema');
const AccountFacade = require('../../model/account/facade');
const CompanyFacade = require('../../model/company/facade');
const Annotation = require('../../model/annotation/schema');
const AnnotationFacade = require('../../model/annotation/facade');

beforeAll(() =>
  CompanyFacade.addCompany({ name: 'TC' }).then(company =>
    AccountFacade.createAccount(
      {
        username: 'admin',
        password: 'pass',
        role: 'companyAdmin',
        company: 'TC'
      },
      company.id
    )
  )
);

afterAll(done => {
  Account.remove({}, err => {
    if (err) done(err);

    Company.remove({}, err => {
      if (err) done(err);

      done();
    });
  });
});

describe('Get annotations', () => {
  test('404 for getting nonexisting route', done => {
    const sut = request.agent(server);

    sut.get('/annotation/123').end((err, resp) => {
      expect(resp.statusCode).toEqual(404);
      done();
    });
  });
});

describe('Create annotation', () => {
  test('Create annotation', done => {
    const sut = request.agent(server);

    // login 

    // create product

    // create material
    
    // create annotation
  });
});

describe('It should not crash', () => {
  test('Get / returns 200', done => {
    const sut = request.agent(server);

    sut.get('/').end((err, resp) => {
      expect(resp.statusCode).toEqual(200);
      done();
    });
  });
});
