const FoodDonation = artifacts.require("FoodDonation");

module.exports = function(deployer) {
  deployer.deploy(FoodDonation);
};
