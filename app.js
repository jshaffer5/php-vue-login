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
			axios.post('login.php', {username: "josh", password: "pass"})
				.then(function(response){
					console.log("server response: ", response);
					console.log("logForm.username after axios.post(): ", logForm.getAll("username"));
					if(response.error==true){
						console.log('if called');
						app.errorMessage = response.message;
						console.log("failure! ...", response.message);
					}
					else{
						console.log("else called");
						app.successMessage = response.message;
						app.logDetails = {username: '', password:''};
						setTimeout(function(){
							window.location.href="success.php";
						},2000);
 
					}
				});
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