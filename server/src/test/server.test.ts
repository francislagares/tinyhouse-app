import request from 'supertest';
import { app } from '../app';

describe('Server', () => {
  test('server runs without crashing', async () => {
    const result = await request(app).get('/').send('NodeJS Server');

    expect(result.status).toBe(200);
    expect(result.text).toBe('NodeJS Server');
  });
});
