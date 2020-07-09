<?php
session_start();

$url = parse_url(getenv("CLEARDB_DATABASE_URL"));
$server = $url["host"];
$username = $url["user"];
$password = $url["pass"];
$db = substr($url["path"], 1);
$conn = new mysqli($server, $username, $password, $db);

if (empty($url["host"])){
$conn = new mysqli("localhost", "root", "root", "vue_todolist");
}
if ($conn->connect_error) {
	$out["error"]=true;
    $out["message"]="Connection failed: $conn->connect_error";
    echo json_encode($out);
    die();
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
	$sql = "SELECT * FROM users WHERE username='$username' AND password='$password'";
	$query = $conn->query($sql);
 
	if($query->num_rows>0){
		$row=$query->fetch_array();
		$_SESSION['user']=$row['userid'];
		$out['message'] = "Login Successful";
	}
	else{
		$out['error'] = true;
		$out['message'] = "Login Failed. Incorrect username or password";
	}
}
 
 
 
$conn->close();
 
header("Content-type: application/json");
echo json_encode($out);
die();
 
 
?>