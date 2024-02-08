CREATE DATABASE TaskManager;

USE TaskManager;

CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255)
);

CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  completed BOOLEAN DEFAULT false,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE shared_todos(
  id INT AUTO_INCREMENT PRIMARY KEY,
  todo_id INT,
  user_id INT,
  shared_with_id INT,
  FOREIGN KEY (todo_id) REFERENCES todos(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (shared_with_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (name, email, password) Values ('Jonathan', 'jhonathan-and@outlook.com', '1d23456');
INSERT INTO users (name, email, password) Values ('Andres', 'jhonathan-and2@outlook.com', '1d23456890');


INSERT INTO todos (title, user_id)
VALUES
('🏃‍♂️ Go for morning run', @user_id),
('🧘‍♀️ Practice yoga', @user_id),
('🍳 Prepare breakfast', @user_id),
('☕ Enjoy a cup of coffee', @user_id),
('🚿 Take a shower', @user_id),
('💼 Attend morning meeting', @user_id),
('📚 Read a chapter of a book', @user_id),
('👩‍💻 Work on coding project', @user_id),
('📝 Write in journal', @user_id),
('🚗 Commute to work', @user_id),
('💪 Exercise at the gym', @user_id),
('🍽️ Have a healthy lunch', @user_id),
('📅 Plan the day ahead', @user_id),
('🎤 Practice musical instrument', @user_id),
('🧹 Do household chores', @user_id),
('📧 Check and respond to emails', @user_id),
('👥 Connect with colleagues', @user_id),
('🌱 Water plants', @user_id),
('🚪 Lock up before leaving', @user_id),
('🛌 Go to bed', @user_id);


INSERT INTO shared_todos (todo_id, user_id, shared_with_id)
VALUES (1, 1, 2),

--get todos including shared todos by id

SELECT todos.*, shared_todos.shared_with_id
FROM todos
LEFT JOIN shared_todos ON todos.id = shared_todos.todo_id
WHERE todos.user_id = [user_id] OR shared_todos.shared_with_id = [user_id];