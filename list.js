var list = new Vue({
    el: '#list',
    data: {
      todos: [
        { text: 'Learn JavaScript' },
        { text: 'Learn Vue' },
        { text: 'Build something awesome' }
      ],
      newItem: ''
    },
    methods: {
        addItem: function() {
            // Check first for empty or blankspace only strings
            if(this.newItem=='' || /^\s*$/.test(this.newItem)) { 
                return;
            }
            this.todos.push({text: this.newItem});
            this.newItem = '';
        },

        keymonitor: function(event) {
            if(event.key == "Enter"){
                list.addItem();
            }
        },
    }
  })