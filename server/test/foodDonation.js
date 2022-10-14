const FoodDonation = artifacts.require('FoodDonation');

contract('FoodDonation', () => {
  it('should set the value of data variable in smart contract', async () => {
    const foodDonation = await FoodDonation.deployed();
    await foodDonation.addDonation('xyz', 'yyyy', 'sads', 'sadas', 'sadasd');
    const result = await foodDonation.getUserDonations('sads');
    console.log(result);
  });
});
