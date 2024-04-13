import { GetAdminByUsernameController, GetAdminController, CreateAdminController, UpdateAdminController, LoginAdminController, GetAdminAreaIssuesController } from "../controllers/AdminController"

import { Router } from "express"

const AdminRouter: Router = Router()

AdminRouter.post('/create', CreateAdminController)

AdminRouter.get('/:id', GetAdminController)

AdminRouter.get('/username/:username', GetAdminByUsernameController)

AdminRouter.put('/:id', UpdateAdminController)

AdminRouter.post('/login', LoginAdminController)

AdminRouter.get('/issues/:id', GetAdminAreaIssuesController)


export default AdminRouter