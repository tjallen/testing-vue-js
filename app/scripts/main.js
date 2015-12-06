
// Model
var exampleData = {
		newTodo: '',
		todos: [
		]
};

// ViewModel
new Vue({
	el: '#app',
	data: exampleData,
	methods: {
		addTodo: function() {
			var text = this.newTodo.trim();
			if (text) {
				this.todos.push({text:text});
				this.newTodo = '';
			}
		},
		removeTodo: function(index) {
			this.todos.splice(index, 1);
		}
	}
});

//# sourceMappingURL=main.js.map
