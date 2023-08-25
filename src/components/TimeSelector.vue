<template>
        <div class="select" v-show="Number(weekday)">
                <!-- 起始時間 -->
                <select name="serve" :id="'serveStart_' + index" ref="serveStarts" @change="intervalChange(index)">
                    <option value="0">00 : 00</option>
                    <option v-for="interval in 46" :value="interval" :disabled="interval >= weekdays[index].indexOf(1)&&interval <= weekdays[index].lastIndexOf(1)">
                        {{ String(new Date(new Date(resetDate).setMinutes(interval * 30)).getHours()).padStart(2, "0") }} :
                        {{ String(new Date(new Date(resetDate).setMinutes(interval * 30)).getMinutes()).padStart(2, "0") }}
                    </option>   
                </select>
                <h2> ~ </h2>
                <!-- 結束時間 -->
                <select name="serve" :id="'serveEnd_' + index" ref="serveEnds" @change="intervalChange(index)">
                    <option v-for="interval in 46" :value="interval" >
                        {{ String(new Date(new Date(resetDate).setMinutes(interval * 30)).getHours()).padStart(2, "0") }} :
                        {{ String(new Date(new Date(resetDate).setMinutes(interval * 30)).getMinutes()).padStart(2, "0") }}
                    </option>
                    <option value="47">23 : 59</option>
                </select>
            </div>
</template>

<script setup>
import {computed} from 'vue';
const props = defineProps({'weekdays':Object,'index':String,'weekday':String})
const date = new Date();
const resetDate = computed(() => {
    date.setHours(0, 0, 0);
    return new Date(date);
})
</script>

<style lang="scss" scoped>
.select {
        display: flex;
        justify-content: center;

        select {
            padding: 10px 20px;
            border: 2px solid rgb(204, 204, 204);
            border-radius: 5px;
     
          
        }
    }
</style>