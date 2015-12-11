Vue.config.debug = true;

// extend and register a global component in 1 step
Vue.component('my-component', {
	template: '#my-template',
	props: ['subject'],
	// use return for data in components = not shared
	data: function() {
		return { answer: 42 };
	}
});

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
	filters: {
		all: function( tasks ) {
			return tasks.filter( function ( task ) {
				return tasks;
			});
		},
		active: function( tasks ) {
			return tasks.filter( function ( task ) {
				return ! task.completed;
			});
		},
		completed: function( tasks ) {
			return tasks.filter( function ( task ) {
				return task.completed;
			});
		}
	},
	computed: {
		remaining: function() {
			return this.$options.filters.active( this.tasks ).length;
		}
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
			// req: set other tasks to .editing = false (only allow 1 to be edited)
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
		},
		clearCompleted: function() {
			this.tasks = this.$options.filters.active( this.tasks );
		}
	}
});
