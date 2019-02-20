const readItemsRequest = function() {
    let mockData = [
        { text: 'Learn JavaScript', id: 0, isChecked: false },
        { text: 'Learn Vue', id: 1 , isChecked: false },
        // { text: 'Build something awesome' }
      ];
    console.log("mockData: ", mockData);
    return mockData;
}

var list = new Vue({
    el: '#list',
    data: {
      todos: readItemsRequest(),
      checkedItems: [],
      selected: [],
      newItem: '',
      successMessage: "",
	  errorMessage: ""
    },
    computed: {
        itemsLeft: function() {
            return this.todos.length - this.checkedItems.length;
        }
    },
    mount: function() {
        this.todos = this.readItemsRequest();
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
            let todo = { todoText: item, action: action};
            // Create FormData object
            var formData = list.toFormData(todo);
            // Create http request
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (this.readyState==4 && this.status==200){
                    console.log("response text: ", this.responseText);
                    let responseJSON = JSON.parse(this.responseText);
                    console.log("responseJSON: ", responseJSON);
                    if (responseJSON.error==true) {
                        list.errorMessage = responseJSON.message;
                        console.log("errorMessage: ", list.errorMessage);
                    } else { // XHR successful. Output success message below todolist 
                        list.successMessage = responseJSON.message;
                    }
                }
            };
            xhr.open("POST", "insert.php", true);
            xhr.send(formData);
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

  