const request = require('supertest');
const app = require('../../server');

describe('Server Tests', () => {
  test('should return 500 for undefined routes', async () => {
    const res = await request(app).get('/undefined-route');
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Can't find /undefined-route on this server!");
  });

  test('should respond with 500 on server error', async () => {
    const res = await request(app).get('/api/v1/users/cause-server-error');
    expect(res.statusCode).toBe(500);
  });
});
