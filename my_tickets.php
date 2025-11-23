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
$username = $_SESSION['username'];

// Get user's tickets
$tickets = getUserTickets($user_id);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Tickets - <?php echo htmlspecialchars($username); ?></title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 1000px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
        }
        .ticket {
            border: 1px solid #ddd;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .ticket-info {
            flex-grow: 1;
        }
        .ticket-details {
            margin-bottom: 10px;
        }
        .ticket-actions {
            text-align: right;
        }
        .ticket-id {
            font-weight: bold;
            color: #66;
        }
        .film-title {
            font-size: 1.2em;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .ticket-date {
            color: #666;
            font-size: 0.9em;
        }
        .ticket-seat {
            font-weight: bold;
            color: #007bff;
        }
        .ticket-price {
            font-weight: bold;
            font-size: 1.1em;
        }
        .no-tickets {
            text-align: center;
            padding: 30px;
            color: #666;
        }
        button {
            background-color: #007bff;
            color: white;
            padding: 8px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0069d9;
        }
        .back-link {
            display: inline-block;
            margin-bottom: 20px;
            color: #07bff;
            text-decoration: none;
        }
        .back-link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>My Tickets</h1>
        <p>Welcome, <?php echo htmlspecialchars($username); ?>!</p>
    </div>
    
    <a href="index.php" class="back-link">← Back to Film List</a>
    
    <?php if (empty($tickets)): ?>
        <div class="no-tickets">
            <p>You haven't purchased any tickets yet.</p>
            <a href="index.php"><button>Explore Films</button></a>
        </div>
    <?php else: ?>
        <p>You have <?php echo count($tickets); ?> ticket(s)</p>
        
        <?php foreach ($tickets as $ticket): ?>
            <div class="ticket">
                <div class="ticket-info">
                    <div class="ticket-details">
                        <div class="ticket-id">Ticket #<?php echo $ticket['id']; ?></div>
                        <div class="film-title"><?php echo htmlspecialchars($ticket['title']); ?></div>
                        <div class="ticket-date">Purchased on: <?php echo date('F j, Y \a\t g:i A', strtotime($ticket['purchase_date'])); ?></div>
                        <div class="ticket-seat">Seat: <?php echo htmlspecialchars($ticket['seat_number']); ?></div>
                    </div>
                </div>
                <div class="ticket-actions">
                    <div class="ticket-price">$<?php echo number_format($ticket['price'], 2); ?></div>
                    <a href="ticket_details.php?id=<?php echo $ticket['id']; ?>"><button>View Details</button></a>
                </div>
            </div>
        <?php endforeach; ?>
    <?php endif; ?>
</body>
</html>