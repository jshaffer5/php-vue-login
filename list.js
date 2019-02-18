var list = new Vue({
    el: '#list',
    data: {
      todos: [
        { text: 'Learn JavaScript', id: 0, isChecked: false },
        { text: 'Learn Vue', id: 1 , isChecked: false },
        // { text: 'Build something awesome' }
      ],
      checkedItems: [],
      selected: [],
      newItem: ''
    },
    computed: {
        itemsLeft: function() {
            return this.todos.length - this.checkedItems.length;
        }
    },
    methods: {
        addItem: function() {
            // Check first for empty or blankspace only strings
            if(this.newItem=='' || /^\s*$/.test(this.newItem)) { 
                return;
            }
            this.todos.push({text: this.newItem, id: this.todos.length, isChecked: false });
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
            console.log(id);
            let el = document.getElementById(id);
            el.style.textDecoration = "none";
            this.toggleChecked(id);
        },
        toggleChecked: function(id) {
           this.todos[id].isChecked = !this.todos[id].isChecked; 
           console.log("isChecked: ", this.todos[id].isChecked);
        }
    }
  })