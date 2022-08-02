
const main=async()=>{

  const Twitter = await ethers.getContractFactory('TwitterContract');
  const ContractInstance=await Twitter.deploy();

  console.log("Transactions address: ", ContractInstance.address);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().then(()=>{
  process.exit(0);
}).catch(()=>{
  console.log(err);

  process.exit(1);
})
