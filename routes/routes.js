//Load required elements
const router = require('express').Router()
const express = require('express')

const {infoStatisticsController, infoComponentsStatisticsController} = require('../controllers/statisticsController')

//Use json parser
router.use(express.json());

//Load tokenapp controller
const {verifTokenAppController} = require('../controllers/tokenAppController')

router.get('/available', function(req, res) {
    console.log('ask for availableity')
    res.send(true)
  });

//Infos restaurant OK
router.get('/restaurant/:restaurantId', async function(req, res){
    const tokenapp = req.headers['tokenapp'];
    checkTokenApp = await verifTokenAppController(tokenapp)
    if (checkTokenApp == null) return res.status(200).send("La requête ne peux venir que de la gateway")

    infoStatisticsController(req, res)
});

//Infos restaurant OK
router.get('/components/stats', async function(req, res){
    console.log('/components/stats')
    const tokenapp = req.headers['tokenapp'];
    checkTokenApp = await verifTokenAppController(tokenapp)
    if (checkTokenApp == null) return res.status(200).send("La requête ne peux venir que de la gateway")
    infoComponentsStatisticsController(req, res)
});


module.exports = router;