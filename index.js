const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.json());

const port = 3001;
const T = require('./twit');
const { checkAuth } = require('./token');
const aurora = require('./aurora');
const mumbai = require('./polygon');
const polygon = require('./polygonMainnet');
const godwoken = require('./godwoken');
const bsc = require('./binanceSmartChain');
const Web3 = require('web3');
require('dotenv').config();

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ALCHEMY_ENDPOINT_MUMBAI));

app.use(function(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    checkAuth(req, res, next);
})

app.get('/ping', async (req, res) => {
    try {
        let p_b = await polygon.getBlock();
        let m_b = await mumbai.getBlock();
        let a_b = await aurora.getBlock();
        let b_b = await bsc.getBlock();
        let p_c = await polygon.getTotalProposals();
        let m_c = await mumbai.getTotalProposals();
        let a_c = await aurora.getTotalProposals();
        let b_c = await bsc.getTotalProposals();

        res.status(200).send({
            polygon_block: p_b,
            mumbai_block: m_b,
            aurora_block: a_b,
            bsc_block: b_b,
            polygon_count: p_c,
            mumbai_count: m_c,
            aurora_count: a_c,
            bsc_count: b_c
        });
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
})

// listenEvents();

// app.get('/wallet', (req, res) => {
//     let account = web3.eth.accounts.create(web3.utils.randomHex(32));
//     let wallet = web3.eth.accounts.wallet.add(account);
//     res.send({
//         address: account.address,
//         privateKey: account.privateKey
//     });
// })

app.get('/hot', async (req, res) => {
    // discourseHub.methods.getTotalProposals().call().then(totalProposals => {
    //     res.send({
    //         totalProposals: totalProposals
    //     })
    // });

    try {
        let bal = await mumbai.getTotalProposals();
        let bal4 = await polygon.getTotalProposals();
        let bal2 = await aurora.getTotalProposals();
        let bal3 = await rinkeby.getTotalProposals();
        let bal5 = await bsc.getTotalProposals();
        
        res.status(200).send({
            pCount_p: bal4,
            pCount_m: bal,
            pCount_a: bal2,
            pCount_r: bal3,
            pCount_b: bal5
        })
    } catch (err) {
        res.status(500).send(err);
    }

    // aurora.getTotalProposals().then(totalProposals => {
    //     res.send({
    //         totalProposals: totalProposals
    //     })
    // }).catch(err => {
    //     res.send(err);
    // })

//     const addresses = await discourseHub.methods.getApprovedSpeakerAddresses(1).call();
//     // const a = await discourseHub.methods.getSpeakerConfirmations(1).call().catch(err => {
//     //     console.log(err);
//     //     res.status(500).send(err);
//     // })

//     res.send({
//         addresses: addresses
//     });
})

app.get('/block', async (req, res) => {
    try {
        let p_b = await polygon.getBlock();
        let m_b = await mumbai.getBlock();
        let a_b = await aurora.getBlock();
        let b_b = await bsc.getBlock();
        res.status(200).send({
            polygon_block: p_b,
            mumbai_block: m_b,
            aurora_block: a_b,
            bsc_block: b_b
        });
    } catch (err) {
        res.status(500).send(err);
    }
})

app.get('/isAdmin', async (req, res) => {

    try {

        let p = await polygon.isAdmin();
        let m = await mumbai.isAdmin();
        let a = await aurora.isAdmin();
        let b = await bsc.isAdmin();
        
        res.send({
            pAdmin: p,
            mAdmin: m,
            aAdmin: a,
            bAdmin: b
        })
    } catch (err) {
        res.status(500).send(err);
    }
})

// app.get('/discourses', (req, res) => {
//     discourseHub.methods.getTotalProposals().call().then(discourses => {
//         res.send(discourses);
//     });
// })

// app.get('/discourse', (req, res) => {
//     discourseHub.methods.getProposal(req.query.id).call().then(discourses => {
//         res.send(discourses);
//     });
// })

app.get('/balance', async (req, res) => {
    try {
        let a_bal = await aurora.getBalance();
        let m_bal = await mumbai.getBalance();
        let p_bal = await polygon.getBalance();
        let b_bal = await bsc.getBalance();
        res.send({
            aurora: a_bal,
            polygon: p_bal,
            mumbai: m_bal,
            binance: b_bal
        })
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
})

app.get('/test', (req, res) => {
    // res.send(req.body);
    mumbai.discourseHub.methods.getDiscourseDeadline(48)
    .call()
    // .send({
    //     from: account.address,
    //     value: web3.utils.toWei(req.body.amount, 'ether'),
    //     gasLimit: 300000
    // })
    .then(receipt => {
        res.send(receipt);
    }).catch(err => {
        res.status(500).send(err);
    })
    
})

// ----------- isDisputed ----------------------

app.get('/71401/isDisputed/:id', (req, res) => {
    let id = req.params.id;
    godwoken.isDisputed(id)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.send(err);
        })
})

app.get('/137/isDisputed/:id', (req, res) => {
    let id = req.params.id;
    polygon.isDisputed(id)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.send(err);
        })
})

app.get('/4/isDisputed/:id', (req, res) => {
    let id = req.params.id;
    rinkeby.isDisputed(id)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.send(err);
        })
})
app.get('/80001/isDisputed/:id', (req, res) => {
    let id = req.params.id;
    mumbai.isDisputed(id)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.send(err);
        })
})

app.get('/1313161555/isDisputed/:id', (req, res) => {
    let id = req.params.id;
    aurora.isDisputed(id)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.send(err);
        })
})

app.get('/56/isDisputed/:id', (req, res) => {
    let id = req.params.id;
    bsc.isDisputed(id)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            res.send(err);
        })
})

// --------------- setSpeaker -----------------------

app.post('/71401/setSpeaker', async (req, res) => {
    try {
        let tx = await godwoken.setSpeaker(req.body);
        let adds = await godwoken.getApprovedSpeakerAddresses(+req.body.id);
        res.status(200).send({
            tx: tx,
            addresses: adds
        })
        console.log({
            tx: tx,
            addresses: adds
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: err.message
        });
    }
})

app.post('/137/setSpeaker', async (req, res) => {
    try {
        let tx = await polygon.setSpeaker(req.body);
        let adds = await polygon.getApprovedSpeakerAddresses(+req.body.id);
        res.status(200).send({
            tx: tx,
            addresses: adds
        })
        console.log({
            tx: tx,
            addresses: adds
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: err.message
        });
    }
})
app.post('/4/setSpeaker', async (req, res) => {
    try {
        let tx = await rinkeby.setSpeaker(req.body);
        let adds = await rinkeby.getApprovedSpeakerAddresses(+req.body.id);
        res.status(200).send({
            tx: tx,
            addresses: adds
        })
        console.log({
            tx: tx,
            addresses: adds
        });
    } catch (err) {
        res.status(500).send({
            error: err.message
        });
        console.log(err);
    }
})
app.post('/80001/setSpeaker', async (req, res) => {
    try {
        let tx = await mumbai.setSpeaker(req.body);
        console.log("In /80001/setSpeaker function: ",{tx});
        let adds = await mumbai.getApprovedSpeakerAddresses(+req.body.id);
        console.log("In /80001/setSpeaker function: ",{adds});
        
        res.status(200).send({
            tx: tx,
            addresses: adds
        })
        console.log({
            tx: tx,
            addresses: adds
        });
    } catch (err) {
        res.status(500).send({
            error: err.message
        });
        console.log(err);
    }
})

app.post('/1313161555/setSpeaker', async (req, res) => {
    try {
        let tx = await aurora.setSpeaker(req.body);
        let adds = await aurora.getApprovedSpeakerAddresses(+req.body.id);
        res.status(200).send({
            tx: tx,
            addresses: adds
        })
        console.log({
            tx: tx,
            addresses: adds
        });
    } catch (err) {
        res.status(500).send({
            error: err.message
        });
        console.log(err);
    }
})

app.post('/56/setSpeaker', async (req, res) => {
    try {
        let tx = await bsc.setSpeaker(req.body);
        let adds = await bsc.getApprovedSpeakerAddresses(+req.body.id);
        res.status(200).send({
            tx: tx,
            addresses: adds
        })
        console.log({
            tx: tx,
            addresses: adds
        });
    } catch (err) {
        res.status(500).send({
            error: err.message
        });
        console.log(err);
    }
})

// ------------------ setSchedule -------------------------

app.post('/71401/setSchedule', async (req, res) => {
    try {
        let tx = await godwoken.setSchedule(req.body);
        let adds = await godwoken.getApprovedSpeakerAddresses(+req.body.id);
        res.status(200).send({
            tx: tx,
            addresses: adds
        })
        console.log({
            tx: tx,
            addresses: adds
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: err.message
        });
    }
})

app.post('/137/setSchedule', async (req, res) => {
    try {
        let tx = await polygon.setSchedule(req.body);
        let adds = await polygon.getApprovedSpeakerAddresses(+req.body.id);
        res.status(200).send({
            tx: tx,
            addresses: adds
        })
        console.log({
            tx: tx,
            addresses: adds
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            error: err.message
        });
    }
})
app.post('/4/setSchedule', async (req, res) => {
    try {
        let tx = await rinkeby.setSchedule(req.body);
        let adds = await rinkeby.getApprovedSpeakerAddresses(+req.body.id);
        res.status(200).send({
            tx: tx,
            addresses: adds
        })
        console.log({
            tx: tx,
            addresses: adds
        });
    } catch (err) {
        res.status(500).send({
            error: err.message
        });
        console.log(err);
    }
})
app.post('/80001/setSchedule', async (req, res) => {
    try {
        let tx = await mumbai.setSchedule(req.body);
        let adds = await mumbai.getApprovedSpeakerAddresses(+req.body.id);
        res.status(200).send({
            tx: tx,
            addresses: adds
        })
        console.log({
            tx: tx,
            addresses: adds
        });
    } catch (err) {
        res.status(500).send({
            error: err.message
        });
        console.log(err);
    }
})

app.post('/1313161555/setSchedule', async (req, res) => {
    try {
        let tx = await aurora.setSchedule(req.body);
        let adds = await aurora.getApprovedSpeakerAddresses(+req.body.id);
        res.status(200).send({
            tx: tx,
            addresses: adds
        })
        console.log({
            tx: tx,
            addresses: adds
        });
    } catch (err) {
        res.status(500).send({
            error: err.message
        });
        console.log(err);
    }
})

app.post('/56/setSchedule', async (req, res) => {
    try {
        let tx = await bsc.setSchedule(req.body);
        let adds = await bsc.getApprovedSpeakerAddresses(+req.body.id);
        res.status(200).send({
            tx: tx,
            addresses: adds
        })
        console.log({
            tx: tx,
            addresses: adds
        });
    } catch (err) {
        res.status(500).send({
            error: err.message
        });
        console.log(err);
    }
})

// ----------------- terminateProposal --------------------

app.post('/71401/terminateProposal', async (req, res) => {
    try {
        let tx = await godwoken.terminateProposal(req.body.id);
        res.status(200).send({
            tx: tx
        })
        console.log({
            tx: tx
        });
    } catch (err) {
        res.status(500).send({
            error: err.message
        });
        console.log(err);
    }})

app.post('/137/terminateProposal', async (req, res) => {
    try {
        let tx = await polygon.terminateProposal(req.body.id);
        res.status(200).send({
            tx: tx
        })
        console.log({
            tx: tx
        });
    } catch (err) {
        res.status(500).send({
            error: err.message
        });
        console.log(err);
    }
})
app.post('/4/terminateProposal', async (req, res) => {
    try {
        let tx = await rinkeby.terminateProposal(req.body.id);
        res.status(200).send({
            tx: tx
        })
        console.log({
            tx: tx
        });
    } catch (err) {
        res.status(500).send({
            error: err.message
        });
        console.log(err);
    }
})
app.post('/80001/terminateProposal', async (req, res) => {
    try {
        let tx = await mumbai.terminateProposal(req.body.id);
        res.status(200).send({
            tx: tx
        })
        console.log({
            tx: tx
        });
    } catch (err) {
        res.status(500).send({
            error: err.message
        });
        console.log(err);
    }
})

app.post('/1313161555/terminateProposal', async (req, res) => {
    try {
        let tx = await aurora.terminateProposal(req.body.id);
        res.status(200).send({
            tx: tx
        })
        console.log({
            tx: tx
        });
    } catch (err) {
        res.status(500).send({
            error: err.message
        });
        console.log(err);
    }
})

app.post('/56/terminateProposal', async (req, res) => {
    try {
        let tx = await bsc.terminateProposal(req.body.id);
        res.status(200).send({
            tx: tx
        })
        console.log({
            tx: tx
        });
    } catch (err) {
        res.status(500).send({
            error: err.message
        });
        console.log(err);
    }
})


app.post('/tweet', (req, res) => {
    try {
        T.post('statuses/update', {
            status: req.body.status
        }, function(err, data, response) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            res.send(data);
        })
    } catch (err) {
        res.status(500).send(err);
    }
})


// app.get('/sign', async (req, res) => {
//     let S = await mumbai.discourseHub.methods.changeMinimumInitialFunds(web3.utils.toWei('0.01', 'ether'),).send({
//         from: mumbai.account.address,
//         gasLimit: 1000000
//     })
//     res.send({
//         test: S
//     })
// })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})