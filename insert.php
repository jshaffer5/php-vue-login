<?php 
session_start();

$conn = new mysqli("localhost", "root", "root", "vue_todolist");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$out = array('error' => false);

$todo_text = $_POST["todoText"];
$action = $_POST["action"];
$sql = "";

$out["action"]=$action;
if ($action=="delete") {
    $sql = "DELETE FROM todos WHERE todoText='$todo_text'";
} else {
    $sql = "INSERT INTO todos (todoText) VALUES ('$todo_text')";
}

$query = $conn->query($sql);

header("Content-type: application/json");
echo json_encode($out);
die();

?>