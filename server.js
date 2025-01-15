const express = require('express');
const ethers = require('ethers');
const config = require('./config');
// Import fetch for Node.js versions < 18
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();

// Initialize the provider using Infura or Alchemy
const provider = new ethers.JsonRpcProvider(config.RPC_URL);

// ABI for the contract / FILL HEREEEEEEEEEEEEEEEE!
const abi = [
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function tokenURI(uint256 tokenId) public view returns (string)"
];

// Initialize the contract instance
const contract = new ethers.Contract(config.CONTRACT_ADDRESS, ABI, provider);

// CID mappings for each token FILL HEREEEEEEEEEEEEEEEE!
const tokenMetadataCID = {
    1: "QmHASH",
    2: "QmHASH2",
 ....//Add all the CIDS
};

// Placeholder metadata
const placeholderMetadata = {
    name: "Unminted NFT",
    description: "This token has not been minted yet, cheeeeekyyyyyyyyyyyyy",
    image: "PH IMAGE URL", //PH IMAGE URL 
    attributes: []
};

// Function to fetch metadata from IPFS
async function fetchIPFSMetadata(cid) {
    try {
        const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const metadata = await response.json();

        // If the image is using ipfs:// protocol, convert it to https://ipfs.io/ipfs/
        if (metadata.image && metadata.image.startsWith('ipfs://')) {
            metadata.image = metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/');
        }

        return metadata;
    } catch (error) {
        console.error('Error fetching IPFS metadata:', error);
        throw error;
    }
}

// Metadata endpoint
app.get('/metadata/:tokenId', async (req, res) => {
    const tokenId = parseInt(req.params.tokenId);
    console.log(`Metadata requested for token ${tokenId}`);

    try {
        // Check if token is minted by trying to get its owner
        const owner = await contract.ownerOf(tokenId);

        if (owner && owner !== ethers.ZeroAddress) {
            // Token is minted, get its metadata
            const cid = tokenMetadataCID[tokenId];
            if (cid) {
                console.log(`Fetching IPFS metadata for minted token ${tokenId}`);
                try {
                    const metadata = await fetchIPFSMetadata(cid);
                    return res.json(metadata);
                } catch (ipfsError) {
                    console.error(`Error fetching IPFS metadata for token ${tokenId}:`, ipfsError);
                    return res.status(500).json({ error: 'Error fetching metadata from IPFS' });
                }
            }
        }
    } catch (error) {
        console.log(`Token ${tokenId} is not minted or error occurred:`, error.message);
    }

    // Return placeholder for unminted tokens or errors
    console.log(`Returning placeholder for token ${tokenId}`);
    return res.json(placeholderMetadata);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});