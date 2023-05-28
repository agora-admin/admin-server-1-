const Web3 = require('web3');
const DiscourseAbi = require('./abi/DiscourseHub.json');

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.BSC_ENDPOINT));
let discourseHub = new web3.eth.Contract(DiscourseAbi, process.env.DISCOURSE_CONTRACT_ADDRESS_BSC);
let account = web3.eth.accounts.privateKeyToAccount(process.env.ADMIN_PRIVATE_KEY_MAINNET);
web3.eth.accounts.wallet.add(account);

const isDisputed = (id) => {
    return new Promise((resolve, reject) => {
        discourseHub.methods.isDisputed(id).call()
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })
}

const getBalance = () => {
    return new Promise((resolve, reject) => {
        web3.eth.getBalance(process.env.ADMIN_WALLET_MAINNET).then(balance => {
            resolve(balance);
        })
            .catch(err => {
                reject(err);
            })
    })
}

const setSchedule = async (body) => {
    return new Promise(async (resolve, reject) => {
        discourseHub.methods.scheduleDiscourse(+body.id, +body.timestamp).send({
            from: account.address,
            gasLimit: 1000000,
            gasPrice: await web3.eth.getGasPrice()
        })
            .then(result => {
                console.log("[Binance Smart Chain]","Discourse scheduled at ", body.timestamp, " for proposal ", body.id);
                console.log(result);
                resolve(result);
            })
            .catch(err => {
                console.log("[Binance Smart Chain]","Error Scheduling Discourse for", body.id, "at", body.timestamp);
                console.log(err);
                reject(err);
            })
    })
}

const setSpeaker = async (body) => {
    return new Promise(async (resolve, reject) => {
        // const gas = 0;
        // web3.eth.getGasPrice().then((gas) => {
        //     gas = gas;
        // }).catch(err => {
        //     reject(err);
        // });
        discourseHub.methods.setSpeakerAddress(+body.id, body.handle, body.address).send({
            from: account.address,
            gasLimit: 1000000,
            gasPrice: await web3.eth.getGasPrice()
        })
            .then(result => {
                console.log("[Binance Smart Chain]","Speaker set for ", body.id, "add:", body.address);
                console.log(result);
                resolve(result);
            })
            .catch(err => {
                console.log("[Binance Smart Chain]","Error setting speaker for", body.id, "add:", body.address);
                console.log(err);
                reject(err);
            })
    })
}

const getApprovedSpeakerAddresses = (id) => {
    return new Promise((resolve, reject) => {
        discourseHub.methods.getApprovedSpeakerAddresses(id).call().then(result => {
            resolve(result);
        }).catch(err => {
            reject(err);
        })
    })
}

const terminateProposal = async (id) => {
    return new Promise(async (resolve, reject) => {
        discourseHub.methods.terminateProposal(id).send({
            from: account.address,
            gasLimit: 1000000,
            gasPrice: await web3.eth.getGasPrice()
        })
            .then(result => {
                console.log("[Binance Smart Chain]","Proposal terminated ", id);
                console.log(result);
                resolve(result);
            })
            .catch(err => {
                console.log("[Binance Smart Chain]","Error terminating proposal", id);
                console.log(err);
                reject(err);
            })
    })
}


const getTotalProposals = () => {
    return new Promise((resolve, reject) => {
        discourseHub.methods.getTotalProposals().call()
            .then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
            })
    })
}

const isAdmin = () => {
    return new Promise((resolve, reject) => {
        discourseHub.methods.isAdmin(account.address).call().then(isAdmin => {
            resolve(isAdmin);
        }).catch(err => {
            reject(err);
        })
    })
}

const getBlock = () => {
    return new Promise((resolve, reject) => {
        web3.eth.getBlockNumber().then(block => {
            resolve(block);
        })
            .catch(err => {
                reject(err);
            })
    })
}


module.exports = {
    isDisputed,
    getBalance,
    setSchedule,
    setSpeaker,
    terminateProposal,
    getTotalProposals,
    getApprovedSpeakerAddresses,
    isAdmin,
    getBlock
}