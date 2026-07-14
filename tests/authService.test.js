const pool = require('../src/config/db');
const initDB = require('../src/models/initDB');
const { registerUser, loginUser } = require('../src/services/authService');

beforeAll(async () => {
  await initDB();
});

afterEach(async () => {
  await pool.query('DELETE FROM tasks');
  await pool.query('DELETE FROM users');
});

afterAll(async () => {
  await pool.end();
});

describe('authService', () => {
  test('registers a new user successfully', async () => {
    const result = await registerUser('Niom', 'niom@test.com', 'pass123');
    expect(result).toBe(true);

    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', ['niom@test.com']);
    expect(rows.length).toBe(1);
    expect(rows[0].name).toBe('Niom');
  });

  test('rejects registration with invalid email', async () => {
    const result = await registerUser('Niom', 'not-an-email', 'pass123');
    expect(result).toBe(false);
  });

  test('rejects duplicate email registration', async () => {
    await registerUser('Niom', 'dupe@test.com', 'pass123');
    const result = await registerUser('Someone', 'dupe@test.com', 'pass456');
    expect(result).toBe(false);
  });

  test('logs in with correct credentials', async () => {
    await registerUser('Niom', 'login@test.com', 'pass123');
    const user = await loginUser('login@test.com', 'pass123');
    expect(user).not.toBeNull();
    expect(user.email).toBe('login@test.com');
  });

  test('rejects login with wrong password', async () => {
    await registerUser('Niom', 'wrongpass@test.com', 'pass123');
    const user = await loginUser('wrongpass@test.com', 'wrongpass');
    expect(user).toBeNull();
  });
});
