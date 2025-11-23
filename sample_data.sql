-- Sample data for users table
INSERT INTO users (username, email, password) VALUES
('john_doe', 'john@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('jane_smith', 'jane@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'), 
('bob_johnson', 'bob@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Sample data for films table
INSERT INTO films (title, description, year, genre, director, duration, rating, poster_url) VALUES
('Inception', 'A thief who steals corporate secrets through dream-sharing technology.', 2010, 'Sci-Fi', 'Christopher Nolan', 148, 8.8, 'https://via.placeholder.com/300x450.png?text=Inception'),
('The Shawshank Redemption', 'Two imprisoned men bond over a number of years.', 1994, 'Drama', 'Frank Darabont', 142, 9.3, 'https://via.placeholder.com/300x450.png?text=Shawshank'),
('The Dark Knight', 'Batman faces the Joker, a criminal mastermind.', 2008, 'Action', 'Christopher Nolan', 152, 9.0, 'https://via.placeholder.com/300x450.png?text=Dark+Knight'),
('Pulp Fiction', 'The lives of two mob hitmen intertwine.', 1994, 'Crime', 'Quentin Tarantino', 154, 8.9, 'https://via.placeholder.com/300x450.png?text=Pulp+Fiction'),
('Forrest Gump', 'The story of a man with a low IQ who accomplishes great things.', 1994, 'Drama', 'Robert Zemeckis', 142, 8.8, 'https://via.placeholder.com/300x450.png?text=Forrest+Gump');

-- Sample data for tickets table
INSERT INTO tickets (user_id, film_id, seat_number, price) VALUES
(1, 1, 'A1', 12.50),
(1, 3, 'B5', 15.00),
(2, 2, 'C3', 10.00),
(2, 4, 'A7', 12.50),
(3, 5, 'D2', 11.00),
(1, 5, 'F10', 14.00);