<template>
        <div class="select" v-show="Number(weekday)">
                <!-- 起始時間 -->
                <select @change="!(section.end=='choose')?$emit('change',index):''" v-model="section.start" name="serve">
                    <option value="choose" disabled>請選擇</option>
                    <option value="0" :disabled="(onePositions[index].length <= 1)?0>=section.end:(weekday[0]=='1'||0>=section.end)&&!inSection(0,section.start,section.end)">00 : 00</option>
                    <option v-for="interval in 47" :value="interval" :disabled="(onePositions[index].length <= 1)?interval>=section.end:(weekday[interval]=='1'||interval>=section.end)&&!inSection(interval,section.start,section.end)">
                        {{ String(new Date(new Date(resetDate).setMinutes(interval * 30)).getHours()).padStart(2, "0") }} :
                        {{ String(new Date(new Date(resetDate).setMinutes(interval * 30)).getMinutes()).padStart(2, "0") }}
                    </option>   
                </select>
                <h2> ~ </h2>
                <!-- 結束時間 -->
                
                <select @change="!(section.start=='choose')?$emit('change',index):''" v-model="section.end" name="serve">
                    <option value="choose" disabled>請選擇</option>
                    <option v-for="interval in 47" :value="interval" :disabled="(onePositions[index].length <= 1)?interval<=section.start:(weekday[interval]=='1'||interval<=section.start)&&!inSection(interval,section.start,section.end)">
                        {{ String(new Date(new Date(resetDate).setMinutes(interval * 30)).getHours()).padStart(2, "0") }} :
                        {{ String(new Date(new Date(resetDate).setMinutes(interval * 30)).getMinutes()).padStart(2, "0") }}
                    </option>
                    <option value="48" :disabled="(onePositions[index].length <= 1)?48<=section.start:(weekday[48]=='1'||48<=section.start)&&!inSection(48,section.start,section.end)">23 : 59</option>
                </select>
                <button v-if="onePositions[index].length>1" class="delete-button" @click="$emit('delete',index)"><img class="delete-icon"
                    src="@/assets/delete.svg" alt=""></button>
            </div>
</template>

<script setup>
import {computed,ref} from 'vue';
const props = defineProps({'onePositions':Object,'weekdays':Object,'index':String,'weekday':String,'section':Object})
const emits = defineEmits(['change','delete']);
const date = new Date();
const resetDate = computed(() => {
    date.setHours(0, 0, 0);
    return new Date(date);
})
const inSection = (interval,start,end)=>{
    for(let i = start; i<=end;i++){
        if(interval==i){
            return true;
        }
    }
}


</script>

<style lang="scss" scoped>
.select {
        display: flex;
        justify-content: center;
        position: relative;
        select {
            padding: 10px 20px;
            border: 2px solid rgb(204, 204, 204);
            border-radius: 5px;
     
          
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
    }
    
</style>