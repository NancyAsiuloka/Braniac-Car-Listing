const mongoose = require('mongoose');

jest.mock('mongoose', () => {
  const m = {
    connect: jest.fn(),
    connection: {
      close: jest.fn(),
    },
    Schema: jest.fn().mockImplementation(() => ({
      pre: jest.fn(),
      post: jest.fn(),
      methods: {},
      statics: {},
    })),
    model: jest.fn((name, schema) => {
      return {
        ...schema.methods,
        ...schema.statics,
        find: jest.fn().mockReturnThis(),
        findOne: jest.fn().mockReturnThis(),
        exec: jest.fn(),
      };
    }),
    Types: {
      ObjectId: jest.fn(),
    },
  };
  return m;
});

beforeEach(() => {
  jest.clearAllMocks();
});
