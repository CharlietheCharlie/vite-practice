<template>
    <div class="content">
        <h1>Code1</h1>
        <CodeReview1 :modelValue="text" :type="'text'" :placeholder="'請輸入文字'" :prefix="'text'" :suffix="''"
        :size="'medium'" :fullWidth="true"
        @update:modelValue="updateText" @change=""></CodeReview1>
        <CodeReview1 :modelValue="number" :type="'number'" :placeholder="'請輸入數字'" :prefix="'number'" :suffix="''"
        :max="999" :min="0" :hasDecimalPoint="false" :size="'medium'" :fullWidth="true"
        @update:modelValue="updateNumber" @change=""></CodeReview1>
        <CodeReview1 :modelValue="password" :type="'password'" :placeholder="'請輸入密碼'" :prefix="'password'" :suffix="''"
        :size="'medium'" :fullWidth="true"
        @update:modelValue="updatePassword" @change=""></CodeReview1>
        <h1>Code 2</h1>
        <div class="code2">
        <div>輸入<input type="text" v-model="checkValue"></div>
        <CodeReview2 :modelValue="checkValue" :description="'123'"></CodeReview2>
        </div>
  
    </div>
</template>

<script setup>
import { ref } from 'vue';
import CodeReview1 from '@/components/CodeReview1.vue';
import CodeReview2 from '@/components/CodeReview2.vue';
const text = ref('');
const number = ref('');
const password = ref('');
const checkValue = ref('');
const updateText = (val)=>{
    text.value = val;
}
const updateNumber = (val)=>{
    number.value = val;
}
const updatePassword = (val)=>{
    password.value= val;
}
</script>

<style lang="scss" scoped>
.code2{
    display: flex;
    flex-direction: column;
}
</style>