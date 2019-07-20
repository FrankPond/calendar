<template>
    <div id="main">
        <Header title="更多" />
        Hello More
        <TabBar />
    </div>
</template>

<script>

import Header from '@/components/Header';
import TabBar from '@/components/TabBar';

export default {
    name : 'More',
    components: {
        Header,
        TabBar
    }
}
</script>

<style>

</style>
