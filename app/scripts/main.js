Vue.config.debug = true;

var vm = new Vue({
	el: '#app',
	data: {
		newTask: '',
		tasks: [
			{ text: "A task", completed: false },
			{ text: "A task", completed: false },
			{ text: "A completed task", completed: true } 
		],
	}
});
