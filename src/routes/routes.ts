import express from 'express';
import {
    getCarValue,
    getRiskRating,
    getInsuranceQuote,
    getInsuranceRepute,
    getMultipleInsuranceReputes,
} from '../services/services';

const router = express.Router();

router.post('/', (_, res) => res.send('Router is up bb!'));
router.post('/get-car-value', (req, res) => res.send(getCarValue(req.body)));
router.post('/get-risk-rating', (req, res) => res.send(getRiskRating(req.body)));
router.post('/get-insurance-quote', (req, res) => res.send(getInsuranceQuote(req.body)));
router.post('/get-insurance-repute', (req, res) => res.send(getInsuranceRepute(req.body)));

router.post('/get-multiple-insurance-reputes', (req, res) => res.send(getMultipleInsuranceReputes(req.body)));

module.exports = router;
