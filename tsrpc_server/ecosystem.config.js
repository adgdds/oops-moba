/*
 * @Author: dgflash
 * @Date: 2022-06-02 16:17:49
 * @LastEditors: dgflash
 * @LastEditTime: 2022-08-01 15:20:41
 */
module.exports = {
	apps: [
		// 网关服务器
		{
			name: "gate",
			script: "./dist/ServerGate.js",
			env: {
				"NODE_ENV": "production",
				"PORT": "2000"
			},
			env_develop: {
				"NODE_ENV": "develop",
				"PORT": "2000"
			}
		},
		// 匹配服务器 - 1号
		{
			name: "match-1",
			script: "./dist/ServerMatch.js",
			env: {
				"NODE_ENV": "production",
				"PORT": "4000"
			},
			env_develop: {
				"NODE_ENV": "develop",
				"PORT": "4000"
			}
		},
		// 房间服务器 - 1号
		{
			name: "room-1",
			script: "./dist/ServerRoom.js",
			env: {
				"NODE_ENV": "production",
				"PORT": "4001",
				"SERVER_URL_ROOM": "43.142.65.105",
				"SERVER_URL_MATCH": "43.142.65.105:4000"
			},
			env_develop: {
				"NODE_ENV": "develop",
				"PORT": "4001",
				"SERVER_URL_ROOM": "127.0.0.1",
				"SERVER_URL_MATCH": "127.0.0.1:4000"
			}
		},
		// 匹配服务器 - 2号
		{
			name: "match-2",
			script: "./dist/ServerMatch.js",
			env: {
				"NODE_ENV": "production",
				"PORT": "5000"
			},
			env_develop: {
				"NODE_ENV": "develop",
				"PORT": "5000"
			}
		},
		// 房间服务器 - 2号
		{
			name: "room-2",
			script: "./dist/ServerRoom.js",
			env: {
				"NODE_ENV": "production",
				"PORT": "5001",
				"SERVER_URL_ROOM": "43.142.65.105",
				"SERVER_URL_MATCH": "43.142.65.105:5000"
			},
			env_develop: {
				"NODE_ENV": "develop",
				"PORT": "5001",
				"SERVER_URL_ROOM": "127.0.0.1",
				"SERVER_URL_MATCH": "127.0.0.1:5000"
			}
		}
	]
}
