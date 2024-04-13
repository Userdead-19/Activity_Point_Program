import { CreateIssueController, GetAllIssuesController, GetIssueByIdController, GetIssuesByLocationController, UpdateIssueController, UpdateStatusController, GetIssuesByPincodeController, GetIssuesByStatusController, GetIssuesByTypeController } from '../controllers/IssueController';
import { Router } from 'express';

const router = Router();

router.post('/create', CreateIssueController);

router.get('/all', GetAllIssuesController);

router.get('/location/:location', GetIssuesByLocationController);

router.get('/pincode/:pincode', GetIssuesByPincodeController);

router.get('/status/:status', GetIssuesByStatusController);

router.get('/type/:type', GetIssuesByTypeController);

router.get('/:id', GetIssueByIdController);

router.put('/:id', UpdateIssueController);

router.put('/:id/status', UpdateStatusController);

export default router;
