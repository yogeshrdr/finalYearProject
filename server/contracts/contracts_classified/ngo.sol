pragma solidity ^0.8.16;
pragma experimental ABIEncoderV2;

contract NgoContract{
    struct Ngo{
        string ngoId;
        string name;
        string email;
        uint phoneno;
        string ngoAddress;
    }

  
    mapping(string => Ngo) public ngo;

    function addNgo(
        string calldata ngoId, 
        string calldata name, 
        string calldata email, 
        uint phoneno, 
        string calldata ngoAddress
    ) external{
        ngo[ngoId] = Ngo(ngoId, name, email, phoneno, ngoAddress);
    }

    function getNgo(string calldata Id) view external returns(
        string memory ngoId,
        string memory name,
        string memory email,
        uint phoneno,
        string memory ngoAddress
    ){
        Ngo memory x = ngo[Id];
        return(ngoId, x.name, x.email, x.phoneno, x.ngoAddress);
    }

   

}