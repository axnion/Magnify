const sinon = require("sinon");
//const mongoose = require("mongoose");
//require("sinon-mongoose");

const Consumer = require("../../model/consumer/schema");

describe("Get  consumers", function() {
  test("Should get all consumers", done => {
    const mockConsumer = sinon.mock(Consumer);

    const expectedResult = { status: 200 };
    mockConsumer.expects("find").yields(null, expectedResult);
    Consumer.find(function(err, result) {
      mockConsumer.verify();
      mockConsumer.restore();
      expect(result.status).toEqual(200);
      done();
    });
  });

  test("Get specific consumer", done => {
    const mockConsumer = sinon.mock(Consumer);

    const expectedResult = { status: 200, user: [] };
    mockConsumer.expects("findOne").yields(null, expectedResult);
    Consumer.findOne(function(err, result) {
      mockConsumer.verify();
      mockConsumer.restore();
      expect(result.status).toEqual(200);
      done();
    });
  });
});

describe("Create a new consumer", function() {
  test("Should create a new consumer", done => {
    const mockConsumer = sinon.mock(
      new Consumer({ username: "foo", password: "bar" })
    );

    const consumer = mockConsumer.object;
    const expectedResult = { statusCode: 201 };
    mockConsumer.expects("save").yields(null, expectedResult);

    consumer.save(function(err, result) {
      mockConsumer.verify();
      mockConsumer.restore();
      expect(result.statusCode).toEqual(201);
      done();
    });
  });

  test("Should fail creating a new consumer", done => {
    const mockConsumer = sinon.mock(new Consumer({ username: "foo" }));
    const consumer = mockConsumer.object;
    const expectedResult = { statusCode: 500 };
    mockConsumer.expects("save").yields(expectedResult, null);
    consumer.save(function(err, result) {
      mockConsumer.verify();
      mockConsumer.restore();
      expect(err.statusCode).toEqual(500);
      done();
    });
  });
});
