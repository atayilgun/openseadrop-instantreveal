require('dotenv').config();

module.exports = {
    RPC_URL: `https://sepolia.infura.io/v3/${process.env.RPC_URL}`, // Using the INFURA_PROJECT_ID from .env
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS, // Using the contract address from .env
    PORT: process.env.PORT || 3000, // Using the PORT from .env (defaulting to 3000 if not set)
};
