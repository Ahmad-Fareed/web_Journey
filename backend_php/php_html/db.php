<?php

$host = 'localhost';
$dbname = 'root';
$username = 'root';
$password = 'patient_db';

$conn=mysqli_connect($host, $username, $password);
if(!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>