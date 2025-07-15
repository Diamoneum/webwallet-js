let global : any = typeof window !== 'undefined' ? window : self;
global.config = {
	apiUrl:typeof window !== 'undefined' && window.location ? window.location.href.substr(0,window.location.href.lastIndexOf('/')+1)+'api/' : 'https://wallet.diamoneum.xyz/api/',
	mainnetExplorerUrl: "http://explorer.diamoneum.com/",
	mainnetExplorerUrlHash: "http://explorer.diamoneum.com/?hash={ID}#blockchain_transaction",
	mainnetExplorerUrlBlock: "http://explorer.diamoneum.com/?hash={ID}#blockchain_block",
	testnetExplorerUrl: "http://testnet.diamoneum.com/",
	testnetExplorerUrlHash: "http://testnet.diamoneum.com/?hash={ID}#blockchain_transaction",
	testnetExplorerUrlBlock: "http://testnet.diamoneum.com/?hash={ID}#blockchain_block",
	testnet: false,
    coinUnitPlaces: 8,
    coinDisplayUnitPlaces: 8,
	txMinConfirms: 10,         
	txCoinbaseMinConfirms: 10,
	addressPrefix: 0x9825b,
	integratedAddressPrefix: 0x9825b,
	addressPrefixTestnet: 111,
	integratedAddressPrefixTestnet: 112,
	subAddressPrefix: 0x9825b,
	subAddressPrefixTestnet: 113,
	coinFee: new JSBigInt('100000000000'),
	feePerKB: new JSBigInt('100000000000'), //for testnet its not used, as fee is dynamic.
	dustThreshold: new JSBigInt('100000000'),//used for choosing outputs/change - we decompose all the way down if the receiver wants now regardless of threshold
	defaultMixin: 0, // default value mixin

	idleTimeout: 30,
	idleWarningDuration: 20,

	coinSymbol: 'DIAM',
	openAliasPrefix: "diam",
	coinName: 'Diamoneum',
	coinUriPrefix: 'diamoneum:',
	avgBlockTime: 120,
	maxBlockNumber: 500000000,
};
