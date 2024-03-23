const express = require('express');
const Brand = require('../models/Brand');
const Watch = require('../models/Watch');

const router = express.Router()


router.get('/watches/:modelName', async (req, res) => {
    try {
        const data = await Watch.find({ "Model": req.params.modelName }).populate("Brand_Id")
        if (data.length !== 0) {
            res.json(data)
        } else {
            res.status(404).json({ message: 'Ebből a modellből nincsenek órák az adatbázisban.' })
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/brands', async (req, res) => {
    try {
        const data = await Brand.find()
        if (data.length !== 0) {
            res.json(data)
        } else {
            res.status(404).json({ message: 'Nincsenek márkák az adatbázisban.' })
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/watches', async (req, res) => {
    try {
        let query = Watch.find().populate('Brand_Id', '-_id');
        if (req.query.select) {
            const fields = req.query.select.split(',').join(' ')
            query = query.select(fields)
        }
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ')
            query = query.sort(sortBy)
        }

        const watches = await query

        res.json(watches)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


module.exports = router;