<template>
	<view class="content">
		<view class="scroll-top">
			<uniStatusBar></uniStatusBar>
			<view class="brand-view" @tap="popup">
				<image src="../../static/img/brand.png" class="brand" mode="widthFix"></image>
			</view>
			<view class="role">
                <view class="left">
                	<image src="../../static/img/role.png"></image>
                </view>
                <view class="right">
                	<view class="role-info">
                		<view class="head">
                			<image src="../../static/img/head.png"></image>
                		</view>
                		<view class="title">
                			<view class="name">
                                <input v-if="showEdit" type="text" focus="true" :value="memberInfo.member_name" 
                                    @input="memberChange"
                                    @blur="editMember" />
                				<view v-else class="uni-ellipsis">
                					{{memberInfo.member_name}}
                				</view>
                                
                                <uni-icon v-if="showEdit" type="checkmarkempty" @click="editMember"></uni-icon>
                                <uni-icon v-else type="compose" @click="showEditMember"></uni-icon>
                			</view>
                			<view class="brief">
                				12级 战士
                			</view>
                		</view>
                	</view>
                	<view class="progress">
                		<image src="../../static/img/blood.png"></image>
                		<view class="progress-box">
                			<progress percent="70" stroke-width="20" activeColor="#8F1C25" />
                		</view>
                		<text>35/50</text>
                	</view>
                	<view class="progress">
                		<image src="../../static/img/magic.png"></image>
                		<view class="progress-box">
                			<progress percent="40" stroke-width="20" activeColor="#10CFBD" />
                		</view>
                		<text>35/50</text>
                	</view>
                </view>
			</view>

			<view class="label">
				<view class="item">
					<image src="../../static/img/exp.png" mode="widthFix" class="icon"></image>
					<view class="value">1024</view>
				</view>
				<view class="item">
					<image src="../../static/img/trophy.png" mode="widthFix" class="icon"></image>
					<view class="value">99</view>
				</view>
				<view class="item">
					<image src="../../static/img/star.png" mode="widthFix" class="icon"></image>
					<view class="value">128</view>
				</view>
				<view class="item">
					<image src="../../static/img/coin.png" mode="widthFix" class="icon"></image>
					<view class="value">999</view>
				</view>
			</view>

			<view class="notice" v-if="notice">
				<Notice icon="systemprompt" closable @close="closeNotice">
					{{notice}}
				</Notice>
			</view>
		</view>

		<scroll-view scroll-y :style="{height: scrollHeight+'px'}">
			<view class="task" v-for="(item, type) in taskData" :key="type">
				<view class="task-header" v-show="item.list.length">
					<view class="header-title">{{item.title}}</view>
					<uni-badge :text="item.number_all" round type="warning"></uni-badge>
					<view class="header-progress" v-if="type != 'todo'">
						<progress :percent="item.rate" stroke-width="20" activeColor="#F8D053" />
					</view>
				</view>
				<view class="uni-card">
					<view class="uni-list">
						<block v-for="(task,index) in item.list" :key="index">
							<view class="uni-list-cell uni-collapse">

								<view class="uni-list-cell-navigate uni-navigate-bottom" :class="task.show ? 'uni-active' : ''" @click="trigerCollapse(type,index)">
									<view class="task-name" :class="[task.show ? '' : 'uni-ellipsis', {'text-danger': task.is_delay}]">{{task.task_name}}</view>
									<view class="task-deadline">{{task.deadline_date}}</view>
									<view class="badge-box" v-show="task.show">
										<view v-show="!task.is_finish">
											<uni-badge text="进行" square type="info"></uni-badge>
										</view>
										<view v-show="task.is_finish">
											<uni-badge text="完成" square type="warning"></uni-badge>
										</view>
									</view>
								</view>

								<view class="uni-collapse-content" :class="task.show ? 'uni-active' : ''">
									{{task.task_desc}}
								</view>

								<view class="uni-collapse-footer" :class="task.show ? 'uni-active' : ''">
									<view class="badge-box">
										<uni-badge v-if="task.is_delay" text="逾期" type="danger"></uni-badge>
									</view>
									<view class="rate-box" v-if="type != 'todo'">
										<Rate disabled=true :value="task.difficult">
										</Rate>
									</view>
								</view>

								<view class="switch-box" :class="task.show ? 'bottom' : ''">
									<Switch :value="task.is_finish" :oid="task.id" :otype="type" :oindex="index" @change="finish"></Switch>
								</view>
							</view>
						</block>
					</view>
				</view>
			</view>
		</scroll-view>

		<view class="add-box" @tap="showAddDrawer">
			<image src="../../static/img/add.png"></image>
		</view>

		<uni-drawer :visible="addDrawerVisible" mode="bottom" @close="closeAddDrawer">
			<view class="drawer-content">
				<view class="title">
					发布任务
				</view>
				<view class="logo-box">
					<image src="../../static/img/logo_r.jpg" class="logo"></image>
				</view>
				<view class="form">
					<view class="input-item">
						<picker class="picker-item" mode="selector" :range="typeList" :value="typeIndex" @change="typeChange">
							<view><text class="picker-label">类型</text>{{typeList[typeIndex]}}</view>
						</picker>
					</view>
					<view class="input-item">
						<view class="input-label">名称</view>
						<input type="text" @input="taskNameChange" />
					</view>
					<view class="input-item">
						<view class="input-label">描述</view>
						<textarea auto-height @input="taskDescChange" />
					</view>
					
					<view v-if="typeIndex == 0">
						<view class="input-item">
						    <view class="input-label">难度</view>
						    <Rate
						    	:value = "rateIndex"
						    	@change="difficultChange">
						    </Rate>
						</view>
						<view class="input-item">
							<picker class="picker-item" mode="selector" :range="executiveList" range-key="text" @change="executiveChange">
								<view><text class="picker-label">执行人</text>{{taskExcutive}}</view>
							</picker>
						</view>
						<view class="input-item">
							<picker class="picker-item" mode="date" @change="dateChange">
								<view><text class="picker-label">截止日期</text>{{deadline}}</view>
							</picker>
						</view>
					</view>
                    
        			<view class="btn-group">
        				<button class="btn-primary" @tap="add">决定</button>
        				<button class="btn-default" @tap="closeAddDrawer">取消</button>
        			</view>
        		</view>
        	</view>
        </uni-drawer>
        
        <view class="mask" v-show="showMask" @click="popdown"></view>
        <view class="popup popup-bottom" v-show="showMask">
        	<text @tap="goTeam">选择城堡</text>
        	<text @tap="goHall">任务大厅</text>
        	<!-- <text>我的</text> -->
        </view>
	</view>
</template>

<script>
    import service from '../../service.js';
	import uniStatusBar from '../../components/uni-status-bar.vue';
    import uniDrawer from '../../components/uni-drawer.vue';
	import uniBadge from '../../components/uni-badge.vue';
    import uniIcon from '../../components/uni-icon.vue'

	export default {
		components: {
			uniStatusBar,
            uniDrawer,
			uniBadge,
            uniIcon
		},
		data() {
			return {
                notice: '',
                
                memberInfo: [],
                memberId: '',
                teamuuid: '',
                taskData: [],
                
                scrollHeight: '',
                
                addDrawerVisible: false,
                rateIndex: 0,
                
                taskName: '',
                taskDesc: '',
                taskExcutiveId: '',
                taskExcutive: '',
                deadline: '',
                
                executiveList: [], // 执行人数组
				typeList: ['任务','备忘'],
				typeIndex: 0,
                
                // pop
                showMask: false,
                
                showEdit: false,
			};
		},
        onLoad(e) {
        	let memberInfo = service.getUsers();
            this.memberInfo = memberInfo;
        	this.memberId = memberInfo.id;
            this.teamuuid = service.getTeam();
            this.getTask();
            this.getNotice();
        },
        onReady() {
            uni.getSystemInfo({
            	success: (res) => {
            		let windowHeight = res.screenHeight;
                    
                    let query = uni.createSelectorQuery();
                    query.select(".scroll-top").boundingClientRect();
                    query.select(".add-box").boundingClientRect();
                    query.exec(data => {
                        let top = data[0];
                        let btn = data[1];
                        this.scrollHeight = windowHeight - top.height - btn.height;
                    });
            	}
            })
        },
		methods: {
            memberChange(e) {
                this.memberInfo.member_name = e.detail.value; 
            },
            showEditMember() {
                this.showEdit = true;
            },
            editMember() {
                this.showEdit = false;
                uni.request({
                	url: this.$requestUrl+'Member/edit_member',
                	method: 'POST',
                    header: {
                    	'content-type': 'application/x-www-form-urlencoded'
                    },
                	data: {
                        member_id: this.memberId,
                        member_name: this.memberInfo.member_name
                    },
                	success: res => {
                        if (res.data.status == 1) {
                            service.addUser(res.data.data);
                        }
                    },
                	fail: () => {},
                	complete: () => {}
                });
            },
            closeNotice() {
                this.scrollHeight = this.scrollHeight + 35;
            },
            getNotice() {
                uni.request({
                	url: this.$requestUrl+'Login/get_notice',
                	method: 'GET',
                	data: {
                        team_uuid: this.teamuuid
                    },
                	success: res => {
                        this.notice = res.data.data.content;
                    },
                	fail: () => {},
                	complete: () => {}
                });
            },
            getTask(){
                uni.showLoading({
                	title: '',
                	mask: false
                });
                uni.request({
                	url: this.$requestUrl+'Task/get_task_list',
                	method: 'GET',
                	data: {
                        team_uuid: this.teamuuid,
                        task_executive_id: this.memberId
                    },
                	success: res => {
                        let listData = res.data.data;
                        console.log(listData);
                        this.taskData = listData;
                        this.taskData.today.title = '今日任务';
                        this.taskData.other.title = '其他任务';
						this.taskData.todo.title = '备忘'
                    },
                	fail: () => {},
                	complete: () => {
                        uni.hideLoading()
                    }
                });
            },
			add() {
				if (this.typeIndex == 1) {
					this.addTodo();
				} else {
					this.addTask();
				}
			},
			addTodo() {
				if (this.taskName == '') {
					uni.showToast({
						title: '任务名称',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				}
				uni.request({
					url: this.$requestUrl+'Task/add_todo',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
				        task_publisher_id: this.memberId,
				        task_name: this.taskName,
				        task_desc: this.taskDesc,
				    },
					success: res => {
				        if (res.data.status == 1) {
				            uni.showToast({
				            	title: '发布备忘成功',
				            	mask: false,
				            	duration: 1500
				            });
				        	this.closeAddDrawer();
							this.typeIndex = 0;
				            this.getTask()
				        } else {
				            uni.showToast({
				            	title: '发布备忘失败！',
				                icon: 'none',
				            	mask: false,
				            	duration: 1500
				            });
				        }
				    },
					fail: () => {},
					complete: () => {}
				});
			},
            addTask() {
				if (this.taskName == '') {
					uni.showToast({
						title: '任务名称',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				}
				if (this.taskExcutiveId == '') {
					uni.showToast({
						title: '执行人',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				}
				if (this.rateIndex == '') {
					uni.showToast({
						title: '任务难度',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				}
				if (this.deadline == '') {
					uni.showToast({
						title: '任务截至时间',
						icon: 'none',
						mask: false,
						duration: 1500
					});
					return;
				}
                uni.request({
                	url: this.$requestUrl+'Task/add_task',
                	method: 'POST',
                    header: {
                    	'content-type': 'application/x-www-form-urlencoded'
                    },
                	data: {
                        task_publisher_id: this.memberId,
                        team_uuid: this.teamuuid,
                        task_name: this.taskName,
                        task_desc: this.taskDesc,
                        task_executive_id: this.taskExcutiveId,
                        difficult: this.rateIndex,
                        deadline_time: this.deadline
                    },
                	success: res => {
                        if (res.data.status == 1) {
                            uni.showToast({
                            	title: '发布任务成功',
                            	mask: false,
                            	duration: 1500
                            });
                        	this.closeAddDrawer();
                            this.getTask()
                        } else {
                            uni.showToast({
                            	title: '发布任务失败！',
                                icon: 'none',
                            	mask: false,
                            	duration: 1500
                            });
                        }
                    },
                	fail: () => {},
                	complete: () => {}
                });
            },
			trigerCollapse(type,index) {
				for (let i = 0, len = this.taskData[type].list.length; i < len; ++i) {
					if (index === i) {
						this.taskData[type].list[i].show = !this.taskData[type].list[i].show;
					} else {
						this.taskData[type].list[i].show = false;
					}
				}
			},
			finish(e){
			    let status = e.detail.value;
			    let taskId = e.detail.oid;
			    let type = e.detail.otype;
			    let index = e.detail.oindex;
			    this.taskData[type].list[index].is_finish = e.detail.value;
			    if (status) {
					if (type == 'todo') {
						this.completeTodo(taskId);
					} else{
						this.completeTask(taskId);
					}
			    } else {
					if (type == 'todo') {
						this.cancelTodo(taskId);
					} else{
						this.cancelTask(taskId);
					}
			    }
			},
            completeTask(taskId) {
                uni.request({
                	url: this.$requestUrl+'Task/complete_task',
                	method: 'GET',
                	data: {
                        task_id: taskId
                    },
                	success: res => {
                        uni.showToast({
                        	title: '完成任务',
                            icon: 'none'
                        });
                        this.getTask();
                    },
                	fail: () => {},
                	complete: () => {}
                });
            },
			completeTodo(id) {
				uni.request({
					url: this.$requestUrl+'Task/complete_todo',
					method: 'GET',
					data: {
				        todo_id: id
				    },
					success: res => {
				        uni.showToast({
				        	title: '完成任务',
				            icon: 'none'
				        });
				        this.getTask();
				    },
					fail: () => {},
					complete: () => {}
				});
			},
            cancelTask(taskId) {
                uni.request({
                	url: this.$requestUrl+'Task/cancel_task',
                	method: 'GET',
                	data: {
                		task_id: taskId
                	},
                	success: res => {
                		uni.showToast({
                			title: '取消完成任务',
                			icon: 'none'
                		});
                        this.getTask();
                	},
                	fail: () => {},
                	complete: () => {}
                });
            },
            cancelTodo(id) {
                uni.request({
                	url: this.$requestUrl+'Task/cancel_todo',
                	method: 'GET',
                	data: {
                		todo_id: id
                	},
                	success: res => {
                		uni.showToast({
                			title: '取消完成任务',
                			icon: 'none'
                		});
                        this.getTask();
                	},
                	fail: () => {},
                	complete: () => {}
                });
            },
            getMembers() {
                uni.request({
                	url: this.$requestUrl+'Member/get_members_by_team',
                	method: 'GET',
                	data: {
                        team_uuid: this.teamuuid
                    },
                	success: res => {
                        this.executiveList = res.data.data;
                    },
                	fail: () => {},
                	complete: () => {}
                });
            },
            popup(e) {
                this.showMask = true
            },
            popdown() {
                this.showMask = false
            },
            goTeam() {
                uni.navigateTo({
                	url: '../team/team'
                });
            },
            goHall() {
                uni.navigateTo({
                	url: '../hall/hall',
                });
            },
            closeAddDrawer() {
            	this.addDrawerVisible = false;
            },
            showAddDrawer() {
            	this.addDrawerVisible = true;
                this.getMembers();
            },
			typeChange(e) {
				this.typeIndex = e.detail.value;
			},
            taskNameChange(e) {
                this.taskName = e.detail.value;
            },
            taskDescChange(e) {
                this.taskDesc = e.detail.value;
            },
            difficultChange(e) {
                this.rateIndex = e.detail.index;
            },
            dateChange(e) {
                this.deadline = e.detail.value;
            },
            executiveChange(e) {
                let info = this.executiveList[e.detail.value];
                this.taskExcutive = info['text'];
                this.taskExcutiveId = info['value'];
            }
		}
	}
</script>

<style>
    @import "../../common/icon.css";
	.content {
		padding: 0;
	}

	.role {
		height: 300px;
        display: flex;
	}
    .role .left{
        width: 300px;
        height: 300px;
    }
    .role .left image{
        width: 100%;
        height: 100%;
    }
    .role .right{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        background: #F55753;
        padding: 20px;
    }
    .role .role-info{
        display: flex;
    }
    .role-info .head image{
        width: 100px;
        height: 100px;
        margin-right: 20px;
    }
    .role-info .name{
        font-size: 42upx;
        color: #FFF;
        display: flex;
        align-items: center;
    }
    .role-info .name .uni-ellipsis{
        width: 250upx;
    }
    .role-info .brief{
        font-size: 32upx;
        color: #F9BDBD;
    }
    .role .right .progress{
        display: flex;
        align-items: center;
    }
    .role .progress image{
        width: 50px;
        height: 60px;
        margin-right: 15px;
    }
    .role .progress .progress-box{
    	width: 240upx;
        margin-right: 15px;
    }
    .role .progress text{
        font-size: 32upx;
        color: #FFF;
    }

	.label{
		height: 80px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.label {
		padding: 0 50upx;
		background-color: #28E1E5;
	}

	.label .item {
		display: flex;
		align-items: center;
	}

	.label .icon {
		width: 60upx;
	}

	.label .value {
		font-size: 32upx;
		color: #FFF;
		margin-left: 10px;
	}

	.task-header {
		padding: 20px;
		display: flex;
		align-items: center;
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
    	max-width: 360upx;
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
    
    .uni-collapse-footer{
        width: 100%;
    	display: none;
    	padding: 20px 0;
    }
    .uni-collapse-footer.uni-active{
    	display: flex;
        justify-content: space-between;
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
    
    /* pop */
    .mask {
        position: fixed;
        z-index: 998;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, .3);
    }

    .popup {
        position: absolute;
        z-index: 999;
        background-color: #ffffff;
        -webkit-box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
        box-shadow: 0 0 30upx rgba(0, 0, 0, .1);
    }

    .popup-bottom {
        bottom: 0;
        width: 100%;
        height: 300upx;
        text-align: center;
        display: flex;
        flex-direction: column;
    }

    .popup-bottom text {
        line-height: 100upx;
        font-size: 32upx;
    }
    .popup-bottom text + text{
    	border-top: 1px solid #F2F2F2;
    }

    .popup .list-view {
        height: 600upx;
    }
    
    .add-box{
    	width: 100%;
    	height: 100px;
    	background-color: #E63030;
    	display: flex;
    	justify-content: center;
    	align-items: center;
        position: fixed;
        bottom: 0;
    }
    .add-box image{
    	width: 80px;
    	height: 80px;
    }
</style>
