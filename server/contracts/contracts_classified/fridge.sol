pragma solidity ^0.8.16;
pragma experimental ABIEncoderV2;

contract FridgeContract{

    struct PublicFridges{
        string PublicFridgesId;
        string NgoId;
        string publicFridgeAddress;
    }


    mapping(string => PublicFridges) publicFridges;
    mapping(uint => string) publicFridgesKey;
    mapping(string => string[]) public ngoFridge;
    uint totalFridge = 1;


    function addFridge(
        string calldata PublicFridgesId, 
        string calldata NgoId, 
        string calldata publicFridgeAddress
    ) external {
        publicFridges[PublicFridgesId] = PublicFridges(PublicFridgesId, NgoId, publicFridgeAddress);
        publicFridgesKey[totalFridge] = PublicFridgesId;
        ngoFridge[NgoId].push(PublicFridgesId);
        totalFridge++;
    } 


    function getAllFridge() external view returns (PublicFridges[] memory){
      PublicFridges[]  memory _fridge = new PublicFridges[](totalFridge-1);
      for (uint i=1;i<totalFridge-1;i++) {
          string memory x = publicFridgesKey[i];
          PublicFridges storage member = publicFridges[x];
          _fridge[i] = member;
      }
      return _fridge;
    }

     function getNgoFridge(string calldata NgoId) external view returns (PublicFridges[] memory){
         string[] memory _fridgeId = ngoFridge[NgoId];
        PublicFridges[]  memory _fridge = new PublicFridges[](_fridgeId.length-1);
        for (uint i=1;i<_fridgeId.length-1;i++) {
            string memory x = _fridgeId[i];
            PublicFridges storage member = publicFridges[x];
            _fridge[i] = member;
        }
        return _fridge;
    }

}