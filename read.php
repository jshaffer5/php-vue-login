<?php 

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
    die( "read.php: 15 -> Connection failed: " . $conn->connect_error . "url empty?: " . empty($url["host"]));
}

$sql = "SELECT * FROM todos";
$query = $conn->query($sql);
$list = array();
while($row = $query->fetch_array()){
    array_push($list, $row['todoText']);
}

header("Content-type: application/json");
echo json_encode($list);
die();

?>