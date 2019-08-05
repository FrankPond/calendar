

<template>
    <div class="calendar">
        <Header title="西瓜日历" />
        
            <div class="calendar-tools">
                <span class="calendar-prev" @click="prev">
                    <svg width="20" height="20" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g class="transform-group">
                        <g transform="scale(0.015625, 0.015625)">
                            <!-- scale：缩放 g:相当于div path:路径-->
                            <path d="M671.968 912c-12.288 0-24.576-4.672-33.952-14.048L286.048 545.984c-18.752-18.72-18.752-49.12 0-67.872l351.968-352c18.752-18.752 49.12-18.752 67.872 0 18.752 18.72 18.752 49.12 0 67.872l-318.016 318.048 318.016 318.016c18.752 18.752 18.752 49.12 0 67.872C696.544 907.328 684.256 912 671.968 912z" fill="#5e7a88"></path>
                        </g>
                    </g>
                    </svg>
                </span>
                <span class="calendar-next"  @click="next">
                    <svg width="20" height="20" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g class="transform-group">
                        <g transform="scale(0.015625, 0.015625)">
                            <path d="M761.056 532.128c0.512-0.992 1.344-1.824 1.792-2.848 8.8-18.304 5.92-40.704-9.664-55.424L399.936 139.744c-19.264-18.208-49.632-17.344-67.872 1.888-18.208 19.264-17.376 49.632 1.888 67.872l316.96 299.84-315.712 304.288c-19.072 18.4-19.648 48.768-1.248 67.872 9.408 9.792 21.984 14.688 34.56 14.688 12 0 24-4.48 33.312-13.44l350.048-337.376c0.672-0.672 0.928-1.6 1.6-2.304 0.512-0.48 1.056-0.832 1.568-1.344C757.76 538.88 759.2 535.392 761.056 532.128z" fill="#5e7a88"></path>
                        </g>
                    </g>
                    </svg>
                </span>
                <div class="calendar-info">
                <!-- {{monthString}} -->
                <div class="month">
                    <div class="month-inner" :style="{'top':-(this.month*20)+'px'}">
                        <span v-for="m in months">{{m}}</span>
                    </div>
                </div>
                <div class="year">{{year}}</div>
                </div>
            </div>
            <table cellpadding="5">
                <thead>
                    <tr>
                        <td v-for="week in weeks" class="week" >{{week}}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(day,i) in days" style="{'animation-delay',(i*30)+'ms'}">
                        <td v-for="(child,j) in day" :class="{'selected':child.selected,'disabled':child.disabled}" @click="select(i,j)">
                            <span :class="{'red':j==0||j==6}">{{child.day}}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <div class="todo-list">
                <div class="todo-list-entry">
                    <button v-on:click="showOrHide">添加待办事项</button>
                    <input v-if="isShow" type="text" v-model="todo" @keyup.enter="addTodo" placeholder="请输入" />
                    <!-- todo:绑定时间日期属性 -->
                </div>
                <div class="todo-list-content">
                    <h3>正在进行
                    <span>{{todoLen}}</span>
                    </h3>
                    <ol class="todo-doing">
                    <li v-for="(item, index) in todoList" :key="index" v-if="item.done === false && timeTag().timeDay == item.time.timeDay && timeTag().timeMonth == item.time.timeMonth && timeTag().timeYear == item.time.timeYear">
                        <input type="checkbox" @change="changeTodo(index,true)">
                        <p>{{item.todo}}</p>
                        <a @click="deleteTodo(index,true)">-</a>
                    </li>
                    </ol>
                    <h3>已经完成
                        <!-- todo: 将已完成的li变灰 -->
                    <span>{{todoList.length - todoLen}}</span>
                    </h3>
                    <ul class="todo-done">
                    <li v-for="(item, index) in todoList" :key="index" v-if="item.done === true && timeTag().timeDay == item.time.timeDay && timeTag().timeMonth == item.time.timeMonth && timeTag().timeYear == item.time.timeYear">
                        <input type="checkbox" @change="changeTodo(index,false)" checked='checked'>
                        <p>{{item.todo}}</p>
                        <a @click="deleteTodo(index,false)">-</a>
                        <!-- 取反，控制todoList.length - todoLen -->
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
import calendar from './calendar.js';
import * as SaveData from '@/SaveData/SaveData';

export default {
    name : 'Calendar',
    props: {
        
    },
    data() {
        return {
            year: 0,
            month: 0,
            day: 0,
            days: [],
            isShow: false,
            todo: '',
            todoList: [],
            todoLen: 0,
            today: [],
            value: [],
            weeks: ['日', '一', '二', '三', '四', '五', '六'],
            months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],

        }
    },
    watch: {

    },
    mounted() {
        this.init()
        
    },
    activated() {
        this.initTodo()
    },
    components: {
        Header,
        TabBar
    },
    methods: {
        init(){
            let now = new Date()
            this.year = now.getFullYear()
            this.month = now.getMonth()
            this.day = now.getDate()
            if (this.value.length>0) {
                this.year = parseInt(this.value[0])
                this.month = parseInt(this.value[1]) - 1
                this.day = parseInt(this.value[2])
            }
            this.render(this.year, this.month)
        },
        //渲染日期
        render(y, m) {
            //获取这个月第一天是星期几
            let firstDayOfMonth = new Date(y, m, 1).getDay()
            //获取本月最后一天的日期
            let lastDateOfMonth = new Date(y, m+1, 0).getDate()
            //获取上个月最后一天的日期
            let lastDateOfLastMonth = new Date(y, m, 0).getDate()
            this.year = y
            let i, line = 0,temp = [],nextMonthPushDays = 1

            for (i = 1; i <= lastDateOfMonth; i++) {
                let day = new Date(y, m, i).getDay()  //返回星期几（0~6）
                let k
                //第一行
                if (day == 0) {
                    temp[line] = []
                } else if (i == 1) {
                    temp[line] = []
                    //将上月的后几天加入
                    k = lastDateOfLastMonth - firstDayOfMonth + 1
                    for (let j = 0; j < firstDayOfMonth; j++) {
                        temp[line].push(
                            {day: k,disabled: true}
                        )
                        k++;
                    }
                }

                let checkDate = new Date()
                let checkMonth = checkDate.getMonth()
                let checkYear = checkDate.getFullYear()
                //默认选中今天
                if (checkYear == this.year && checkMonth == this.month && i == this.day){
                    //console.log(this.day)
                    temp[line].push(
                        {day: i,selected: true}
                    )
                } else {
                    //普通日期
                    temp[line].push(
                    {day: i,selected:false}
                )
                }
                
                //到周六换行
                if (day == 6 && i < lastDateOfMonth) {
                    line++
                } else if (i == lastDateOfMonth) {
                    //渲染下月的前几天
                    let k = 1
                    for (let d = day; d < 6; d++) {
                        temp[line].push(
                            {day: k,disabled: true}
                        )
                        k++
                    }
                    // 下个月除了补充的前几天开始的日期
                    nextMonthPushDays = k
                }
            } //end for
            // 补充第六行让视觉稳定
            if (line <= 5) {
                for (let i = line + 1; i <= 5; i++) {
                    temp[i] = []
                    let start = nextMonthPushDays
                    for (let d = start; d <= start + 6; d++) {
                        temp[i].push(
                            {day: d,disabled: true}
                        )
                    }
                }
            }
            this.days = temp
        },
        // 上月
        prev(e) {
            // e.stopPropagation()
            // //不再派发事件。
            // //终止事件在传播过程的捕获、目标处理或起泡阶段进一步传播。
            // //调用该方法后，该节点上处理该事件的处理程序将被调用，事件不再被分派到其他节点。
            if (this.month == 0) {
                this.month = 11
                this.year = parseInt(this.year) - 1
            } else {
                this.month = parseInt(this.month) - 1
            }
            this.render(this.year, this.month)
            this.defaultSelected()
        },
        //切换月份时，默认选择1号
        defaultSelected(){
            let now = new Date()
            let nowMonth = now.getMonth()
            let nowYear = now.getFullYear()
            if (this.year == nowYear) { //防止和当前月份冲突
                if (this.month != nowMonth ) { 
                    for(var i = 0; i < 7; i++) {
                        if (this.days[0][i].day == 1) {
                            this.days[0][i].selected = true
                        }
                    }
                }
            } else {
                for(var i = 0; i < 7; i++) {
                    if (this.days[0][i].day == 1) {
                        this.days[0][i].selected = true
                    }
                }
            }
                
        },
        //  下月
        next(e) {
            if (this.month == 11) {
                this.month = 0
                this.year = parseInt(this.year) + 1
            } else {
                this.month = parseInt(this.month) + 1
            }
            this.render(this.year, this.month)
            this.defaultSelected()
        },
        showOrHide: function() {
            this.isShow = !this.isShow
        },
        //添加待办事项
        addTodo() {
        let todoObj = {
        todo: this.todo,    
        done: false, //默认未完成
        //为对象绑定当前选择的日期
        time: this.timeTag()
        }
        var tempList = SaveData.getItem('todoList')
        // if (tempList) {
            tempList.push(todoObj)
            SaveData.setItem('todoList',tempList)
        // } else {
        //     var tempData = []
        //     tempData.push(todoObj)
        //     SaveData.setItem('todoList',tempData)
        // }
        this.todoList.push(todoObj) //添加到todoList数组中
        this.todoLen++
        this.todo = ''  //记得清空todo的内容，以便下一个输入
        //todo:输入不能为空，弹出警告
        console.log(todoObj.time)
        },
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
        initTodo() {
            var todoArr = SaveData.getItem('todoList')
            if (todoArr) {
                for (let i = 0; i < todoArr.length; i++) {
                    if (todoArr[i].done === false) {
                        this.todoLen++
                    }
                }
                this.todoList = todoArr
            }
        },
        select(i, j) {
            // 清空上次选中
            if (this.today.length >= 0) {
                this.days.forEach(v=>{
                    v.forEach(vv=>{
                        vv.selected = false
                    })
                })
            }
            // 设置当前选中天
            this.days[i][j].selected = true
            this.day = this.days[i][j].day
            this.today = [i, j]
            // console.log(this.year+'年'+(this.month+1)+'月'+this.day+'日')
        },
        timeTag() {
            
            for(var i = 0; i < this.days.length; i++) {
                for(var j = 0; j < 7; j++) {
                    if (this.days[i][j].selected) {
                        // console.log(this.year+'年'+(this.month+1)+'月'+this.days[i][j].day+'日')
                        return {timeYear: this.year,timeMonth: this.month+1,timeDay: this.days[i][j].day}
                    }
                }
            }
        }
    }
}
</script>

<style scoped>
.calendar {
    margin:auto;
    width: 100%;
    min-width:300px;
    background: #fff;
    font-family: "PingFang SC","Hiragino Sans GB","STHeiti","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
    user-select:none;
}
.calendar-tools{
    height:40px;
    font-size: 20px;
    line-height: 40px;
    color:#5e7a88;
    margin:  2px 0 2px 0;
}
.calendar-tools span{
    cursor: pointer;
}
.calendar-prev{
    width: 14.28571429%;
    float:left;
    text-align: center;
}
.calendar-info{
    padding-top: 3px;
    font-size:16px;
    line-height: 1.3;
    text-align: center;
}
.calendar-info>div.month{
    margin:auto;
    height:20px;
    width:100px;
    text-align: center;
    color:#5e7a88;
    overflow: hidden;
    position: relative;
}
.calendar-info>div.month .month-inner{
    position: absolute;
    left:0;
    top:0;
    height:240px;
    transition:top .5s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.calendar-info>div.month .month-inner>span{
    display: block;
    font-size: 14px;
    height:20px;
    width:100px;
    overflow: hidden;
    text-align: center;
}
.calendar-info>div.year{
   font-size:10px;
   line-height: 1;
   color:#999;
}
.calendar-next{
    width: 14.28571429%;
    float:right;
    text-align: center;
}
.calendar table {
    clear: both;
    width: 100%;
    margin-bottom:10px;
    border-collapse: collapse;
    color: #444444;
}
.calendar td {
    margin:2px !important;
    padding:0px 0;
    width: 14.28571429%;
    height:44px;
    text-align: center;
    vertical-align: middle;
    font-size:14px;
    line-height: 125%;
    cursor: pointer;
    position: relative;
    vertical-align: top;
}
.calendar td.week{
    font-size:10px;
    pointer-events:none !important;
    cursor: default !important;    
}
.calendar td.disabled {
    color: #ccc;
    pointer-events:none !important;
    cursor: default !important;
}
.calendar td.disabled div{
    color: #ccc;
}
.calendar td span{
    display:block;
    max-width:40px;
    height:26px;
    font-size: 16px;
    line-height:26px;
    margin:0px auto;
    border-radius:20px;
}
.calendar td:not(.selected) span:not(.red):hover{
    background:#f3f8fa;
    color:#444;
}
.calendar td:not(.selected) span.red:hover{
    background:#f9efef;
}

.calendar td:not(.disabled) span.red{
    color:#ea6151;
}
.calendar td.selected span{
    background-color: #5e7a88;
    color: #fff;
}
.calendar td .text{
    position: absolute;
    top:28px;
    left:0;
    right:0;
    text-align: center;
    
    padding:2px;
    font-size:8px;
    line-height: 1.2;
    color:#444;
}
.calendar td .isGregorianFestival,
.calendar td .isLunarFestival{
    color:#ea6151;
}
.calendar td.selected span.red{
    background-color: #ea6151;
    color: #fff;
}
.calendar td.selected span.red:hover{
    background-color: #ea6151;
    color: #fff;
}
.calendar thead td {
  text-transform: uppercase;
  height:30px;
  vertical-align: middle;
}
.calendar-button{
    text-align: center;
}
.calendar-button span{
    cursor: pointer;
    display: inline-block;
    min-height: 1em;
    min-width: 5em;
    vertical-align: baseline;
    background:#5e7a88;
    color:#fff;
    margin: 0 .25em 0 0;
    padding: .6em 2em;
    font-size: 1em;
    line-height: 1em;
    text-align: center;
    border-radius: .3em;
}
.calendar-button span.cancel{
    background:#efefef;
    color:#666;
}
.calendar-years{
    position: absolute;
    left:0px;
    top:60px;
    right:0px;
    bottom:0px;
    background:#fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap:wrap;
    overflow: auto;
    transition:all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
    opacity: 0;
    pointer-events: none;
    transform: translateY(-10px);
}
.calendar-years.show{
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0px);
}
.calendar-years>span{
    margin:1px 5px;
    display: inline-block;
    width:60px;
    line-height: 30px;
    border-radius: 20px;
    text-align:center;
    border:1px solid #fbfbfb;
    color:#999;
}
.calendar-years>span.active{
    border:1px solid #5e7a88;
    background-color: #5e7a88;
    color:#fff; 
}
.todo-list {
    padding: 0 10px;
}
.todo-list-entry {
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
}
.todo-list-entry button {
    width: 118px;
    height: 32px;
    text-align: center;
    background-color: #5e7a88;
    border:1px solid #5e7a88;
    color: #fff;
	font-size: 16px; 
    text-align: center; 
    font-weight: normal;
	border-radius:8px;
    cursor: pointer;
}
.todo-list-entry input {
    
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


