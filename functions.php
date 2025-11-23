<?php
include 'config.php';

// Function to register a new user
function registerUser($username, $email, $password) {
    global $conn;
    
    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $hashed_password);
    
    if ($stmt->execute()) {
        return true;
    } else {
        return false;
    }
}

// Function to authenticate user
function authenticateUser($username, $password) {
    global $conn;
    
    $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE username = ? OR email = ?");
    $stmt->bind_param("ss", $username, $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            return $user;
        }
    }
    
    return false;
}

// Function to add a new film
function addFilm($title, $description, $year, $genre, $director, $duration, $rating, $poster_url) {
    global $conn;
    
    $stmt = $conn->prepare("INSERT INTO films (title, description, year, genre, director, duration, rating, poster_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssisssds", $title, $description, $year, $genre, $director, $duration, $rating, $poster_url);
    
    if ($stmt->execute()) {
        return true;
    } else {
        return false;
    }
}

// Function to get all films
function getAllFilms() {
    global $conn;
    
    $result = $conn->query("SELECT * FROM films ORDER BY created_at DESC");
    $films = array();
    
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $films[] = $row;
        }
    }
    
    return $films;
}

// Function to get film by ID
function getFilmById($id) {
    global $conn;
    
    $stmt = $conn->prepare("SELECT * FROM films WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows == 1) {
        return $result->fetch_assoc();
    }
    
    return null;
}

// Function to get films by genre
function getFilmsByGenre($genre) {
    global $conn;
    
    $stmt = $conn->prepare("SELECT * FROM films WHERE genre = ? ORDER BY created_at DESC");
    $stmt->bind_param("s", $genre);
    $stmt->execute();
    $result = $stmt->get_result();
    $films = array();
    
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $films[] = $row;
        }
    }
    
    return $films;
}
// Function to purchase a ticket
function purchaseTicket($user_id, $film_id, $seat_number, $price) {
    global $conn;
    
    $stmt = $conn->prepare("INSERT INTO tickets (user_id, film_id, seat_number, price) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("iisdi", $user_id, $film_id, $seat_number, $price);
    
    if ($stmt->execute()) {
        return $conn->insert_id; // Return the ID of the new ticket
    } else {
        return false;
    }
}

// Function to get user's tickets
function getUserTickets($user_id) {
    global $conn;
    
    $stmt = $conn->prepare("SELECT t.id, t.purchase_date, t.seat_number, t.price, f.title, f.poster_url
                           FROM tickets t
                           JOIN films f ON t.film_id = f.id
                           WHERE t.user_id = ?
                           ORDER BY t.purchase_date DESC");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $tickets = array();
    
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $tickets[] = $row;
        }
    }
    
    return $tickets;
}

// Function to get ticket by ID
function getTicketById($ticket_id) {
    global $conn;
    
    $stmt = $conn->prepare("SELECT t.id, t.purchase_date, t.seat_number, t.price,
                           u.username, f.title, f.description, f.poster_url
                           FROM tickets t
                           JOIN users u ON t.user_id = u.id
                           JOIN films f ON t.film_id = f.id
                           WHERE t.id = ?");
    $stmt->bind_param("i", $ticket_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows == 1) {
        return $result->fetch_assoc();
    }
    
    return null;
}

?>