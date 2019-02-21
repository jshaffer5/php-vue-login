<?php 

$conn = new mysqli("localhost", "root", "root", "vue_todolist");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
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