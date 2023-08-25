<template>
    <div class="content">
        <h1 class="title">Todo List</h1>
        <!-- 新增 -->
        <div>
            <input @keydown.enter="postTask" v-model="newTask" id="add-todo" type="text"><button @click="postTask"
                class="rounded bg-blue-500 text-white m-1 p-1 hover:bg-blue-700">新增</button>
        </div>
        <!-- 事項 -->
        <div class="column">
        
            <ul>
                <li>done</li>
                <li>事項內容</li>
            </ul>
        </div>
        <div v-for="task, index in todoData" :key="task" class="task">
            <div class="head" ref="tasks" :class="{ 'edit': task.edit, 'done': task.completed }" @click="task.edit = true">
                <input @click.stop="updateTask(task, task.id);toggleDone(index)" type="checkbox" v-model="task.completed">
                <p v-if="!task.edit"><del v-if="task.completed">{{ task.title }}</del><span v-if="!task.completed">{{
                    task.title }}</span></p>
                <input :disabled="task.completed" @click.stop v-if="task.edit" v-model="task.title" type="text">
                <button class="rounded bg-gray-300 text-black m-1 p-1 hover:bg-gray-500" v-if="task.edit"
                    @click.stop="updateTask(task, task.id); task.edit = false">確認</button>
            </div>
            <button class="delete-button" @click="deleteTask(index, task.id)"><img class="delete-icon"
                    src="@/assets/delete.svg" alt=""></button>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
const todoData = ref();
const newTask = ref();
const tasks = ref();
const postTask = () => {
    const template = { "userId": 1, "id": 1, "title": "", "completed": false, "edit": false };
    template["title"] = newTask.value;
    todoData.value.unshift({ ...template });
    delete template.edit;
    axios.post('https://jsonplaceholder.typicode.com/todos/', {
        "123": "123"
    })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    newTask.value = "";
}
const updateTask = (task, id) => {
    const putTask = { ...task };
    delete putTask.edit;
    axios({
        method: 'put',
        url: `https://jsonplaceholder.typicode.com/todos/${id}`,
        data: putTask
    })
        .then(res => console.log(res))
        .catch(err => console.log(err));
}
const deleteTask = (index, id) => {
    todoData.value.splice(index, 1);
    axios({
        method: 'delete',
        url: `https://jsonplaceholder.typicode.com/todos/${id}`,
    })
        .then(res => console.log(res))
        .catch(err => console.log(err));
}
const completeResort = ()=>{
    todoData.value = todoData.value.sort(function (a, b) {
        return a.completed > b.completed ? 1 : -1;
    });
}
const toggleDone = (index)=>{
    setTimeout(()=>{completeResort()},2000);
}
onMounted(async () => {
    const datas = await axios('https://jsonplaceholder.typicode.com/todos/').then(res => res.data).catch(function (error) {
        console.log(error);
    });
    todoData.value = datas.map((data) => data = { ...data, 'edit': false });
    completeResort();
})
</script>

<style lang="scss" scoped>
.column {
    margin: 10px;

    ul {
        display: flex;
        gap: 1vw;
        padding-left: 10px;

        :first-child {
            flex-basis: 10%;
        }

        li {
            text-align: center;
            font-weight: bold;
            font-size: 15px;
        }
    }
}

.task {
    margin: 10px;
    position: relative;

    >div {
        padding: 2px 5px;
        border-radius: 5px;
        text-align: left;
    }

    .delete-button {
        position: absolute;
        right: -35px;
        top: 50%;
        transform: translateY(-50%);
        width: 22px;
        height: 22px;
        border-radius: 50%;

        .delete-icon {
            &:hover {
                filter: drop-shadow(2000px 0 0 rgb(255, 97, 97));
                transform: translate(-2000px);
            }
        }

    }

    .head {
        padding: 10px;
        display: flex;
        align-items: center;
        gap: 1vw;
        background-color: #ffffff;
        cursor: pointer;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);


        &:hover {
            background-color: #dbdbdb;
        }

        &.edit {
            cursor: default;
            background-color: #addcef;

            button {
                margin-left: auto;
            }
        }

        input[type="checkbox"] {
            flex-basis: 10%;
            width: 20px;
            height: 20px;
        }

        input[type="text"] {
            flex-basis: 70%;
        }

        &.done {
            background-color: #dcdcdc;
            color: grey;
            position: relative;
        }
        &.remove{
            animation-name: goDown;
            animation-duration: 2s;
            background-color: red;
        }

    }
@keyframes goDown{
    from{
        top:0;
    }to{
        top:100vh;
    }
} 
}</style>