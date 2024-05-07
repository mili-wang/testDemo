<template>
	<div>
        <van-nav-bar
            title="我的页面" 
            left-arrow
            @click-left="onClickLeft"
        />
        <div>我的页面</div>
	</div>
</template>
 
<script>

export default {
	name: 'list',
    setup() {
        const onClickLeft = () => history.back();
        return {
            onClickLeft
        }
    }
}
</script>