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
					console.log("responseText: ", this.responseText);
					app.successMessage = this.responseText;
					app.logDetails = { username: '', password: '' };
					// Wait 3 seconds while displaying response info, then open success.php
					setTimeout(function() {
						window.location.href = "success.php";
					}, 3000);
				}
			};
			xhr.open("POST", "login.php", true);
			console.log("sending xhr with username: ", logForm.getAll("username"));
			xhr.send(logForm);
			
			// window.location.href="success.php";

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
			for(var key in obj){
				form_data.append(key, obj[key]);
			}
			// form_data.set("username", obj.username);
			// form_data.set("password", obj.password);
			console.log("form_data: ", form_data.getAll("password"));
			return form_data;
		},
 
		clearMessage: function(){
			app.errorMessage = '';
			app.successMessage = '';
		}
 
	}
});