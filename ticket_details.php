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

// Get ticket ID from URL
$ticket_id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($ticket_id <= 0) {
    die("Invalid ticket ID");
}

// Get ticket details
$ticket = getTicketById($ticket_id);

// Check if ticket belongs to current user
if (!$ticket || $ticket['user_id'] != $user_id) {
    die("Ticket not found or access denied");
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ticket Details #<?php echo $ticket['id']; ?></title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .ticket-header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 2px solid #007bff;
        }
        .ticket-id {
            font-size: 1.5em;
            color: #007bff;
            margin-bottom: 5px;
        }
        .ticket-content {
            border: 1px solid #ddd;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .film-poster {
            text-align: center;
            margin-bottom: 20px;
        }
        .film-poster img {
            max-width: 200px;
            border-radius: 5px;
        }
        .ticket-info {
            margin-bottom: 15px;
        }
        .info-row {
            display: flex;
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
        }
        .info-label {
            font-weight: bold;
            width: 150px;
            flex-shrink: 0;
        }
        .info-value {
            flex-grow: 1;
        }
        .ticket-price {
            font-size: 1.5em;
            font-weight: bold;
            text-align: center;
            color: #28a745;
            margin: 20px 0;
        }
        .back-link {
            display: inline-block;
            margin-top: 20px;
            color: #007bff;
            text-decoration: none;
        }
        .back-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="ticket-header">
        <div class="ticket-id">Ticket #<?php echo $ticket['id']; ?></div>
        <h1>Admit One</h1>
    </div>
    
    <div class="ticket-content">
        <div class="film-poster">
            <?php if ($ticket['poster_url']): ?>
                <img src="<?php echo htmlspecialchars($ticket['poster_url']); ?>" alt="Film Poster">
            <?php else: ?>
                <p>No poster available</p>
            <?php endif; ?>
        </div>
        
        <h2 style="text-align: center; margin-bottom: 20px;"><?php echo htmlspecialchars($ticket['title']); ?></h2>
        
        <div class="ticket-info">
            <div class="info-row">
                <div class="info-label">Film:</div>
                <div class="info-value"><?php echo htmlspecialchars($ticket['title']); ?></div>
            </div>
            
            <div class="info-row">
                <div class="info-label">Description:</div>
                <div class="info-value"><?php echo htmlspecialchars($ticket['description']); ?></div>
            </div>
            
            <div class="info-row">
                <div class="info-label">Purchase Date:</div>
                <div class="info-value"><?php echo date('F j, Y \a\t g:i A', strtotime($ticket['purchase_date'])); ?></div>
            </div>
            
            <div class="info-row">
                <div class="info-label">Seat Number:</div>
                <div class="info-value"><?php echo htmlspecialchars($ticket['seat_number']); ?></div>
            </div>
            
            <div class="info-row">
                <div class="info-label">Username:</div>
                <div class="info-value"><?php echo htmlspecialchars($ticket['username']); ?></div>
            </div>
        
        <div class="ticket-price">Price: $<?php echo number_format($ticket['price'], 2); ?></div>
    </div>
    
    <p style="text-align: center;">
        <a href="my_tickets.php" class="back-link">← Back to My Tickets</a>
    </p>
</body>
</html>