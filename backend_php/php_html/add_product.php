<?php
#include 'db.php';
$name=$_POST['name'];
$age=$_POST['age'];
$disease=$_Post['disease'];
$status=$_POST['status'];

$sql="Insert into patients(name,age,disease,status) values('$name','$age','$disease','$status')";
$result=mysqli_query($conn,$sql);
echo "Patient added successfully";
?>