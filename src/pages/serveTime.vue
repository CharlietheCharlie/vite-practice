<template>
    <div class="fixed">
        <pre v-if="showData">{{ weekdays }}</pre>
        <button @click="showData=!showData">查看資料格式</button>
    </div>
    <div class="content">


        <h1 class="title">供應時間</h1>
        <div class="weekday" v-for="weekday, index in weekdays">
            <h2>星期{{ chineseWeekdays[index[8]] }}</h2>
            <label class="switch">
                <input type="checkbox" :checked="Number(weekday)"
                    @change="Number(weekday) ? (weekdays[index] = '0'.repeat(48), setTime()) : (weekdays[index] = '1'.repeat(48), setTime())">
                <span class="slider round"></span>
            </label>
            <p v-if="Number(weekday)">本日供餐</p>
            <p v-if="!Number(weekday)">本日不供餐</p>
            <div class="select" v-show="Number(weekday)">
                <!-- 起始時間 -->
                <select name="serve" :id="'serveStart_' + index" ref="serveStarts" @change="intervalChange(index)">
                    <option value="0">00 : 00</option>
                    <option v-for="interval in 46" :value="interval" :disabled="interval >= weekdays[index].lastIndexOf(1)">
                        {{ String(new Date(new Date(resetDate).setMinutes(interval * 30)).getHours()).padStart(2, "0") }} :
                        {{ String(new Date(new Date(resetDate).setMinutes(interval * 30)).getMinutes()).padStart(2, "0") }}
                    </option>
                    <!-- <option value="47">23 : 59</option> -->
                </select>
                <h2> ~ </h2>
                <!-- 結束時間 -->
                <select name="serve" :id="'serveEnd_' + index" ref="serveEnds" @change="intervalChange(index)">
                    <!-- <option value="0">00 : 00</option> -->
                    <option v-for="interval in 46" :value="interval" :disabled="interval <= weekdays[index].indexOf(1)">
                        {{ String(new Date(new Date(resetDate).setMinutes(interval * 30)).getHours()).padStart(2, "0") }} :
                        {{ String(new Date(new Date(resetDate).setMinutes(interval * 30)).getMinutes()).padStart(2, "0") }}
                    </option>
                    <option value="47">23 : 59</option>
                </select>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
const date = new Date();
const resetDate = computed(() => {
    date.setHours(0, 0, 0);
    return new Date(date);
})
const serveStarts = ([]);
const serveEnds = ([])
const weekdays = ref({
    "week_day0": "000000000000000000000000000000000000000000000000",
    "week_day1": "111111111111111111111111111111111111111111111111",
    "week_day2": "000000111111000000000000000000000000000000000000",
    "week_day3": "000000000000111111000000000000000000000000000000",
    "week_day4": "000000000000000000000000111111111111000000000000",
    "week_day5": "000000000000000000000000000000000000111111111111",
    "week_day6": "111111111111111111111111111111111111111111111111"
})
const chineseWeekdays = ref(["一", "二", "三", "四", "五", "六", "日"])
const showData = ref(false);
const intervalChange = function (index) {
    const startSelect = document.getElementById(`serveStart_${index}`).value;
    const endSelect = document.getElementById(`serveEnd_${index}`).value;
    console.log(startSelect, endSelect);

    weekdays.value[index] = '0'.repeat(startSelect) + '1'.repeat(endSelect - startSelect + 1) + '0'.repeat(47 - endSelect)


}
const setTime = () => {
    serveStarts.forEach((serveStart, index) => {
        if (weekdays.value[`week_day${index}`].indexOf(1) >= 0) {
            serveStart.value = weekdays.value[`week_day${index}`].indexOf(1);
        }

    })
    serveEnds.forEach((serveEnd, index) => {
        if (weekdays.value[`week_day${index}`].indexOf(1) >= 0) {
            serveEnd.value = weekdays.value[`week_day${index}`].lastIndexOf(1);
        }
    })
}
onMounted(() => {

    setTime();

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
}</style>

