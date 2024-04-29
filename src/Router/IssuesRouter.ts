import { CreateIssueController, GetAllIssuesController, GetIssueByIdController, GetIssuesByLocationController, UpdateIssueController, UpdateStatusController, GetIssuesByPincodeController, GetIssuesByStatusController, GetIssuesByTypeController } from '../controllers/IssueController';
import { Router } from 'express';
import { checkToken } from '../controllers/AuthController';


const router = Router();

router.post('/create', checkToken, CreateIssueController);

router.get('/all', checkToken, GetAllIssuesController);

router.get('/location/:location', checkToken, GetIssuesByLocationController);

router.get('/pincode/:pincode', checkToken, GetIssuesByPincodeController);

router.get('/status/:status', checkToken, GetIssuesByStatusController);

router.get('/type/:type', checkToken, GetIssuesByTypeController);

router.get('/:id', checkToken, GetIssueByIdController);

router.put('/:id', checkToken, UpdateIssueController);

router.put('/:id/status', checkToken, UpdateStatusController);

export default router;
