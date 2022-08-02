require("@nomiclabs/hardhat-waffle");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks:{
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/Mms5JBh6CuGHR5ei0EDwNYAJo1xXgPMW',
      accounts: ['cc8af823f83b703202ad6bd0a4b232180e49afdad7e32f7ec302ed25032f082a'],
    },
  }

};
