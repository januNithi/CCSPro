/**
 * Created by CSS on 29-06-2016.
 */

var express = require('express');

var PayU = require('payu');

// var crypto = require('crypto');
// var randomString = require('random-string');

var request = require('request');
   var crypto=require('crypto');



var router = express.Router();

var merchant_id = 'gtKFFx';

var salt = 'eCwWELxi';

router.get('/sendCard', function(req, res) {


    var hash = crypto.createHash('sha512');
    //marchentKey +'|' +txnid+ '|' +amount+'|'+productinfo+'|'+firstname+'|'+email+'|'+phone+'|'+ surl +'|'+furl+'|'+service_provider+'|||||||'+salt;
    var str='gtKFFx|12345|50|test|Janani|abc@gmail.com|23432454|http://localhost:3000/paymentResult|http://localhost:3000/notifyME|payu_paisa|||||||eCwWELxi';

    hash.update(str);
    console.log(hash);
    var value = hash.digest('hex');

    console.log(value);

    var params = {
        url: 'https://test.payu.in/_payment',

        form: {
            key: 'gtKFFx',
            txnid: 12345,
            amount: 50,
            productinfo: 'test',
            firstname: 'Janani',
            email: 'abc@gmail.com',
            phone: '23432454',
            surl: 'http://localhost:3000/paymentResult',
            furl: 'http://localhost:3000/notifyME',
            hash: value,
            udf1: 'payu_paisa',

        }
    };

    // key, txnid, amount, productinfo, firstname, email, phone, surl, furl, hash

    var url = 'https://test.payu.in/_payment?key='+params.form.key+'&txnid='+params.form.txnid;
    url += '&amount='+params.form.amount+'&productinfo='+params.form.productinfo+'&firstname=';
    url += params.form.firstname+'&email='+params.form.email+'&phone='+params.form.phone;
    url += '&surl='+params.form.surl+'&furl='+params.form.furl+'&hash='+params.form.hash;
    url += '&salt='+salt+'&udf1='+params.form.udf1;

    console.log('Url--->'+url);

    // request({
    //     url:url,
    //     method:"POST",
    //     json:true
    // }, function(err,response,body){
    //     if(err)
    //         res.send(err);
    //     res.send(body);
    // });


    var payu = new PayU(merchant_id, salt, url);
    //
    var txn_id = '12345';
    // payu.getIssuingBankStatus(1234,function(err,response){
    //     if(err){
    //         res.send(err);
    //     }
    //     res.send(response);
    // });
    payu.verify_payment(txn_id,function(err, response) {
        console.error(err);
        res.send(response);
    });
    // var str='taO2Gy|idr001|50|test|anonymous|anonymous@gmail.com|||||||||||CMpSRcXk';
    // var hash = crypto.createHash('sha512');
    // hash.update(str);
    // var value = hash.digest('hex');
    //
    // console.log(value);
    //
    // var params={
    //     'key':'taO2Gy',
    //     'txnid':'idr001',
    //     'amount':'50',
    //     'productinfo':'test',
    //     'firstname':'anonymous',
    //     'email':'anonymous@gmail.com',
    //     'phone':'9999999999',
    //     'surl':'http://localhost:8080/',
    //     'furl': 'http://localhost:8080/',
    //     'curl': 'http://localhost:8080/',
    //     'hash':value,
    //     'service_provider':'payu_paisa',
    //     'salt':'CMpSRcXk'
    // };
    //
    // var url = 'https://test.payu.in/_payment?key='+params.key+'&txnid='+params.txnid;
    // url += '&amount='+params.amount+'&productinfo='+params.productinfo+'&firstname=';
    // url += params.firstname+'&email='+params.email+'&phone='+params.phone;
    // url += '&surl='+params.surl+'&furl='+params.furl+'&hash='+params.hash+'&merchantkey='+params.key+'&salt='+params.salt;
    // request({
    //     url:url,
    //     method:"POST",
    //     json:true
    // }, function(err,response,body){
    //     if(err)
    //         console.log('Error : ' + err);
    //     res.send(body);
    // });

});


router.post('/notifyME',function (req,res) {

    console.log(req);

});

router.post('/paymentResult', function response(req, res) {
    console.log(req);


});

module.exports = router;