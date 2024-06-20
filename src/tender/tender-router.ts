import { Router } from 'express';
import TenderService from './tender-service';
import TenderController from './tender-controller';

const tenderRouter = Router();

const tenderService = new TenderService();
const tenderController = new TenderController(tenderService);

tenderRouter.get("/tenders/", tenderController.getTenders);

export default tenderRouter;
