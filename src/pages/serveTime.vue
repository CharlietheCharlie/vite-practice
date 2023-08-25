<template>
    <div class="fixed">
        <pre v-if="showData">{{ weekdays }}</pre>
        <button @click="showData = !showData">查看資料格式</button>
    </div>
    <div class="content">
        <h1 class="title">供應時間</h1>
        <div class="weekday" :class="index" v-for="weekday, index in weekdays">
            <h2>星期{{ chineseWeekdays[index[8]] }}</h2>
            <label class="switch">
                <input type="checkbox" :checked="Number(weekday)"
                    @change="Number(weekday) ? (weekdays[index] = '0'.repeat(48), getOnePosition(weekdays[index], index), removeAllSelectors(index)) : (weekdays[index] = '1'.repeat(48), getOnePosition(weekdays[index], index))">
                <span class="slider round"></span>
            </label>
            <p v-if="Number(weekday)">本日供餐</p>
            <p v-if="!Number(weekday)">本日不供餐</p>
            <TimeSelector v-for="sec, i in onePositions[index]?.length" :onePositions="onePositions" :weekdays="weekdays"
                :index="index" :weekday="weekday" :section="onePositions[index][i]" @change="intervalChange(index)">
            </TimeSelector>
            <button class="rounded bg-gray-200 py-2 px-4 hover:bg-gray-400" @click="addSelector(index)"
                v-if="weekday !== '0'.repeat(48) && weekday !== '1'.repeat(48)">新增</button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import TimeSelector from '@/components/TimeSelector.vue';
const date = new Date();
const resetDate = computed(() => {
    date.setHours(0, 0, 0);
    return new Date(date);
});
const selectorAmount = ref({});
const serveStarts = ref([]);
const serveEnds = ref([]);
const weekdays = ref({
    "week_day0": "000000000000000000000000000000000000000000000000",
    "week_day1": "111111111111111111111111111111111111111111111111",
    "week_day2": "000000111111000000000000000000000000000000000000",
    "week_day3": "000000000000111111000000000000000000000000000000",
    "week_day4": "000000000000000000000000111111111111000000000000",
    "week_day5": "000000000000000000000000000000000000111111111111",
    "week_day6": "111111111111111111111111111111111111111111111111"
})
const onePositions = ref({});
const chineseWeekdays = ref(["一", "二", "三", "四", "五", "六", "日"])
const showData = ref(false);

//選擇器元件變更時段後將區間轉換為資料格式
const intervalChange = function (index) {
    //取得變動的選擇器
    const sections = onePositions.value[index];
    //先建立一個全部為0的資料
    let newWeekdays = sections.length<=1?'0'.repeat(weekdays.value[index].length):weekdays.value[index];
    //用迴圈找出有幾個選擇器區間
    for (let i = 0; i < sections.length; i++) {
        

        newWeekdays = newWeekdays.substring(0, sections[i].start) + '1'.repeat(sections[i].end-sections[i].start) + newWeekdays.substring(sections[i].end,weekdays.value[index].length);
        
        console.log(newWeekdays);
    }
    weekdays.value[index] = newWeekdays;

    getOnePosition(weekdays.value[index], index);
}
//新增時段選擇器
const addSelector = (index) => {
    if (onePositions.value[index]) {
        onePositions.value[index].push({ "start": "choose", "end": "choose" });
        return
    }
    
}
const removeAllSelectors = (index) => {
    selectorAmount.value[index] = 0;
}
//取得1的位置，並轉換為選擇器元件接收的數值
const getOnePosition = (weekday, index) => {
    const positions = [];
    let start = -1;
    for (let i = 0; i < weekday.length; i++) {
        if (weekday[i] === '1') {
            if (start === -1) {
                start = i;
            }
        } else {
            if (start !== -1) {
                positions.push({ start, end: i });
                start = -1;
            }
        }
    }
    if (start !== -1) {
        positions.push({ start, end: weekday.length  });
    }
    onePositions.value[index] = positions;
}

onMounted(() => {


    for (let weekday in weekdays.value) {
        getOnePosition(weekdays.value[weekday], weekday);
    }

})
</script>

<style lang="scss" scoped>
.weekday {
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    gap: 20px;

    h2 {
        flex-basis: 10%;
        font-weight: bold;
    }

    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;

        input {
            opacity: 0;
            width: 0;
            height: 0;

            &:checked+.slider {
                background-color: #4f9cf5;

                &:before {
                    -webkit-transform: translateX(26px);
                    -ms-transform: translateX(26px);
                    transform: translateX(26px);
                }
            }

            &:focus+.slider {
                box-shadow: 0 0 1px #2196F3;
            }



        }

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            -webkit-transition: .4s;
            transition: .4s;
            border-radius: 34px;

            &:before {
                position: absolute;
                content: "";
                height: 26px;
                width: 26px;
                left: 4px;
                bottom: 4px;
                background-color: white;
                -webkit-transition: .4s;
                transition: .4s;
                border-radius: 50%;
            }
        }
    }

    .select {
        display: flex;
        justify-content: center;

        select {
            padding: 10px 20px;
            border: 2px solid rgb(204, 204, 204);
            border-radius: 5px;


        }
    }
}

.fixed {
    text-align: center;
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    z-index: 1;

    button {
        width: 100%;

        &:hover {
            background-color: rgb(186, 186, 255);
        }
    }
}</style>

