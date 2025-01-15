# Instant Reveal for OpenSea Drops

This guide shows you how to implement **Instant Reveal** for NFTs on OpenSea drops. With this setup, the metadata for your NFTs is publicly accessible, but the actual details (e.g., artwork, description) remain hidden until the token is minted. The metadata is swapped as soon as the token is minted.

---

## How It Works

1. **Placeholder Metadata**: 
   - Initially, your NFTs will show placeholder metadata (like a generic image or description) while they are unminted.
   
2. **Instant Reveal**: 
   - Once a token is minted, the server will swap the placeholder metadata for the actual metadata.
   - This metadata is retrieved via a CID mapping (a list that maps `Token ID: CID`).

3. **CID Mapping**: 
   - You will need to provide a list of CID mappings. Each CID corresponds to the actual metadata of a specific token. You can upload metadata files individually to IPFS to avoid predictable BaseURI/TokenID formats, ensuring that each token's CID is randomized and not accessible by URL manipulation.

---

## Steps for Setup

### 1. **Upload Metadata to IPFS**

- Upload **each file individually** to IPFS, rather than using a simple `BaseURI/TokenID` format. This ensures the CIDs for each token are randomized and prevents URL manipulation.
  
### 2. **Deploy Smart Contract**
- Deploy your smart contract to the desired network (e.g., Sepolia Testnet, Ethereum Mainnet).
- Make sure to update the contract with the appropriate BaseURI for the metadata (referencing the deployed server URL).

### 3. **Deploy the Server**

- Deploy the server to your hosting platform of choice (e.g., **Heroku**).
  
    Example:
    - If you're using Heroku, deploy the app and note the URL, e.g., `https://your-heroku-app-name.herokuapp.com/metadata/`.
  
- Pass the server's URL to your smart contract's `BaseURI`. This ensures OpenSea can access the metadata through this server.

### 4. **Update BaseURI in Smart Contract**

- Once the server is deployed, update the `BaseURI` in your smart contract with the URL of your deployed server. You can use Etherscan to interact with the contract and set the BaseURI.
  
    Example BaseURI: 
    ```
    https://your-heroku-app-name.herokuapp.com/metadata/
    ```

---

## Important Notes

- **Testnet/Network**: This implementation currently works on the **Sepolia testnet**. If you are deploying to the mainnet, make sure to update the network settings and the BaseURI accordingly.
  
- **Metadata Availability**: The metadata for unminted tokens will be hidden until the token is minted. Once minted, the metadata is revealed instantly.

---

## Working Example

For a working example, check out the following OpenSea collection on the Sepolia testnet:

- [Worx Collection on OpenSea Testnets](https://testnets.opensea.io/collection/worx)

---

## Metadata Examples

### Minted Metadata:

Example of minted token metadata accessible via IPFS:

- [Minted Token Metadata](https://ipfs.io/ipfs/QmZ8RAR5u3YU1atUKroaVanpZ34cgmtp8cS6fkRXAQAwfQ)

### Not Minted Metadata:

Example of placeholder metadata for an unminted token (before reveal):

- [Not Minted Token Metadata](https://rxtest1-0cd9d1d983c2.herokuapp.com/metadata/23)

---

## Troubleshooting

- **Metadata Not Updating**: Ensure the server is correctly fetching the CID for minted tokens. If the metadata is not being updated, check the CID mapping and make sure the server is deployed and accessible.
  
- **Check Contract BaseURI**: Ensure that your smart contract's BaseURI is correctly set to your server's URL.

---

This setup allows you to create an **Instant Reveal** experience for your NFT drop on OpenSea, providing a smooth and secure way for tokens to reveal their metadata only after they are minted.
