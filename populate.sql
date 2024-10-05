CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS todo_list (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    todolist_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    long_description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    end_date DATE NOT NULL,
    FOREIGN KEY (todolist_id) REFERENCES todo_list(id) ON DELETE CASCADE
);


INSERT INTO users (name, last_name, email, password) VALUES
('John', 'Doe', 'john.doe@example.com', 'password123'),
('Jane', 'Smith', 'jane.smith@example.com', 'password456');

INSERT INTO todo_list (name, user_id) VALUES
('Todo List 1', 1),
('Todo List 2', 2);

INSERT INTO todos (todolist_id, title, long_description, completed, end_date) VALUES
(1, 'Buy groceries', 'Buy milk, eggs, and bread', FALSE, '2024-12-01'),
(1, 'Call plumber', 'Fix the kitchen sink', FALSE, '2024-12-05'),
(2, 'Finish project', 'Complete the project report', TRUE, '2024-11-30'),
(2, 'Book flight', 'Book flight tickets for vacation', FALSE, '2024-12-10');

select * from todos;
select * from users;
select * from todo_list;

