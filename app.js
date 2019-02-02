var app = new Vue({
	el: '#login',
	data:{
		successMessage: "",
		errorMessage: "",
		logDetails: {username: 'josh', password: 'pass'},
	},
 
	methods:{
		keymonitor: function(event) {
       		if(event.key == "Enter"){
         		app.checkLogin();
        	}
       	},
 
		checkLogin: function(){
			var logForm = app.toFormData(app.logDetails);
			console.log("logForm.username: ", logForm.getAll("username"));
			
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
				// Typical action to be performed when the document is ready:
				// document.getElementById("demo").innerHTML = xhr.responseText;
				console.log("responseText: ", this.responseText);
				app.successMessage = this.responseText;
				app.logDetails = { username: '', password: '' };
				// setTimeout(function() {
				// 	window.location.href = "success.php";
				// }, 2000);
				//window.location.href = "success.php";
				}
			};
			xhr.open("POST", "login.php", true);
			xhr.send(app.logDetails);

				// console.log("server response: ", response);
				// if(response.error==true){
				// 	console.log('if called');
				// 	app.errorMessage = response.message;
				// 	console.log("failure! ...", response.message);
				// }
				// else{
				// 	console.log("else called");
				// 	app.successMessage = response.message;
				// 	app.logDetails = {username: '', password:''};
				// 	setTimeout(function(){
				// 		window.location.href="success.php";
				// 	},2000);

				// }
		},
 
		toFormData: function(obj){
			console.log("toFormData() called");
			console.log("toFormData() parameter 'obj' contains: ", obj);
			var form_data = new FormData();
			// for(var key in obj){
			// 	form_data.append(key, obj[key]);
			// }
			form_data.set("username", obj.username);
			form_data.set("password", obj.password);
			console.log("form_data: ", form_data.getAll("password"));
			return form_data;
		},
 
		clearMessage: function(){
			app.errorMessage = '';
			app.successMessage = '';
		}
 
	}
});