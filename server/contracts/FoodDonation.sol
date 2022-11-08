pragma solidity ^0.8.16;
pragma experimental ABIEncoderV2;

contract FoodDonation{
    
    struct User{
        string name;
        string email;
        uint phoneno;
    }

    struct Ngo{
        string name;
        string email;
        uint phoneno;
        string ngoAddress;
        string uniqueId;
    }

    struct NgoDrives{
        string driveName;
        string ngoId;
        string fridgeType;
        string driveAddress;
    }

    struct PublicFridges{
        string ngoID;
        string totalSlots;
        string fridgeType;
        string fridgeAddress;
    }

    struct PublicFridgeDonation{
        string ngoId;
        string userId;
        string publicFridgesId;
        string status;
    }

    struct DriveFridgeDonation{
        string ngoId;
        string userId;
        string driveId;
    }

    mapping(uint => User) public user;
    mapping(uint => Ngo) public ngo;
    mapping(uint => NgoDrives) public ngoDrives;
    mapping(uint => PublicFridges) public publicFridges;
    mapping(uint => PublicFridgeDonation) public publicFridgeDonation;
    mapping(uint => DriveFridgeDonation) public driveFridgeDonation;

    uint ngonextId = 1001;
    uint usernextId = 1001;
    uint ngodriveId = 1001;
    uint publicFridgenextId = 1001;
    uint publicFridgeDoId = 1001;
    uint driveFridgeDoId = 1001;


    function addUser(
        string calldata name,
        string calldata email,
        uint phoneno
    ) external{
        user[usernextId] = User(name, email, phoneno);
        usernextId++;
    }

    function addNgo(
        string calldata name,
        string calldata email,
        uint phoneno,
        string calldata ngoAddress,
        string calldata uniqueId
    ) external{
        ngo[ngonextId] = Ngo(name, email, phoneno, ngoAddress, uniqueId);
        ngonextId++;
        
    }


    function addNgoDrives(
        string calldata driveName,
        string calldata ngoId,
        string calldata fridgeType,
        string calldata driveAddress
    ) external{
        ngoDrives[ngodriveId] = NgoDrives(driveName, ngoId, fridgeType, driveAddress);
        ngodriveId++;   
    }

    function addPublicFridges(
        string calldata ngoID,
        string calldata totalSlots,
        string calldata fridgeType,
        string calldata fridgeAddress
    ) external{
        publicFridges[publicFridgenextId] =PublicFridges(ngoID, totalSlots, fridgeType, fridgeAddress);
        publicFridgenextId++;   
    }

    function addPublicFridgeDonations(
        string calldata ngoId,
        string calldata userId,
        string calldata publicFridgesId,
        string calldata status
    ) external{
        publicFridgeDonation[publicFridgeDoId] =  PublicFridgeDonation(ngoId, userId, publicFridgesId, status);
        publicFridgeDoId++;   
    }

        function addDriveFridgeDonation(
        string calldata ngoId,
        string calldata userId,
        string calldata driveId
    ) external{
        driveFridgeDonation[ driveFridgeDoId] =  DriveFridgeDonation(ngoId, userId, driveId);
         driveFridgeDoId++;   
    }

}