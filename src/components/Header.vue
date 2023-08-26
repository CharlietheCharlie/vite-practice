<template>
    <div>
        <header >
            <ul>
                <li v-for="list, index in lists">
                    <RouterLink :to="list">{{ index }}</RouterLink>
                </li>
            </ul>
        </header>
    </div>
</template>

<script setup>
import {RouterLink} from 'vue-router'

const lists = {
    "Todo List": "/todo-list",
    "Serve Time": "/serve-time",
    "Code Review": "/code-review",
}
</script>

<style lang="scss" scoped>
header{
    ul{
        text-align: center;
        display: flex;
        align-items:center;
        justify-content: flex-end;
        li{
            flex-basis: 100%;
            &:hover{
                background-color: rgb(104, 157, 236);
            }
            a{
                font-weight: bold;
                height: 100%;
                line-height: 50px;
                display: block;
            }
        };
    };
}
</style>