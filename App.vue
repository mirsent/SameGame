<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style>
	@import "./common/uni.css";

	page {
		min-height: 100%;
		display: flex;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #FFF;
		padding: 0 20px;
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 40px;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.input-row .title {
		width: 20%;
		height: 50px;
		min-height: 50px;
		padding: 15px 0;
		padding-left: 30px;
		line-height: 50px;
	}

	.input-row input {
		width: 80%;
		height: 50px;
		min-height: 50px;
		padding: 15px 0;
		padding-right: 30px;
		line-height: 50px;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 15px;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 50px;
		padding: 20px;
	}

	button.primary {
		background-color: #0faeff;
	}

	.col-1 {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.col-2 {
		height: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	/* 按钮样式 */
	.btn-primary {
		font-size: 42upx;
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		color: #FFF;
		background-color: #E63030;
		border: none;
		border-radius: 0;
	}

	/* brand */
	.brand-view {
        width: 100%;
		height: 88px;
		display: flex;
		align-items: center;
	}

	.brand-view .brand {
		margin-left: 30upx;
		width: 480upx;
		height: 60upx;
	}
</style>
