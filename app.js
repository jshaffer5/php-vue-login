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
			axios.post('login.php', logForm)
				.then(function(response){
					console.log("server response: ", response);
					console.log(response.error);
 
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