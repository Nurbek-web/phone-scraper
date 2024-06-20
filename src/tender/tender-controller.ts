import TenderService from './tender-service';
import { Request, Response } from 'express';

class TenderController {
  private tenderService: TenderService;

  constructor(tenderService: TenderService) {
    this.tenderService = tenderService;
  }

  getTenders = async (req: Request, res: Response) => {
    try {
      const laptops = await this.tenderService.retrieveTenders();
      res.status(200).json(laptops);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };
}

export default TenderController;
