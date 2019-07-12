<template>
	<div class="empty">
		<i class="iconfont icon-nodata" style="font-size:88px;color:#999;"></i>
		<div class="tips">{{tips}}</div>
		<div class="slot">
			<slot name="msg"></slot>
		</div>		
	</div>
</template>

<script>
export default {
	name: 'empty',
	props: {
		tips: {
            type: String,
            // default: "暂无数据"
		}
	},	
	data () {
		return {
		}
	}
}
</script>

<style  lang="scss" scoped>
.empty{
	width: 100%;
	display: flex;
	padding-top: 15px;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	text-align: center;
	font-size: 14px;
	.tips,.slot{
		display: flex;
		text-align: center;
        color: #999;
        font-size: 15px;
		line-height: 16px;
	};
	padding-bottom: 20px;
}
</style>
