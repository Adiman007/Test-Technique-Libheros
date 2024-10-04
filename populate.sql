CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    end_date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert fake users
INSERT INTO users (name,last_name, email, password) VALUES
('user1','lastN1','user1@example.com', 'password1'),
('user2','lastN2','user2@example.com', 'password2'),
('user3','lastN3','user3@example.com', 'password3');

-- Insert todos
INSERT INTO todos (user_id, title, description, long_description, completed, end_date) VALUES
(1, 'Todo 1 for user 1', 'Description for todo 1', 'Long description for todo 1', FALSE, '2024-12-31'),
(3, 'Todo 1 for user 3', 'Description for todo 1', 'Long description for todo 1', FALSE, '2024-12-31'),
(3, 'Todo 2 for user 3', 'Description for todo 2', NULL, TRUE, '2024-12-30');


select * from todos;
select * from users;

