Vue.config.debug = true;

new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todos: [
    ]
  },
  methods: {
    addTodo: function () {
      var text = this.newTodo.trim();
      if (text) {
        this.todos.push({ text: text });
        this.newTodo = '';
      }
    },
    removeTodo: function (index) {
      this.todos.splice(index, 1);
    }
  }
});
