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
			// **xhr
			// var logForm = app.toFormData(app.logDetails);
			
			// var xhr = new XMLHttpRequest();
			// xhr.onreadystatechange = function() {
			// 	if (this.readyState == 4 && this.status == 200) {
			// 		var responseJSON = JSON.parse(this.responseText);
			// 		console.log("responseJSON: ", responseJSON);
			// 		if(responseJSON.error==true){ // xhr failed, set the errorMessage
			// 			app.errorMessage = responseJSON.message;
			// 		} else { // xhr successful. clear input areas, set successMessage, navigate to success.php 
			// 			app.successMessage = responseJSON.message;
			// 			app.logDetails = { username: '', password: '' };
			// 			// Wait 3 seconds while displaying error/success message, then open success.php
			// 			setTimeout(function() {
			// 			window.location.href = "list.php";
			// 			}, 3000);
			// 		}
			// 	}
			// };
			// xhr.open("POST", "login.php", true);
			// xhr.send(logForm);
			// **end xhr

			// Fetch
			const logForm = app.toFormData(app.logDetails);

			// Example POST method implementation:
			async function sendLogin(url = '', data = logForm) {
				await fetch(url, {
				  method: 'POST', // *GET, POST, PUT, DELETE, etc.
				  body: data // body data type must match "Content-Type" header
				})
				.then(response => {
					if (!response.ok) {
					console.log('There was a problem. Status Code: ' + response.status);
					return;
					}
			
					// Examine the text in the response
					console.log('response data: ', data);
					return response.json();
				})
				.then(data => {
					if(data.error==true){ // failed, set the errorMessage
						app.errorMessage = data.message;
					} else { // successful. clear input areas, set successMessage, navigate to success.php 
						app.successMessage = data.message;
						app.logDetails = { username: '', password: '' };
						// Wait 3 seconds while displaying error/success message, then open success.php
						setTimeout(
							() => window.location.href = "list.php",
							3000);
					}
				})
				.catch(function(err) {
					console.log('Fetch Error : ', err);
				});
			}
			sendLogin('login.php');
			// end Fetch
		},
 
		toFormData: function(obj){
			console.log("toFormData() called");
			console.log("toFormData() parameter 'obj' contains: ", obj);
			var form_data = new FormData();
			for(var key in obj){
				form_data.append(key, obj[key]);
			}
			return form_data;
		},
 
		clearMessage: function(){
			app.errorMessage = '';
			app.successMessage = '';
		}
 
	}
});
