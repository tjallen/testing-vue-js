Vue.config.debug = true;

// extend and register a global component in 1 step
var VC = Vue.component('tasks-component', {
	template: '#tasks-template',
	data: function() {
		return {
			newTask: '',
			editedTask: null,
		};
	},
	props: ['list'],
	computed: {
		// compute remaining active tasks
		remaining: function() {
			return this.list.filter( this.isActive ).length;
		},
		// compute completed tasks on list
		completed: function() {
			return this.list.filter( this.isComplete ).length;
		}
	},
	methods: {
		addTask: function() {
			var text = this.newTask.trim();
			if ( text ) {
				this.list.push({ text: text, completed: false});
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
			if ( !this.editedTask ) {
				return;
			}
			this.editedTask = '';
			task.text = task.text;
			// if text is empty, delete this task
			if ( !task.text ) {
				this.deleteTask( task );
			}
		},
		cancelEdit: function( task ) {
			task.text = this.originalText;
			this.editedTask = null;
		},
		clearCompleted: function() {
			this.list = this.list.filter( this.isActive );
		}
	},
	directives: {
		// only focus on input after dom has updated
		'task-focus': function( val ) {
			if ( !val ) {
				return;
			}
			var el = this.el;
			Vue.nextTick(function() {
				el.focus();
			});
		}
	}
});

var vm = new Vue({
	el: '#app',
	data: {
		tasks: [
			{ text: "A task", completed: false },
			{ text: "A completed task", completed: true } 
		]
	}
/*	filters: {
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
	}*/
});
