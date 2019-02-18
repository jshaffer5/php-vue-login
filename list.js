var list = new Vue({
    el: '#list',
    data: {
      todos: [
        { text: 'Learn JavaScript', id: 0 },
        { text: 'Learn Vue', id: 1 },
        // { text: 'Build something awesome' }
      ],
      checkedItems: [],
      selected: [true, true, true],
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
            this.todos.push({text: this.newItem, id: this.todos.length});
            this.newItem = '';
        },

        keymonitor: function(event) {
            if(event.key == "Enter"){
                list.addItem();
            }
        },

        checkboxClicked: function() {

        }
    }
  })