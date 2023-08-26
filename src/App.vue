<script setup>

  import Header from "./components/Header.vue"
 
</script>

<template>
  <Header></Header>
  <RouterView></RouterView>
</template>

<style lang="scss">
$main:rgb(88, 88, 232);

.content{
    width:80vw;
    margin: 30px auto 0;
    text-align: center;
    font-size: 14px;
    margin-bottom: 100px;
    h1{
        font-size: 30px;
        font-weight: bold;
    };
    h2{
      font-size: 18px;
    }

    input{
      border: rgb(117, 117, 117) 1px solid;
      border-radius: 5px;
      padding: 2px 4px;
    }

  
}
</style>
