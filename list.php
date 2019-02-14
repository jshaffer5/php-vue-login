<?php
session_start();
	if(!isset($_SESSION['user'])){
		// header('location:index.php');
	}
?>
<!DOCTYPE html>
<html>
<head>
	<title>My List</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="container">
	<h1 class="page-header">Vue.js Todo List</h1>
	
    <div id="list" class="todo-list">
        <h2>
            Todos
        </h2>
        <input placeholder="new list item" v-model="newItem" v-on:keyup="keymonitor"><br>
        <button id="add" class="btn btn-success" v-on:click="addItem">
            Add
        </button><hr>
        <ul id="list-items"> 
            <li v-for="todo in todos">
            {{ todo.text }}
            </li>
        </ul>
        <br>
    </div>

    <a href="logout.php" class="btn btn-primary"><span class="glyphicon glyphicon-log-out"></span> Logout</a>









</div>
<script src="vue.js"></script>
<script src="list.js"></script>
</body>
</html>