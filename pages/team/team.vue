<template>
	<view class="content">
        <uniStatusBar></uniStatusBar>
        
        <view class="brand-view">
        	<image src="../../static/img/brand.png" class="brand" mode="widthFix"></image>
        </view>
        
        <view class="team-view">
        	<view class="label">选择您要继续游戏的<text>城堡</text></view>
        	<view class="team">
        		<view class="team-item" 
                    v-for="(team, index) in teamData" :key="index"
                    :class="index==0?'on':''">
        			<view class="icon">
        				<view class="top"></view>
        				<view class="bottom"></view>
        			</view>
        			<view class="name uni-flex">
        				<view class="left">
        					<view class="title uni-ellipsis">{{team.team_name}}</view>
        					<view class="brief">
        						城堡运行了<text>{{team.days}} </text>天
        					</view>
        				</view>
        				<view class="right">
        					<image src="../../static/img/logo_s.png" mode="widthFix"></image>
        				</view>
        			</view>
        		</view>
        		<view class="team-item" v-if="teamData.length < 3">
        			<view class="icon">
        				<view class="top"></view>
        				<view class="bottom"></view>
        			</view>
        			<view class="name uni-flex">
        				<view class="left">
        					<view class="title uni-ellipsis">创建新城堡</view>
        				</view>
        				<view class="right">
        					<image src="../../static/img/logo_s.png" mode="widthFix"></image>
        				</view>
        			</view>
        		</view>
        	</view>
        	<button class="btn-primary" @tap="goTask">继续游戏</button>
        </view>
	</view>
</template>

<script>
    import service from '../../service.js';
    import uniStatusBar from '../../components/uni-status-bar.vue'
    import uniIcon from '../../components/uni-icon.vue'
    
	export default {
        components: {
        	uniStatusBar,
        	uniIcon
        },
		data() {
			return {
                memberId: '',
                teamOnUid: '',
                teamData: []
			};
		},
        onLoad(e) {
        	let memberInfo = service.getUsers();
            this.memberId = memberInfo.id;
            this.get_teams();
        },
        methods: {
            get_teams() {
                uni.showLoading();
                uni.request({
                	url: this.$requestUrl+'Team/get_team_join_list',
                	method: 'GET',
                	data: {
                        member_id: this.memberId
                    },
                	success: res => {
                        let teamInfo = res.data.data;
                        this.teamOnUid = teamInfo[0]['team_uuid'];
                        this.teamData = teamInfo;
                    },
                	fail: () => {},
                	complete: () => {
                        uni.hideLoading();
                    }
                });
            },
            goTask() {
                
                if (this.teamData.length < 1) {
                	uni.showToast({
                		icon: 'none',
                		title: '还没有城堡'
                	});
                	return;
                }
                
                let detail = {
                	teamuuid: this.teamOnUid
                }
                uni.navigateTo({
                	url: "../task/task?detailData=" + JSON.stringify(detail)
                })
            }
        }
	}
</script>

<style>
    .content{
        align-items: center;
    }
    
    .team-view{
        flex: 1;
        width: 95%;
        font-size: 42upx;
    }
    .team-view .label{
        color: #808080;
        text-align: center;
        margin-top: 150upx;
        margin-bottom: 100upx;
    }
    .team-view .label text{
        color: #E63030;
    }
    .team-view .team{
        margin: 80upx 0;
    }
    
    .team-item{
        height: 180upx;
        margin-bottom: 30px;
        color: #FFF;
        display: flex;
    }
    
    .team-item .icon{
        flex: 1;
    }
    .icon .top{
        height: 110upx;
        background-color: #666;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .icon .top:after{
        content: '';
        display: inline-block;
        width: 26upx;
        height: 26upx;
        background-color: #E6E6E6;
        transform:rotate(45deg);
        -ms-transform:rotate(45deg); 	
        -moz-transform:rotate(45deg); 	
        -webkit-transform:rotate(45deg); 
        -o-transform:rotate(45deg);
    }
    .team-item.on .icon .top{
    	background-color: #FBF357;
    }
    .team-item.on .icon .top:after{
        background-color: #06B4C7;
    }
    .icon .bottom{
        height: 70upx;
        background-color: #CCC;
    }
    .team-item.on .icon .bottom{
    	background-color: #FBAC00;
    }
    
    .team-item .name{
    	width: 440upx;
    	padding: 30upx;
    	background-color: #999;
    	justify-content: space-between;
    	align-items: center;
    }
    .team-item.on .name{
        background-color: #F55753;
    }
    .name .left{
        height: 140upx;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .name .left .title{
        font-size: 42upx;
        width: 350upx;
    }
    .name .left .brief{
        font-size: 32upx;
    }
    .name .left .brief text{
        font-size: 42upx;
    }
    .name .right image{
        width: 80upx;
    }
    
    .btn-primary{
        width: 400upx;
    }
</style>
