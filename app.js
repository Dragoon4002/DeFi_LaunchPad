const web3 = new Web3(Web3.givenProvider);
let account;

const tokenContract = new web3.eth.Contract(TokenABI, TokenAddress);
const launchpadContract = new web3.eth.Contract(LaunchpadABI, LaunchpadAddress);
const liquidityMiningContract = new web3.eth.Contract(LiquidityMiningABI, LiquidityMiningAddress);
const communityGovernanceContract = new web3.eth.Contract(CommunityGovernanceABI, CommunityGovernanceAddress);

// Connect to MetaMask
async function connect() {
    const accounts = await web3.eth.requestAccounts();
    account = accounts[0];
}

connect();

// Purchase Tokens
document.getElementById("purchaseButton").addEventListener("click", async () => {
    const amount = document.getElementById("tokenAmount").value;
    const value = web3.utils.toWei((amount * pricePerToken).toString(), "ether");

    await launchpadContract.methods.purchaseTokens(amount).send({ from: account, value });
    alert("Tokens Purchased Successfully!");
});

// Check Token Balance
document.getElementById("balanceButton").addEventListener("click", async () => {
    const balance = await tokenContract.methods.balanceOf(account).call();
    alert(`Your balance is: ${balance} PTK`);
});

// Stake Tokens
document.getElementById("stakeButton").addEventListener("click", async () => {
    const amount = document.getElementById("stakeAmount").value;
    await liquidityMiningContract.methods.stakeTokens(amount).send({ from: account });
    alert("Tokens Staked Successfully!");
});

// Unstake Tokens
document.getElementById("unstakeButton").addEventListener("click", async () => {
    const amount = document.getElementById("stakeAmount").value;
    await liquidityMiningContract.methods.unstakeTokens(amount).send({ from: account });
    alert("Tokens Unstaked Successfully!");
});

// Claim Rewards
document.getElementById("claimRewardsButton").addEventListener("click", async () => {
    await liquidityMiningContract.methods.claimRewards().send({ from: account });
    alert("Rewards Claimed Successfully!");
});

// Create Proposal
document.getElementById("createProposalButton").addEventListener("click", async () => {
    const description = document.getElementById("proposalDescription").value;
    await communityGovernanceContract.methods.createProposal(description).send({ from: account });
    alert("Proposal Created Successfully!");
});

// Vote on Proposal
document.getElementById("voteButton").addEventListener("click", async () => {
    const proposalId = document.getElementById("proposalId").value;
    await communityGovernanceContract.methods.voteOnProposal(proposalId).send({ from: account });
    alert("Voted Successfully!");
});
