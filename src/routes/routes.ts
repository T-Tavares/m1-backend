import express from 'express';
import {getCarValue, getRiskRating, getInsuranceQuote, getInsuranceRepute} from '../services/services';

const router = express.Router();

router.get('/', (_, res) => res.send('Router is up b!'));
router.get('/get-car-value', (req, res) => res.send(getCarValue(req.body)));
router.get('/get-risk-rating', (req, res) => res.send(getRiskRating(req.body)));
router.get('/get-insurance-quote', (req, res) => res.send(getInsuranceQuote(req.body)));
router.get('/generate-insurance-quote', (req, res) => res.send(getInsuranceRepute(req.body)));

module.exports = router;
