var app = new Vue({
	el: '#login',
	data:{
		successMessage: "",
		errorMessage: "",
		logDetails: {username: '', password: ''},
	},
 
	methods:{
		keymonitor: function(event) {
       		if(event.key == "Enter"){
         		app.checkLogin();
        	}
       	},
 
		checkLogin: function(){
			var logForm = app.toFormData(app.logDetails);
			
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					// var responseStr = xhr.responseText.toString().toLowerCase();
					var responseJSON = JSON.parse(this.responseText);
					console.log("responseJSON: ", responseJSON);
					if(responseJSON.error==true){ // xhr failed, set the errorMessage
						app.errorMessage = responseJSON.message;
					} else { // xhr successful, clear input areas, set successMessage, navigate to success.php 
						app.successMessage = responseJSON.message;
						app.logDetails = { username: '', password: '' };
						// Wait 3 seconds while displaying error/success message, then open success.php
						setTimeout(function() {
						window.location.href = "success.php";
						}, 3000);
					}
				}
			};
			xhr.open("POST", "login.php", true);
			xhr.send(logForm);
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
			return form_data;
		},
 
		clearMessage: function(){
			app.errorMessage = '';
			app.successMessage = '';
		}
 
	}
});