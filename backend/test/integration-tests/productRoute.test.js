const request = require('supertest');
const server = require('../../index');
const Account = require('../../model/account/schema');
const Company = require('../../model/company/schema');
const AccountFacade = require('../../model/account/facade');
const CompanyFacade = require('../../model/company/facade');
const Product = require('../../model/product/schema');
const ProductFacade = require('../../model/product/facade');

beforeAll(() => {
  CompanyFacade.addCompany({ name: 'TestCompany' }).then(company =>
    AccountFacade.createAccount(
      {
        username: 'admin',
        password: 'pass',
        role: 'companyAdmin',
        company: 'TestCompany'
      },
      company.id
    )
  );
});

afterAll(done => {
  Account.remove({}, err => {
    if (err) done(err);

    Company.remove({}, err => {
      if (err) done(err);
    });

    Product.remove({}, err => {
      if (err) done(err);
      done();
    });
  });
});

describe.skip('Test GET', () => {
  test('login using correct credentials', done => {
    const authAttempt = request.agent(server);

    authAttempt.get('/product').end((err, resp) => {
      expect(resp.statusCode).toEqual(200);
      done();
    });
  });

  test('Create and get product', done => {
    const authAttempt = request.agent(server);

    const obj = {
      name: 'thingy',
      material: [
        {
          url: 'http://www.pdf995.com/samples/pdf.pdf',
          title: 'bla',
          description: 'descriptive'
        }
      ]
    };

    return authAttempt
      .post('/account/login')
      .send({
        username: 'admin',
        password: 'pass',
        role: 'companyAdmin',
        company: 'TestCompany'
      })
      .then(resp => {
        authAttempt
          .post('/product')
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer ' + resp.body.accessToken)
          .send(obj)
          .then(product => {
            const productId = product.body._id;
            const materialId = product.body.material[0]._id;
            const connString =
              '/product/' + productId + '/material/' + materialId;
            console.log(connString);
            authAttempt.get('/product/' + productId).end((err, response) => {
              if (err) console.log(err);
              console.log(product.body._id);
              console.log(product.body.material[0]._id);
              console.log(response.body);
              expect(response.statusCode).toEqual(200);
              done();
            });
          });

        //ProductFacade.getMaterialFile()
        /* .end((err, response) => {
            if (err) console.log(err);
            console.log(response.body);
            expect(response.statusCode).toEqual(200);
            done();
          }); */
      });
  });

  test('Get product', done => {
    const authAttempt = request.agent(server);

    authAttempt.get('/product').then(products => {
      const productId = products.body[0]._id;
      const materialId = products.body[0].material[0]._id;
      console.log(productId);
      console.log(materialId);
      authAttempt
        .get('/product/' + productId + '/material/' + materialId)
        .end((err, response) => {
          console.log(err);
          console.log(response.body);
          expect(response.statusCode).toEqual(200);
          done();
        });
    });
  });

  test.skip('get products', done => {
    const authAttempt = request.agent(server);

    authAttempt.get('/product').end((err, resp) => {
      if (err) console.log(err);
      console.log(resp);
      expect(resp.statusCode).toEqual(200);
      done();
    });
  });
  test.skip('Get using getProducts should return list of products', done => {
    const getAttempt = request.agent(server);

    getAttempt.get('/product/not-a-real-company').end((err, resp) => {
      if (err) console.log(err);
      console.log(resp.body);
      expect(resp.body.length).toEqual(0);
      expect(resp.statusCode).toEqual(200);
      done();
    });
  });
});

describe.skip('Test ProductFacade', () => {
  test.skip('Add a product to a company using its facade', done => {
    return CompanyFacade.findOne({ name: 'TestCompany' }).then(company => {
      ProductFacade.addProduct({ name: 'Thing' }, company._id).then(() => {
        const sut = request.agent(server);

        sut.get('/product').end((err, result) => {
          expect(result.body[0].name).toEqual('Thing');
          expect(result.body[0].company).toEqual(company._id.toString());
          done();
        });
      });
    });
  });
});
