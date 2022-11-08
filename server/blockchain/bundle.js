const Web3 = require('Web3');

const BlockChain = async() => {
    const foodDonationABI = [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "driveFridgeDonation",
        "outputs": [
          {
            "internalType": "string",
            "name": "ngoId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "driveId",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "ngo",
        "outputs": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "phoneno",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "ngoAddress",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "uniqueId",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "ngoDrives",
        "outputs": [
          {
            "internalType": "string",
            "name": "driveName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "ngoId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "fridgeType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "driveAddress",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "publicFridgeDonation",
        "outputs": [
          {
            "internalType": "string",
            "name": "ngoId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "publicFridgesId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "status",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "publicFridges",
        "outputs": [
          {
            "internalType": "string",
            "name": "ngoID",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "totalSlots",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "fridgeType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "fridgeAddress",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "user",
        "outputs": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "phoneno",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "phoneno",
            "type": "uint256"
          }
        ],
        "name": "addUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "phoneno",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "ngoAddress",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "uniqueId",
            "type": "string"
          }
        ],
        "name": "addNgo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "driveName",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "ngoId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "fridgeType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "driveAddress",
            "type": "string"
          }
        ],
        "name": "addNgoDrives",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "ngoID",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "totalSlots",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "fridgeType",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "fridgeAddress",
            "type": "string"
          }
        ],
        "name": "addPublicFridges",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "ngoId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "publicFridgesId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "status",
            "type": "string"
          }
        ],
        "name": "addPublicFridgeDonations",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "ngoId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "userId",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "driveId",
            "type": "string"
          }
        ],
        "name": "addDriveFridgeDonation",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
      
    const foodDonationAddress = ' 0x03A136c74756A6B2c12ff27A7380E22eB5C8201a'; 
    const web3 = new Web3('http://localhost:7545');
    const Block = new web3.eth.Contract(foodDonationABI, foodDonationAddress);
    const address = await web3.eth.getAccounts();
    return {Block, address};
}


module.exports = BlockChain;