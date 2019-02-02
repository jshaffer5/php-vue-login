<?php
session_start();

/* mysqli([host], [username], [password], [db name], [port], [socket]) */
$conn = new mysqli("localhost", "root", "root", "vue_login");
 
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
 
$out = array('error' => false);
 
$username = $_POST["username"];
$password = $_POST["password"];

 
if($username=='') {
	$out['error'] = true;
	$out['message'] = "Username is required";
}
else if($password=='') {
	$out['error'] = true;
	$out['message'] = "Password is required";
}
else{
	$sql = "SELECT * FROM user WHERE username='$username' AND password='$password'";
	$query = $conn->query($sql);
 
	if($query->num_rows>0){
		$row=$query->fetch_array();
		$_SESSION['user']=$row['userid'];
		$out['message'] = "Login Successful";
	}
	else{
		$out['error'] = true;
		$out['message'] = "Login Failed. User not Found";
	}
}
 
 
 
$conn->close();
 
header("Content-type: application/json");
echo json_encode($out);
die();
 
 
?>