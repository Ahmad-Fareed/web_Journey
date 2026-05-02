<?php
#include 'db.php';
$id=$_GET['id'];
$sql="Update from product set name='' where id='$id'";
$result=mysqli_query($conn,$sql);

?>