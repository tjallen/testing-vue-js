Vue.config.debug = true;

// extend and register a global component in 1 step
var VC = Vue.component('tasks-component', {
	template: '#tasks-template',
	data: function() {
		return {
			newTask: '',
			editedTask: '',
		};
	},
	props: ['list'],
	computed: {
		remaining: function() {
			return this.list.filter( this.isActive ).length;
		}
	},
	methods: {
		addTask: function() {
			var text = this.newTask.trim();
			if ( text ) {
				this.list.push({ text: text, completed: false, editing: false });
				this.newTask = '';
			}
		},
		deleteTask: function( task ) {
			this.list.$remove( task );
		},
		isComplete: function( task ) {
			return task.completed;
		},
		isActive: function ( task ) {
			return ! this.isComplete( task );
		},
		toggleCompleted: function ( task ) {
			task.completed = ! task.completed;
		},
		startEdit: function( task ) {
			this.originalText = task.text;
			this.editedTask = task;
		},
		completeEdit: function( task ) {
			console.log('completedit');
			if (this.editedTask) {
				return;
			}
			this.editedTask = '';
			task.title = task.text;
			// if text is empty, delete this task
			if (!task.title) {
				this.deleteTask( task );
			}
		},
		cancelEdit: function( task ) {
			task.text = this.originalText;
			this.editedTask = '';
		},
		clearCompleted: function() {
			this.list = this.list.filter(this.isActive);
		}
	}
});

var vm = new Vue({
	el: '#app',
	data: {
		tasks: [
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
