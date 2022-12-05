<!-- Vue APP -->
<template>
    <div id="app">
    <h1>To-Do List</h1>
    </div>
  </template>
  
  <script>
  export default {
    name: 'app',
    data() {
      return {
        
      };
    },
    methods: {
    },
    computed: {
      listSummary() {
        const numberFinishedItems = this.ToDoItems.filter(item =>item.done).length
        return `${numberFinishedItems} out of ${this.ToDoItems.length} items completed`
      }
    }
  };
  </script>
  