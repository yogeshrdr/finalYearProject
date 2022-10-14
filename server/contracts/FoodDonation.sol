pragma solidity ^0.8.16;
pragma experimental ABIEncoderV2;

contract FoodDonation{
    
    struct Donation{
        string donationId;
        string ngoID;
        string userID;
        string publicFridgesID;
        string donationType;
    }

    struct Ngo{
        string ngoId;
        string name;
        string email;
        uint phoneno;
        string ngoAddress;
    }

    struct PublicFridges{
        string PublicFridgesId;
        string NgoId;
        string publicFridgeAddress;
    }

    mapping(string => Ngo) public ngo;
    mapping(string => Donation) public donation;
    mapping(string => string[]) public userDonation;
    mapping(string => string[]) public ngoDonation;
    mapping(uint => string) public donationKey;
    uint totaldonation = 1;
    mapping(string => PublicFridges) publicFridges;
    mapping(uint => string) publicFridgesKey;
    mapping(string => string[]) public ngoFridge;
    uint totalFridge = 1;

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

    function addDonation(
        string calldata donationId,
        string calldata  ngoID,
        string calldata  userID,
        string calldata  publicFridgesID,
        string calldata  donationType
    ) external{
        donation[donationId] = Donation(donationId, ngoID, userID, publicFridgesID, donationType);
        donationKey[totaldonation] = donationId;
        userDonation[userID].push(donationId);
        ngoDonation[ngoID].push(donationId);
        totaldonation++;
    }

    function getDonation(string calldata x) view external returns(
        string memory donationId,
        string memory  ngoID,
        string memory  userID,
        string memory  publicFridgesID,
        string memory  donationType
    ){
            Donation memory temp = donation[x];
            return(temp.donationId, temp.ngoID, temp.userID, temp.publicFridgesID, temp.donationType);
    }

   function getDonations() external view returns (Donation[] memory){
      Donation[]  memory _donation = new Donation[](totaldonation-1);
      for (uint i=1;i<totaldonation-1;i++) {
          string memory x = donationKey[i];
          Donation storage member = donation[x];
          _donation[i] = member;
      }
      return _donation;
    }

    function getUserDonations(string calldata userId) external view returns(Donation[] memory){
        string[] memory userDonationId = userDonation[userId];
        Donation[]  memory _donation = new Donation[](userDonationId.length);
        for (uint i=0;i<userDonationId.length;i++) {
            string memory x = userDonationId[i];
            Donation storage member = donation[x];
            _donation[i] = member;
        }
        return _donation;
    }

    function getNgoDonations(string calldata ngoId) external view returns(Donation[] memory){
        string[] memory ngoDonationId = ngoDonation[ngoId];
        Donation[]  memory _donation = new Donation[](ngoDonationId.length);
        for (uint i=0;i<ngoDonationId.length;i++) {
            string memory x = ngoDonationId[i];
            Donation storage member = donation[x];
            _donation[i] = member;
        }
        return _donation;
    }


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