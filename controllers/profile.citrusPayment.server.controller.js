/**
 * Created by CSS on 15-07-2016.
 */
var crypto = require('crypto');
var randomString = require('random-string');
var express = require('express');
var request = require('request');
var router = express.Router();

//Need to replace the last part of URL("your-vanityUrlPart") with your Testing/Live URL
var formPostUrl = "https://sandbox.citruspay.com/sslperf/fd62d4zwkc";
//Need to change with your Secret Key
var secret_key = "834b754796a9e5bb1aed1deed9fbfcd86d94f957";
//Need to change with your Vanity URL Key from the citrus panel
var vanityUrl = "fd62d4zwkc";
//Should be unique for every transaction
var merchantTxnId = randomString({ length: 20 });
//Need to change with your Order Amount
var orderAmount = "1.00";
var currency = "INR";
var data = vanityUrl + orderAmount + merchantTxnId + currency;
//Need to change with your Return URL
var returnURL = "http://localhost:3000/auth/paymentResult";
//Need to change with your Notify URL
var notifyUrl = "http://localhost:3000/auth/notifyME";
// generate hmac
var hmac = crypto.createHmac('sha1', secret_key);
hmac.update(data);
var securitySignature = hmac.digest('hex');

// For Coupon signature
var alteredAmount = "0.50";
//Need to change with your Coupon Code
var couponCode = "couponCode";
data = "orderAmount=" + orderAmount ;
var hmac = crypto.createHmac('sha1', secret_key);
hmac.update(data);
var dpSignature = hmac.digest('hex');

var merchantAccessKey = '5NJRIGOZZR1EJ509HWGR';

router.get('/citrusPayment',function (req,res) {

    var url = formPostUrl+'?merchantTxnId='+merchantTxnId+'&orderAmount='+orderAmount+'&currency='+currency;
    url += '&secSignature='+securitySignature+'&dpSignature='+dpSignature+'&returnUrl='+returnURL+'&notifyUrl='+notifyUrl;
    url += '&merchantAccessKey='+merchantAccessKey;

    console.log(url);

    request({
        url:url,
        method:"POST",
        json:true
    }, function(err,response,body){
        if(err)
            res.send(err);
        res.send(body);
    });

});


module.exports = router;