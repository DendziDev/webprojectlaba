<?php
// Database configuration
define('DB_HOST', 'u546803.mysql.masterhost.ru');
define('DB_USER', 'u546803');
define('DB_PASS', 'iNgShO.dvEs4');
define('DB_NAME', 'u546803');

// Create connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>