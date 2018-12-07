// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const TEAM_KEY = 'TEAM_KEY';
const STATE_KEY = 'STATE_KEY';

const getUsers = function() {
	let ret = '';
	ret = uni.getStorageSync(USERS_KEY);
	if (!ret) {
		ret = '[]';
	}
	return JSON.parse(ret);
}

const addUser = function(userInfo) {
	uni.setStorageSync(USERS_KEY, JSON.stringify(userInfo));
}

const getTeam = function() {
    let ret = '';
    ret = uni.getStorageSync(TEAM_KEY);
    if (!ret) {
    	ret = '[]';
    }
    return JSON.parse(ret);
}

const addTeam = function(teamInfo) {
	uni.setStorageSync(TEAM_KEY, JSON.stringify(teamInfo));
}


export default {
	getUsers,
	addUser,
    getTeam,
    addTeam
}
