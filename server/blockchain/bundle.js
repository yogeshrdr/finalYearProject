const Web3 = require('Web3');

const BlockChain = async() => {
    const foodDonationABI = [
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "name": "donation",
          "outputs": [
            {
              "internalType": "string",
              "name": "donationId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "ngoID",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "userID",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "publicFridgesID",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "donationType",
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
          "name": "donationKey",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
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
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "name": "ngo",
          "outputs": [
            {
              "internalType": "string",
              "name": "ngoId",
              "type": "string"
            },
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
              "name": "",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "ngoDonation",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
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
              "internalType": "string",
              "name": "",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "ngoFridge",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
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
              "internalType": "string",
              "name": "",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "userDonation",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
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
              "internalType": "string",
              "name": "ngoId",
              "type": "string"
            },
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
              "name": "Id",
              "type": "string"
            }
          ],
          "name": "getNgo",
          "outputs": [
            {
              "internalType": "string",
              "name": "ngoId",
              "type": "string"
            },
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
              "name": "donationId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "ngoID",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "userID",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "publicFridgesID",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "donationType",
              "type": "string"
            }
          ],
          "name": "addDonation",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "x",
              "type": "string"
            }
          ],
          "name": "getDonation",
          "outputs": [
            {
              "internalType": "string",
              "name": "donationId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "ngoID",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "userID",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "publicFridgesID",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "donationType",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [],
          "name": "getDonations",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "donationId",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "ngoID",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "userID",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "publicFridgesID",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "donationType",
                  "type": "string"
                }
              ],
              "internalType": "struct FoodDonation.Donation[]",
              "name": "",
              "type": "tuple[]"
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
              "name": "userId",
              "type": "string"
            }
          ],
          "name": "getUserDonations",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "donationId",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "ngoID",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "userID",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "publicFridgesID",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "donationType",
                  "type": "string"
                }
              ],
              "internalType": "struct FoodDonation.Donation[]",
              "name": "",
              "type": "tuple[]"
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
              "name": "ngoId",
              "type": "string"
            }
          ],
          "name": "getNgoDonations",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "donationId",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "ngoID",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "userID",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "publicFridgesID",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "donationType",
                  "type": "string"
                }
              ],
              "internalType": "struct FoodDonation.Donation[]",
              "name": "",
              "type": "tuple[]"
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
              "name": "PublicFridgesId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "NgoId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "publicFridgeAddress",
              "type": "string"
            }
          ],
          "name": "addFridge",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getAllFridge",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "PublicFridgesId",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "NgoId",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "publicFridgeAddress",
                  "type": "string"
                }
              ],
              "internalType": "struct FoodDonation.PublicFridges[]",
              "name": "",
              "type": "tuple[]"
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
              "name": "NgoId",
              "type": "string"
            }
          ],
          "name": "getNgoFridge",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "PublicFridgesId",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "NgoId",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "publicFridgeAddress",
                  "type": "string"
                }
              ],
              "internalType": "struct FoodDonation.PublicFridges[]",
              "name": "",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        }
      ]
      
    const foodDonationAddress = '0xBA14084aA1C5363A0A0B4f49b4072c6d67907376'; 
    const web3 = new Web3('http://localhost:7545');
    const Block = new web3.eth.Contract(foodDonationABI, foodDonationAddress);
    const address = await web3.eth.getAccounts();
    return {Block, address};
}


module.exports = BlockChain;