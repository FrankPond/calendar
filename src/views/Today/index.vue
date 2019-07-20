<template>
    <div id="main">
        <Header title="今天" />
        <div id="today">
            <div class="pictureCard">
                图片区
            </div>
            <div>
                待办事项
            </div>
        </div>
        <TabBar />
    </div>
</template>

<script>

import Header from '@/components/Header';
import TabBar from '@/components/TabBar';

export default {
    name : 'Today',
    components: {
        Header,
        TabBar
    }
}
</script>

<style scoped>
#main {
    width: auto;
    height: auto;
}
.pictureCard {
    background-image: url(http://api.laolibab.cn/king/ssrh_tupian.php);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 100%;
    /* width: 100%;子元素的宽度就等于父元素的宽度,相对于父元素内容区域 */
    height: 500px;
}
</style>
