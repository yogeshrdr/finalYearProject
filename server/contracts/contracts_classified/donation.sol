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

    mapping(string => Donation) public donation;
    mapping(string => string[]) public userDonation;
    mapping(string => string[]) public ngoDonation;
    mapping(uint => string) public donationKey;
    uint totaldonation = 1;



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


}