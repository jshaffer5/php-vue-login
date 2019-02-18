<?php
session_start();
	if(!isset($_SESSION['user'])){
		// header('location:index.php');
	}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Todo List</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="container">
	<h1 class="page-header">Josh's Vue.js Todo List</h1>
    
    <div id="list-flex">
        <div id="list" class="todo-list">
            <h2>
                Todos
            </h2>
            <input id="input-item" class="form-control" placeholder="new list item" v-model="newItem" v-on:keyup="keymonitor"><br>
            <button id="add" class="btn btn-success" v-on:click="addItem">
                Add
            </button><hr>
            <ul id="list-items"> 
                <li class="ui-state-default" v-for="todo in todos">
                <div class="checkbox">
                                <input type="checkbox" id="checkbox" :value ="todo.text" :key="todo.id" v-on:click="checkboxClicked" v-model="checkedItems">
                                <label id="label-list-item" for="checkbox">{{todo.text}}</label>
                            </div>
                </li>
            </ul>
            <span>Completed Tasks: <a v-for="item in checkedItems">{{ item }}, </a></span>
            <div class="todo-footer">
                <strong><span class="count-todos"></span></strong> {{ itemsLeft }} Items Left
            </div>
            <br>
        </div>
    </div>

    <a href="logout.php" class="btn btn-primary"><span class="glyphicon glyphicon-log-out"></span> Logout</a>









</div>
<script src="vue.js"></script>
<script src="list.js"></script>
</body>
</html>