<?php 
session_start();

$mock_out = array('error' => false);
$mock_out["message"]="go grocery shopping";
header("Content-type: application/json");
echo json_encode($mock_out);
die();

?>