//Load required elements
const router = require('express').Router()
const express = require('express')

const {infoStatisticsController} = require('../controllers/statisticsController')

//Use json parser
router.use(express.json());

//Load tokenapp controller
const {verifTokenAppController} = require('../controllers/tokenAppController')

//Infos restaurant OK
router.get('/statistics/:restaurantId', async function(req, res){
    const tokenapp = req.headers['tokenapp'];
    checkTokenApp = await verifTokenAppController(tokenapp)
    if (checkTokenApp == null) return res.status(200).send("La requête ne peux venir que de la gateway")

    infoStatisticsController(req, res)
});


module.exports = router;