<template>
	<view class="content">
		<uniStatusBar></uniStatusBar>

		<view class="brand-view">
			<image src="../../static/img/brand.png" class="brand" mode="widthFix"></image>
		</view>

		<view class="banner">
            <image src="../../static/img/header_bg.png" class="banner-bg" mode="widthFix"></image>
            <view class="banner-title">
            	任务大厅
            </view>
		</view>
        
        <view class="tab">
        	<view class="tab-item all">任务市场</view>
        	<view class="tab-item today">今日任务</view>
        	<view class="tab-item other">其他任务</view>
        </view>

		<view class="task">
			<view class="uni-card">
				<view class="uni-list">
					<block v-for="(list,index) in taskData" :key="index">
						<view class="uni-list-cell uni-collapse">
                            
							<view class="uni-list-cell-navigate uni-navigate-bottom" :class="list.show ? 'uni-active' : ''" @click="trigerCollapse(index)">
								<view class="task-name" :class="list.show ? '' : 'uni-ellipsis'">{{list.task_name}}</view>
								<view class="task-deadline">{{list.deadline_date}}</view>
                                <view class="badge-box" v-show="list.show">
                                	<uni-badge text="进行" square type="info"></uni-badge>
                                </view>
                                <view class="task-executive" v-show="!list.show">
                                	马木木
                                </view>
							</view>
                            
							<view class="uni-collapse-content" :class="list.show ? 'uni-active' : ''">
								即可来得及付款链接打开链接付款了大家辅导费地方点击付款进度款
                                
                                <view class="task-executive">
                                    <!-- <text class="executive-btn">领取</text> -->
                                	<text class="executive-text">马木</text>
                                </view>
							</view>
                            
                            <view class="uni-collapse-footer" :class="list.show ? 'uni-active' : ''">
                                <view class="badge-box">
                                	<uni-badge text="big tag" type="warning"></uni-badge>
                                	<uni-badge text="big big tag" type="danger"></uni-badge>
                                	<uni-badge text="big tag"></uni-badge>
                                </view>
                                <view class="rate-box">
                                	<Rate 
                                        disabled = true
                                        :value="list.starIndex4">
                                    </Rate>
                                </view>
                            </view>
						</view>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
    import service from '../../service.js';
	import uniStatusBar from '../../components/uni-status-bar.vue';
	import uniBadge from '../../components/uni-badge.vue';

	export default {
		components: {
			uniStatusBar,
			uniBadge
		},
		data() {
			return {
                memberId: '',
                teamuuid: '',
				taskData: []
			};
		},
        onLoad() {
            let memberInfo = service.getUsers();
            this.memberId = memberInfo.id;
            this.teamuuid = service.getTeam();
            
        	this.get_task();
        },
		methods: {
            get_task(){
                uni.request({
                	url: this.$requestUrl+'Task/get_task_hall',
                	method: 'GET',
                	data: {
                        team_uuid: this.teamuuid
                    },
                	success: res => {
                        console.log(res.data.data);
                        this.taskData = res.data.data;
                    },
                	fail: () => {},
                	complete: () => {}
                });
            },
            change(e){
                let detail = e.detail;
                let eventid = e.currentTarget.dataset.eventid;
                let index = eventid.substring(eventid.lastIndexOf("-") + 1, eventid.length);
                this.taskData[index].is_finish = detail.value;
            },
			trigerCollapse(e) {
				for (let i = 0, len = this.taskData.length; i < len; ++i) {
					if (e === i) {
						this.taskData[i].show = !this.taskData[i].show;
					} else {
						this.taskData[i].show = false;
					}
				}
			}
		}
	}
</script>

<style>
	.content {
		padding: 0;
	}
    
    .banner{
        width: 100%;
        position: relative;
        display: flex;
    }
    .banner .banner-bg{
        width: 100%;
    }
    .banner .banner-title{
        font-size: 48upx;
        color: #FFF;
        height: 110upx;
        line-height: 110upx;
        text-align: right;
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        margin-top: -55upx;
        padding-right: 50upx;
        background-color: rgba(245,87,83,.7);
    }
    
    .tab{
        display: flex;
        height: 90upx;
        margin-bottom: 30px;
    }
    .tab .tab-item{
        color: #FFF;
        font-size: 42upx;
        flex: 1;
        text-align: center;
        line-height: 90upx;
    }
    .tab .all{
        background-color: #FACD00;
    }
    .tab .today{
        background-color: #F55753;
    }
    .tab .other{
        background-color: #06B4C7;
    }

	.header-title {
		font-size: 45upx;
	}

	.task-header .uni-badge {
		margin: 0 20px;
	}

	.header-progress {
		flex: 1;
	}
    
    .uni-card {
    	box-shadow: none;
    }
    .uni-list-cell{
    	align-items: flex-start;
    	padding-left: 120upx;
    	border: 1px solid #F2F2F2;
    	border-radius: 5px;
    	box-shadow: 0 1upx 4upx rgba(0, 0, 0, .3);
    	margin-bottom: 30px;
    }
    .uni-list-cell:after{
    	height: 0;
    }
    
    .uni-list-cell-navigate {
    	padding-left: 0;
    	justify-content: flex-start;
    	align-items: center;
    }
    .uni-list-cell-navigate.uni-active {
    	background-color: #FFF;
    }
    .uni-list-cell-navigate .task-name {
    	font-size: 36upx;
    	max-width: 340upx;
    }
    .uni-list-cell-navigate .task-deadline{
    	font-size: 28upx;
    	margin-left: 20px;
    }
    .uni-list-cell-navigate .uni-badge{
    	position: absolute;
    	top: 0;
    	right: 0;
    }
    .uni-list-cell-navigate .task-executive{
        font-size: 32upx;
        color: #666;
        flex: 1;
        text-align: right;
    }
    /* + -按钮 */
    .uni-list-cell-navigate.uni-navigate-bottom:after {
    	font-family: iconfont;
    	font-size: 60upx;
    	color: #B3B3B3;
    	content: '\e620';
    	left: -100upx;
    	top: 48upx;
    }
    .uni-list-cell-navigate.uni-navigate-bottom.uni-active:after {
    	font-family: iconfont;
    	font-size: 76upx;
    	color: #33414F;
    	content: '\e61f';
    	left: -100upx;
    	top: 60upx;
    }
    
    .uni-collapse-content{
    	display: none;
    	width: 450upx;
    	font-size: 34upx;
    	margin-bottom: 40px;
    }
    .uni-collapse-content.uni-active{
    	display: block;
    }
    
    .uni-collapse-content .task-executive{
        position: absolute;
        right: 15px;
    }
    .uni-collapse-content .task-executive .executive-btn{
        font-size: 42upx;
        color: #FFF;
        background-color: #FACD00;
        padding: 8px 40px;
    }
    .uni-collapse-content .task-executive .executive-text{
        font-size: 60upx;
        color: #CCC;
    }
    
    .uni-collapse-footer{
    	display: none;
    	padding: 20px 0;
    }
    .uni-collapse-footer.uni-active{
    	display: flex;
    	align-items: flex-end;
    }
    .switch-box{
    	position: absolute;
    	top: 18upx;
    	right: 10upx;
    }
    .switch-box.bottom{
    	top: auto;
    	right: auto;
    	bottom: 20px;
    	left: 15upx;
    }
    .uni-collapse-footer .badge-box{
    	display: flex;
    	flex-wrap: wrap-reverse;
    }
    .uni-collapse-footer .badge-box .uni-badge{
    	margin-bottom: 5px;
    	margin-right: 5px;
    }
</style>
