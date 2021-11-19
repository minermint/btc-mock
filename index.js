const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

let paymentReceived = false;
let confirmations = 0;

app.post("/v1/payment-addresses", function (req, res) {
  const json = {
    "PK": "mfvGXUT863oBUReAeZAeCVWTrLwDmB4AQM",
    "GSI1PK": "db0a59a6-7ac6-4dec-9c07-3cb4eb9e8fc7",
    "user_id": "db0a59a6-7ac6-4dec-9c07-3cb4eb9e8fc7",
    "key_index": "1",
    "address": "mfvGXUT863oBUReAeZAeCVWTrLwDmB4AQM",
    "used": false,
    "user_eth_address": req.body.eth_address,
    "GSI1SK": "mfvGXUT863oBUReAeZAeCVWTrLwDmB4AQM"
  };

  setTimeout(function(){ paymentReceived = true }, 60000);

  res.send(JSON.stringify(json));
});

app.get("/v1/members/:memberId/invoices", function (req, res) {
  let json = [];

  if (paymentReceived) {
    json = [
    {
      "PK": "db0a59a6-7ac6-4dec-9c07-3cb4eb9e8fc7",
      "SK": "INV#fc2console.log(paymentReceived);15e69-39e7-5c1d-bb72-8a5929a3672a",
      "origin": "website",
      "quantity": "0",
      "btc_usd": "0",
      "action": "get",
      "currency": "btc",
      "gold_usd": "0",
      "btc_txid": "7ffaf3aabac73796aeb438baf747e3090023db96d0501307a752ca20b0a73fad",
      "miner_usd": "0",
      "status": "pending", // pending, received, issued, cleared, failed
      "timestamp": "1626738330324",
      "btc_vout": "0",
      "GSI2SK": "1626738330324#fc215e69-39e7-5c1d-bb72-8a5929a3672a",
      "expire": "0",
      "GSI2PK": "get#pending",
      "pay_to_address": "mfvGXUT863oBUReAeZAeCVWTrLwDmB4AQM",
      "btc_key_index": "0",
      "user_id": "db0a59a6-7ac6-4dec-9c07-3cb4eb9e8fc7",
      "invoice_id": "fc215e69-39e7-5c1d-bb72-8a5929a3672a",
      "amount": "0.0001",
      "issuance_txid": "",
      "user_eth_address": "0xb44c7cF23Cd4e9AC3CE4D44f4Ae5CA1eE05ed08B"
    }];

    if (confirmations > 0) {
        json[0]["btc_confirmations"] = confirmations;
    }

    if (confirmations > 4) {
        json[0]["status"] = "received";
    }

    setInterval(function(){ confirmations++ }, 60000);
  }

  res.send(JSON.stringify(json));
});

app.get("/v1/quote/btc_usd", function (req, res) {
  res.send(JSON.stringify(50000));
});

app.get("/v1/quote/miner_usd", function (req, res) {
  res.send(JSON.stringify(1.24));
});

app.listen(3000);
