const express = require('express');
const bodyParser = require('body-parser');
const { ethers } = require('ethers');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const provider = new ethers.providers.InfuraProvider('homestead', process.env.INFURA_PROJECT_ID);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = 'YOUR_CONTRACT_ADDRESS';  // Replace with your deployed contract address
const abi = [
    "function transferTokens(address to, uint256 amount) external",
    "function balanceOf(address account) external view returns (uint256)"
];
const contract = new ethers.Contract(contractAddress, abi, wallet);

app.post('/transfer', async (req, res) => {
    const { to, amount } = req.body;
    
    try {
        const tx = await contract.transferTokens(to, ethers.utils.parseUnits(amount.toString(), 18));
        await tx.wait();
        res.status(200).json({ success: true, transactionHash: tx.hash });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
