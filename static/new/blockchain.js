var contract;
ethereum.enable();
var address="0xafC3204D69C23779943e23533BC249c109077133";
var gasPriceval="3";
var gasval="300";
$(document).ready(function(){
	
	web3=new Web3(web3.currentProvider);
	//var address="0x64ADd870Fb9d6DbdA79504a7458CaDDF6CfE74da";
	var abi=[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "user",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "allinfo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "drivername",
				"type": "string"
			}
		],
		"name": "addBookCarRequest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "user",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "allinfo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "drivername",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "status",
				"type": "string"
			}
		],
		"name": "addRequest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "user",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "img",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "owninfo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "sourcedest",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "datefare",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "uname",
				"type": "string"
			}
		],
		"name": "addrideDetail",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "access",
				"type": "string"
			}
		],
		"name": "checkAccess",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "returnValue",
				"type": "bool"
			}
		],
		"name": "checkRegistry",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "user",
				"type": "string"
			}
		],
		"name": "getBookCarRequest",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "key",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "allinfo",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "username",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "drivername",
						"type": "string"
					}
				],
				"internalType": "struct Rideshare.bookCar[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "data",
				"type": "string"
			}
		],
		"name": "getRecord",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "user",
				"type": "string"
			}
		],
		"name": "getRequest",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "key",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "allinfo",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "username",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "drivername",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "status",
						"type": "string"
					}
				],
				"internalType": "struct Rideshare.request[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "user",
				"type": "string"
			}
		],
		"name": "getrideDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "key",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "img",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "owninfo",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "sourcedest",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "datefare",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "uname",
						"type": "string"
					}
				],
				"internalType": "struct Rideshare.rideDetail[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "user",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "types",
				"type": "string"
			}
		],
		"name": "getuploaddocument",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "key",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "identity",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "contactinfo",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "licenceinfo",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "vehicleinfo",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "uname",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "types",
						"type": "string"
					}
				],
				"internalType": "struct Rideshare.uploadprofile[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "user",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "uname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "password",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "typeofusers",
				"type": "string"
			}
		],
		"name": "login",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "key",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "username",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "password",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "mobile",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "typeofusers",
						"type": "string"
					}
				],
				"internalType": "struct Rideshare.userinfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "user",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "identity",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "contactinfo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "licenceinfo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "vehicleinfo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "uname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "types",
				"type": "string"
			}
		],
		"name": "upload",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "user",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "password",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "mobile",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "typeofusers",
				"type": "string"
			}
		],
		"name": "userRegister",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "int256",
				"name": "uType",
				"type": "int256"
			}
		],
		"name": "userType",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allbookCar",
		"outputs": [
			{
				"internalType": "address",
				"name": "key",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "allinfo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "drivername",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "alldocments",
		"outputs": [
			{
				"internalType": "address",
				"name": "key",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "identity",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "contactinfo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "licenceinfo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "vehicleinfo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "uname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "types",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allrequest",
		"outputs": [
			{
				"internalType": "address",
				"name": "key",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "allinfo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "drivername",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "status",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allrideDetail",
		"outputs": [
			{
				"internalType": "address",
				"name": "key",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "img",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "owninfo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "sourcedest",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "datefare",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "uname",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allusers",
		"outputs": [
			{
				"internalType": "address",
				"name": "key",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "username",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "password",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "mobile",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "typeofusers",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
	contract=new web3.eth.Contract(abi,address);
})
