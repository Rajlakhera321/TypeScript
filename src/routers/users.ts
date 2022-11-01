import express, {Request, Response} from 'express';
import { addDetail, deleteDetail, homeDetail, updateDetail } from './../controllers/users';
const router = express.Router();

router.get('/add', addDetail);

router.get('/', homeDetail)

router.get('/delete', deleteDetail)

router.get('/update', updateDetail)

export {
    router
}