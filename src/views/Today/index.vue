<template>
    <div id="main">
        <Header title="今天" />
        <div id="today">
            <div class="pictureCard">
                <div class="nowDate">
                    <span style="font-size: 13vw;">25</span>
                    <br>
                    <span style="font-size: 4.5vw;">7月 2019</span>
                </div>
                
            </div>
            <div class="content">
                <div class="randomSayings">
                    <p>“故欲胜人者，必先自胜；欲论人者，必先自论；欲知人者，必先自知。”</p>
                </div>
               <!-- <p>{{this.$store.state.thingsTodo}}</p> -->
                <h3>正在进行
                <!-- <span>{{todoLen}}</span> -->
                </h3>
                <ol class="todo-doing">
                    <li v-for="(item, index) in todoList" :key="index" v-if="item.done === false">
                        <input type="checkbox" @change="changeTodo(index,true)">
                        <p>{{item.todo}}</p>
                        <a @click="deleteTodo(index,true)">-</a>
                    </li>
                </ol>
                <h3>已经完成
                    <!-- <span>{{todoList.length - todoLen}}</span> -->
                </h3>
                <ul class="todo-done">
                    <li v-for="(item, index) in todoList" :key="index" v-if="item.done === true ">
                        <input type="checkbox" @change="changeTodo(index,false)" checked='checked'>
                        <p>{{item.todo}}</p>
                        <a @click="deleteTodo(index,false)">-</a>
                    </li>
                </ul>
            </div>
        </div>
        <TabBar />
    </div>
</template>

<script>

import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import * as SaveData from '@/SaveData/SaveData';

export default {
    name : 'Today',
    components: {
        Header,
        TabBar
    },
    data() {
        return {
            todoList: [],
        }
    },
    activated() {
        var todoList = window.localStorage.getItem('todoList');
        this.todoList = JSON.parse(todoList);
    },
    methods: {
        changeTodo (index, done) {
        if (done) {
            this.todoLen--
            this.todoList[index].done = true
            SaveData.setItem('todoList',this.todoList)
        } else {
            this.todoLen++
            this.todoList[index].done = false
            SaveData.setItem('todoList',this.todoList)
        }
        },
        deleteTodo (index, isDelete) {
        if(isDelete){
            this.todoLen--
        }
        this.todoList.splice(index, 1)
        SaveData.setItem('todoList',this.todoList)
        },
    }
    

}
</script>

<style scoped>
#main {

}
.pictureCard {
    background-image: url(http://api.laolibab.cn/king/ssrh_tupian.php);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    /* 背景的宽高缩放比例 */
    width: 100%;
    /* width: 100%;子元素的宽度就等于父元素的宽度,相对于父元素内容区域 */
    height: 60vh;
    position: relative;
    /* padding-top: 100%; */
    /* 当一个div的高度没有时，它的padding值设百分数的话，就依据宽度来定，
    所以padding-top: 100%;就是宽度的值；这样高=宽 */
    display: flex
}

.nowDate {
    color: white;
    text-align: center;
    left: 8vw;
    bottom: 4vw;
    position: absolute;
}
.randomSayings {
    text-align: justify;
    text-justify: newspaper;
    word-break: break-all;
    padding-bottom: 5px;
}

.content {
    padding: 5px 10px 0 10px;
}

.todo-doing {
    display: block;
    list-style-type: decimal;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}
.todo-doing li {
    height: 32px;
    line-height: 32px;
    background: #fff;
    position: relative;
    margin-bottom: 10px;
    padding: 0 45px;
    border-radius: 3px;
    border-left: 5px solid #629A9C;
    box-shadow: 0 1px 2px rgba(0,0,0,0.07);
}
li input {
    position: absolute;
    top: 5px;
    left: 10px;
    width: 22px;
    height: 22px;
    cursor: pointer;
}
li p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}
li a {
    position: absolute;
    top: 2px;
    right: 5px;
    display: inline-block;
    width: 14px;
    height: 12px;
    border-radius: 14px;
    border: 6px double #FFF;
    background: #ea6151;
    line-height: 14px;
    text-align: center;
    color: #FFF;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
}
.todo-done {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}
.todo-done li {
    height: 32px;
    line-height: 32px;
    background: #fff;
    position: relative;
    margin-bottom: 10px;
    padding: 0 45px;
    border-radius: 3px;
    border-left: 5px solid #629A9C;
    box-shadow: 0 1px 2px rgba(0,0,0,0.07);
}
</style>
