Vue.config.debug = true;

var vm = new Vue({
	el: '#app',
	data: {
		newTask: '',
		editedTask: '',
		tasks: [
			{ text: "A task", completed: false, editing: false },
			{ text: "A task", completed: false, editing: false },
			{ text: "A completed task", completed: true, editing: false } 
		]
	},
	methods: {
		addTask: function() {
			var text = this.newTask.trim();
			if ( text ) {
				this.tasks.push({ text: text, completed: false });
				this.newTask = '';
			}
		},
		toggleEdit: function( task ) {
			task.editing = ! task.editing;
			this.editedTask = task.text;
		},
		completeEdit: function( task, cb ) {
			task.text = this.editedTask.trim();
			this.editedTask = '';
			task.editing = false;
		},
		toggleCompleted: function( task ) {
			task.completed = ! task.completed;
		}
	}
});
