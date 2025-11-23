<?php
include 'config.php';
include 'functions.php';

session_start();

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$user_id = $_SESSION['user_id'];

// Get film ID from URL
$film_id = isset($_GET['film_id']) ? (int)$_GET['film_id'] : 0;

if ($film_id <= 0) {
    die("Invalid film ID");
}

// Get film details
$film = getFilmById($film_id);
if (!$film) {
    die("Film not found");
}

// Process ticket purchase
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $seat_number = $_POST['seat_number'];
    $price = $_POST['price'];
    
    // In a real application, you would validate seat availability here
    $ticket_id = purchaseTicket($user_id, $film_id, $seat_number, $price);
    
    if ($ticket_id) {
        $success_message = "Ticket purchased successfully! Ticket ID: " . $ticket_id;
    } else {
        $error_message = "Error purchasing ticket";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Purchase Ticket - <?php echo htmlspecialchars($film['title']); ?></title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .film-info {
            border: 1px solid #ddd;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 5px;
        }
        .ticket-form {
            border: 1px solid #ddd;
            padding: 15px;
            border-radius: 5px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input[type="text"], input[type="number"] {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }
        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
        .message {
            padding: 10px;
            margin-bottom: 15px;
            border-radius: 4px;
        }
        .success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
    </style>
</head>
<body>
    <h1>Purchase Ticket for "<?php echo htmlspecialchars($film['title']); ?>"</h1>
    
    <div class="film-info">
        <h2><?php echo htmlspecialchars($film['title']); ?></h2>
        <p><strong>Year:</strong> <?php echo $film['year']; ?></p>
        <p><strong>Genre:</strong> <?php echo htmlspecialchars($film['genre']); ?></p>
        <p><strong>Director:</strong> <?php echo htmlspecialchars($film['director']); ?></p>
        <p><strong>Duration:</strong> <?php echo $film['duration']; ?> minutes</p>
        <p><strong>Rating:</strong> <?php echo $film['rating']; ?></p>
        <p><strong>Description:</strong> <?php echo htmlspecialchars($film['description']); ?></p>
        <?php if ($film['poster_url']): ?>
            <img src="<?php echo htmlspecialchars($film['poster_url']); ?>" alt="Poster" style="max-width: 200px;">
        <?php endif; ?>
    </div>
    
    <?php if (isset($success_message)): ?>
        <div class="message success"><?php echo $success_message; ?></div>
    <?php endif; ?>
    
    <?php if (isset($error_message)): ?>
        <div class="message error"><?php echo $error_message; ?></div>
    <?php endif; ?>
    
    <div class="ticket-form">
        <h2>Ticket Information</h2>
        <form method="POST" action="">
            <div class="form-group">
                <label for="seat_number">Seat Number:</label>
                <input type="text" id="seat_number" name="seat_number" required>
            </div>
            
            <div class="form-group">
                <label for="price">Price ($):</label>
                <input type="number" id="price" name="price" step="0.01" min="0" value="10.00" required>
            </div>
            
            <button type="submit">Purchase Ticket</button>
        </form>
    </div>
    
    <p><a href="index.php">Back to Film List</a></p>
</body>
</html>