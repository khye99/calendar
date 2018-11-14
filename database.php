<?php
// Connect to a database using mysqli command
$mysqli = new mysqli("localhost", "php_user", "php_password", "calendar");


// If connection failed, return error
if ($mysqli->connect_error) {
	printf("Error connecting: %s\n", $mysqli->connect_error);
	exit;
}
?>
