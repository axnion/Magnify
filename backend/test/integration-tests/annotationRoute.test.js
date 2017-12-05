const request = require('supertest');
const server = require('../../index');
const mongoose = require('mongoose');
const Account = require('../../model/account/schema');
const AccountFacade = require('../../model/account/facade');
const Company = require('../../model/company/schema');
const CompanyFacade = require('../../model/company/facade');
const Annotation = require('../../model/annotation/schema');
const AnnotationFacade = require('../../model/annotation/schema');
const Product = require('../../model/product/schema');
const ProductFacade = require('../../model/product/facade');

beforeAll(() =>
  CompanyFacade.addCompany({ name: 'TCompany' }).then(company =>
    AccountFacade.createAccount(
      {
        username: 'admin',
        password: 'pass',
        role: 'companyAdmin',
        company
      },
      company.id
    )
  )
);

afterAll(done => {
  Annotation.remove({}, err => {
    if (err) done(err);

    Account.remove({}, err => {
      if (err) done(err);

      Company.remove({}, err => {
        if (err) done(err);
        done();
      });
    });
  });
});

describe.skip('It posts an annotation', () => {
  test('Login admin user and post annotation', done => {
    const sut = request.agent(server);

    const credentials = {
      username: 'admin',
      password: 'pass',
      role: 'companyAdmin',
      company: 'TestCompany',
      admin: true
    };

    const annotation = {
      account: '', // add in next step
      annotation: 'I annotate this'
    };

    return sut
      .post('/account/login')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send(credentials)
      .then(response => {
        // convert retrieved id to ObjectId to use when posting the annotation
        const userId = mongoose.Types.ObjectId(response.body.user.id);
        annotation.account = userId;
        sut
          .post('/annotation')
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer ' + response.body.accessToken)
          .send(annotation)
          .end((err, resp) => {
            expect(resp.statusCode).toEqual(201);
            done();
          });
      });
  });
});

describe.skip('It Gets the route', () => {
  test('Get /annotation/:materialId should return 404', done => {
    const getAttempt = request.agent(server);

    getAttempt.get('/annotation/123').end((err, response) => {
      expect(response.statusCode).toEqual(404);
      done();
    });
  });
});
