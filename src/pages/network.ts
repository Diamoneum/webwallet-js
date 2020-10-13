/*
 * Copyright (c) 2018, Gnock
 * Copyright (c) 2018, The Masari Project
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 * 3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import {DestructableView} from "../lib/numbersLab/DestructableView";
import {VueVar, VueRequireFilter} from "../lib/numbersLab/VueAnnotate";
import {Constants} from "../model/Constants";
import {Wallet} from "../model/Wallet";
import {AppState} from "../model/AppState";
import {BlockchainExplorer, NetworkInfo} from "../model/blockchain/BlockchainExplorer";
import {BlockchainExplorerProvider} from "../providers/BlockchainExplorerProvider";
import {VueFilterHashrate} from "../filters/Filters";

AppState.enableLeftMenu();
let blockchainExplorer: BlockchainExplorer = BlockchainExplorerProvider.getInstance();

@VueRequireFilter('hashrate', VueFilterHashrate)

class NetworkView extends DestructableView {
	@VueVar(0) networkHashrate !: number;
	@VueVar(0) blockchainHeight !: number;
	@VueVar(0) networkDifficulty !: number;
	@VueVar(0) lastReward !: number;
	@VueVar(0) lastBlockFound !: number;
	@VueVar(0) connectedNode !: string;

	private intervalRefreshStat = 0;

	constructor(container: string) {
		super(container);

		let self = this;
		this.intervalRefreshStat = <any>setInterval(function () {
			self.refreshStats();
		}, 30 * 1000);
		this.refreshStats();
	}

	destruct(): Promise<void> {
		clearInterval(this.intervalRefreshStat);
		return super.destruct();
	}

	refreshStats() {
/*
		let self = this;
		let randInt = Math.floor(Math.random() * Math.floor(config.nodeList.length));
		$.ajax({
			url:config.nodeUrl+'json_rpc',
			method: 'POST',
			data: JSON.stringify(
				{
					"jsonrpc": "2.0",
					"id": 0,
					"method": "getlastblockheader",
					"params": {}
				}
			)
		}).done(function(data : any){
			self.networkDifficulty = data['result']['block_header'].difficulty;
			self.networkHashrate = parseFloat((data['result']['block_header'].difficulty/config.avgBlockTime/1000000).toFixed(2));
			self.blockchainHeight = data['result']['block_header'].height;
			self.lastReward = data['result']['block_header'].reward/Math.pow(10, config.coinUnitPlaces);
			self.lastBlockFound = parseInt(data['result']['block_header'].timestamp);
			self.connectedNode = config.nodeUrl;
*/
		blockchainExplorer.getNetworkInfo().then((info: NetworkInfo) => {
			console.log(info);
			this.connectedNode = info.node;
			this.networkDifficulty = info.difficulty;
			this.networkHashrate = info.difficulty / config.avgBlockTime;
			this.blockchainHeight = info.height;
			this.lastReward = info.reward / Math.pow(10, config.coinUnitPlaces);
			this.lastBlockFound = info.timestamp;
		});
	}
}

new NetworkView('#app');
