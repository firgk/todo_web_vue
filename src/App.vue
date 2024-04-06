<template>
    <!-- 主体区域 -->
    <section id="todoapp">
      <!-- 输入框 -->
      <header>
        <h1>ToDo</h1>
        <div>
          <input style="border: 2px solid #ccc; width: 500px; height: 20px;" v-model.trim="inputValue" @keyup.enter="addItem" autofocus autocomplete="off"
            placeholder="请输入任务" />
          <button @click="addItem">添加</button>
        </div>
      </header>
      <!-- 列表区域 -->
      <section>
        <ul>
          <li style="border: 2px solid #ccc;" v-for="(item, index) in list" :key="index">
            <label>{{ item }}</label>
            &nbsp;<br>
            <button @click="removeItem(index)">删除</button>
          </li>
        </ul>
      </section>
    </section>
  </template>
  
  <script>
  import axios from 'axios'; // 不需要指定绝对路径，直接引用axios即可
  
  export default {
    data() {
      return {
        list: [],
        inputValue: ''
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      addItem() {
        const trimmedValue = this.inputValue.trim();
        if (!trimmedValue) return; // 如果输入为空，则不添加
        this.list.push(trimmedValue);
        this.saveData();
        this.inputValue = ''; // 添加后清空输入框
      },
      removeItem(index) {
        this.list.splice(index, 1);
        this.saveData();
      },
      fetchData() {
        axios.get('/api/getter')
          .then(response => {
            this.list = response.data.list || [];
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      },
      saveData() {
        axios.post('/api/saver/', { list: this.list })
          .then(response => {
            console.log('Data saved successfully:', response.data.message);
          })
          .catch(error => {
            console.error('Error saving data:', error);
          });
      }
    }
  };
  </script>
  
  <style>
  </style>
  