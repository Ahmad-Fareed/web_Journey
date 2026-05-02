<?php
#include 'db.php';
$id=$_POST['id'];
$name=$_POST['name'];
$price=$_Post['price'];
$category=$_POST['category'];

$sql="Insert into products(id,name,price,category) values('$id','$name','$price','$category')";
$result=mysqli_query($conn,$sql);
echo "Product added successfully";
?>