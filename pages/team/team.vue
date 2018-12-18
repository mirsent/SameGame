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
                    :class="teamOnIndex==index?'on':''"
                    :data-index = "index"
                    :data-uid = "team.team_uuid"
                    @tap="chooseTeam">
        			<view class="icon">
        				<view class="top"></view>
        				<view class="bottom"></view>
        			</view>
        			<view class="name uni-flex">
        				<view class="left">
        					<view class="title uni-ellipsis">{{team.team_name}}</view>
        					<view class="brief">
        						城堡运行了<text>{{team.days-0+1}} </text>天
        					</view>
        				</view>
        				<view class="right">
        					<image src="../../static/img/logo_s.png" mode="widthFix"></image>
        				</view>
        			</view>
        		</view>
        		<view class="team-item" v-if="teamData.length < 3" @tap="showAddDrawer">
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
                <view class="team-item" v-if="teamData.length < 3" @tap="showJoinDrawer">
                	<view class="icon">
                		<view class="top"></view>
                		<view class="bottom"></view>
                	</view>
                	<view class="name uni-flex">
                		<view class="left">
                			<view class="title uni-ellipsis">加入城堡</view>
                		</view>
                		<view class="right">
                			<image src="../../static/img/logo_s.png" mode="widthFix"></image>
                		</view>
                	</view>
                </view>
        	</view>
        	<button class="btn-primary" @tap="goTask">继续游戏</button>
        </view>
        
        <uni-drawer :visible="addDrawerVisible" mode="bottom" @close="closeAddDrawer">
        	<view class="drawer-content">
        		<view class="title">
                    创建新城堡
                </view>
                <view class="logo-box">
                	<image src="../../static/img/logo_r.jpg" class="logo"></image>
                </view>
                <view class="form">
                	<input type="text" placeholder="城堡名称" value="" @blur="teamNameChange" />
                    <view class="btn-group">
                    	<button class="btn-primary" @tap="createTeam">决定</button>
                    	<button class="btn-default" @tap="closeAddDrawer">取消</button>
                    </view>
                </view>
        	</view>
        </uni-drawer>
        
        <uni-drawer :visible="joinDrawerVisible" mode="bottom" @close="closeJoinDrawer">
        	<view class="drawer-content">
        		<view class="title">
                    加入城堡
                </view>
                <view class="logo-box">
                	<image src="../../static/img/logo_r.jpg" class="logo"></image>
                </view>
                <view class="form">
                	<input type="text" placeholder="城堡编号" value="" @blur="teamNoChange" />
                    <view class="btn-group">
                    	<button class="btn-primary" @tap="joinTeam">决定</button>
                    	<button class="btn-default" @tap="closeJoinDrawer">取消</button>
                    </view>
                </view>
        	</view>
        </uni-drawer>
	</view>
</template>

<script>
    import service from '../../service.js';
    import uniStatusBar from '../../components/uni-status-bar.vue';
    import uniDrawer from '../../components/uni-drawer.vue';
    import uniIcon from '../../components/uni-icon.vue';
    
	export default {
        components: {
        	uniStatusBar,
            uniDrawer,
        	uniIcon
        },
		data() {
			return {
                memberId: '',
                teamOnIndex: 0,
                teamOnUid: '',
                teamData: [],
                
                teamName: '',
                teamNo: '',
                
                addDrawerVisible: false,
                joinDrawerVisible: false,
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
                        this.teamOnUid = teamInfo[0]['team_uuid']; // 默认选中第一个
                        this.teamData = teamInfo;
                    },
                	fail: () => {},
                	complete: () => {
                        uni.hideLoading();
                    }
                });
            },
            chooseTeam(e) {
                let info = e.currentTarget.dataset;
                this.teamOnIndex = info.index;
                this.teamOnUid = info.uid;
            },
            goTask() {
                
                if (this.teamData.length < 1) {
                	uni.showToast({
                		icon: 'none',
                		title: '还没有城堡'
                	});
                	return;
                }
                
                service.addTeam(this.teamOnUid);
                uni.navigateTo({
                	url: "../task/task"
                })
            },
            closeAddDrawer() {
            	this.addDrawerVisible = false;
            },
            showAddDrawer() {
            	this.addDrawerVisible = true;
            },
            closeJoinDrawer() {
            	this.joinDrawerVisible = false;
            },
            showJoinDrawer() {
            	this.joinDrawerVisible = true;
            },
            teamNameChange(e) {
                this.teamName = e.detail.value;
            },
            createTeam() {
                if (this.teamName.length == 0) {
                	uni.showToast({
                		title: '请给城堡起个名字吧！',
                        icon: 'none',
                		mask: false,
                		duration: 1500
                	});
                    return;
                }
                uni.showLoading({
                	title: '',
                	mask: false
                });
                uni.request({
                	url: this.$requestUrl+'Team/add_team',
                	method: 'POST',
                    header: {
                    	'content-type': 'application/x-www-form-urlencoded'
                    },
                	data: {
                        founder_id: this.memberId,
                        team_name: this.teamName
                    },
                	success: res => {
                        if (res.data.status == 1) {
                        	uni.showToast({
                        		title: '创建城堡成功！',
                        		mask: false,
                        		duration: 1500
                        	});
                            this.addDrawerVisible = false;
                            this.get_teams();
                        } else {
                            uni.showToast({
                            	title: '创建城堡失败',
                                icon: 'none',
                            	mask: false,
                            	duration: 1500
                            });
                        }
                    },
                	fail: () => {},
                	complete: () => {
                        uni.hideLoading()
                    }
                });
            },
            teamNoChange(e) {
                this.teamNo = e.detail.value;
            },
            joinTeam() {
                uni.showLoading({
                	title: '',
                	mask: false
                });
                if (this.teamNo.length == 0) {
                	uni.showToast({
                		title: '想加入哪座城堡？',
                        icon: 'none',
                		mask: false,
                		duration: 1500
                	});
                    return;
                }
                uni.request({
                	url: this.$requestUrl+'Team/join_team',
                	method: 'POST',
                	header: {
                		'content-type': 'application/x-www-form-urlencoded'
                	},
                    data: {
                        member_id: this.memberId,
                        team_no: this.teamNo
                    },
                	success: res => {
                        if (res.data.status == 1) {
                        	uni.showToast({
                        		title: '加入城堡成功！',
                        		mask: false,
                        		duration: 1500
                        	});
                            this.joinDrawerVisible = false;
                            this.get_teams();
                        } else {
                            uni.showToast({
                            	title: res.data.msg,
                                icon: 'none',
                            	mask: false,
                            	duration: 1500
                            });
                        }
                    },
                	fail: () => {},
                	complete: () => {
                        uni.hideLoading()
                    }
                });
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
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .team-view .label{
        color: #808080;
        text-align: center;
        margin: 40px 0;
    }
    .team-view .label text{
        color: #E63030;
    }
    .team-view .team{
        min-height: 650upx;
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
