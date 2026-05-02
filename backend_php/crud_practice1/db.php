<?php

$host = 'localhost';
$dbname = 'your_database';
$username = 'your_username';
$password = 'your_password';

$conn=mysqli_connect($host, $username, $password);
if(!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>