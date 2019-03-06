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
    die( "insert.php: 16 -> Connection failed: " . $conn->connect_error . "url empty?: " . empty($url["host"]));
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