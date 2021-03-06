var list = new Vue({ 
    el: '#list',
    data: {
        todos: [],
        checkedItems: [],
        newItem: '',
    },
    computed: {
        itemsLeft: function() {
            return this.todos.length - this.checkedItems.length;
        }
    },
    mounted: function() {
        // Get the list text as array of strings from XMLHttpRequest()
        let listDataJSON = null;
        let listArray = null;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState==4 && this.status==200) {
                console.log("responseText :", this.responseText);
                listDataJSON = JSON.parse(this.responseText);
                console.log("listDataJSON in xhr: ", listDataJSON);
                listArray = listDataJSON;
                // Convert the strings array into valid todos objects and add to todos array 
                listArray.map((val, index) => {
                    list.todos.push({text: val, id: index, isChecked: false});
                });
            }
        };
        xhr.open("GET", "read.php");
        xhr.send();
    },
    methods: {
        addItem: function() {
            // Check first for empty or blankspace only strings
            if(this.newItem=='' || /^\s*$/.test(this.newItem)) { 
                return;
            }
            this.todos.push({text: this.newItem, id: this.todos.length, isChecked: false });
            // Update the list database and clear newItem
            this.updateItemRequest(this.newItem, "insert");
            this.newItem = '';
        },

        recoverItem: function() {
            // this.todos.push({})
        },

        keymonitor: function(event) {
            if(event.key == "Enter"){
                list.addItem();
            }
        },

        checkboxClicked: function(id) {
            this.toggleChecked(id);
            if (this.todos[id].isChecked == false) {// Item unchecked, reinsert into list
                this.updateItemRequest( this.todos[id].text, "insert" );
            } else {
                this.updateItemRequest( this.todos[id].text, "delete" );
            }
            let todo = this.todos[id].todoText;
            console.log("deleting: ", this.todos[id].text);
        },
        toggleChecked: function(id) {
           this.todos[id].isChecked = !this.todos[id].isChecked; 
           console.log("isChecked: ", this.todos[id].isChecked);
        },

        updateItemRequest: function(item, action) {
            // let todo = { todoText: item, action: action};
            // // Create FormData object
            // var formData = list.toFormData(todo);
            // // Create http request
            // var xhr = new XMLHttpRequest();
            // xhr.onreadystatechange = function() {
            //     if (this.readyState==4 && this.status==200){
            //         console.log("response text: ", this.responseText);
            //         let responseJSON = JSON.parse(this.responseText);
            //         console.log("responseJSON: ", responseJSON);
            //         if (responseJSON.error==true) {
            //             list.errorMessage = responseJSON.message;
            //             console.log("errorMessage: ", list.errorMessage);
            //         } else { // XHR successful. Output success message below todolist 
            //             list.successMessage = responseJSON.message;
            //         }
            //     }
            // };
            // xhr.open("POST", "insert.php", true);
            // xhr.send(formData);

            // fetch
            let todo = { todoText: item, action: action};
            // Create FormData object
            var formData = list.toFormData(todo);
            // Create http request
            async function sendUpdate(url = '', data = formData) {
                await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                body: data// body data type must match "Content-Type" header
                })
                .then(response => {
                    if (!response.ok) {
                        console.log('Request Error. Status Code: ' + response.status);
                        return;
                        }
                    return response.json();
                })
                .then( data => {
                    if (data.error==true) {
                        list.errorMessage = data.message;
                        console.log("errorMessage: ", list.errorMessage);
                    } else { // Successful. Output success message below todolist
                        console.log('data : ', data); 
                        list.successMessage = data.message;
                    }
                })
                .catch(err => console.log('Network Error: ', err));
            }
            sendUpdate('insert.php');
            // const result = sendUpdate('insert.php');
            // result.then(data => {
            //         console.log("Data Received: ", data);
            //         if (data.error==true) {
            //             list.errorMessage = data.message;
            //             console.log("errorMessage: ", list.errorMessage);
            //         } else { // Successful. Output success message below todolist 
            //             list.successMessage = data.message;
            //         }
            // });
            // (async () => {
            //     const response = await sendUpdate('insert.php');
            //     response.then(data => {
            //         console.log("Data Received: ", data);
            //     if (data.error==true) {
            //         list.errorMessage = data.message;
            //         console.log("errorMessage: ", list.errorMessage);
            //     } else { // Successful. Output success message below todolist 
            //         list.successMessage = data.message;
            //     }
            // })
            // })()
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
    }
  })