const pool = require('../src/config/db');
const initDB = require('../src/models/initDB');
const { registerUser } = require('../src/services/authService');
const { addTask, editTask, deleteTask } = require('../src/services/taskService');

let userId;

beforeAll(async () => {
  await initDB();
});

beforeEach(async () => {
  await registerUser('Niom', 'taskuser@test.com', 'pass123');
  const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', ['taskuser@test.com']);
  userId = rows[0].id;
});

afterEach(async () => {
  await pool.query('DELETE FROM tasks');
  await pool.query('DELETE FROM users');
});

afterAll(async () => {
  await pool.end();
});

describe('taskService', () => {
  test('adds a task successfully', async () => {
    const result = await addTask(userId, 'Finish CI/CD pipeline', 'Wire up GitHub Actions', '2026-08-01', 'High');
    expect(result).toBe(true);

    const [tasks] = await pool.query('SELECT * FROM tasks WHERE userId = ?', [userId]);
    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Finish CI/CD pipeline');
    expect(tasks[0].status).toBe('Pending');
  });

  test('rejects task with invalid priority', async () => {
    const result = await addTask(userId, 'Bad task', 'desc', '2026-08-01', 'Urgent');
    expect(result).toBe(false);
  });

  test('edits an existing task', async () => {
    await addTask(userId, 'Old title', 'Old desc', '2026-08-01', 'Low');
    const [tasks] = await pool.query('SELECT id FROM tasks WHERE userId = ?', [userId]);
    const taskId = tasks[0].id;

    const result = await editTask(userId, taskId, 'New title', '', '', '');
    expect(result).toBe(true);

    const [updated] = await pool.query('SELECT * FROM tasks WHERE id = ?', [taskId]);
    expect(updated[0].title).toBe('New title');
  });

  test('deletes a task', async () => {
    await addTask(userId, 'To be deleted', 'desc', '2026-08-01', 'Medium');
    const [tasks] = await pool.query('SELECT id FROM tasks WHERE userId = ?', [userId]);
    const taskId = tasks[0].id;

    const result = await deleteTask(userId, taskId);
    expect(result).toBe(true);

    const [remaining] = await pool.query('SELECT * FROM tasks WHERE id = ?', [taskId]);
    expect(remaining.length).toBe(0);
  });
});
