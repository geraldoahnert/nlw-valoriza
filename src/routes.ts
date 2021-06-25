import { Router } from 'express';
import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagController } from './controllers/CreateTagController';
import { ensureAdmin } from './middlewares/ensureAdmin';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { ensureAuthenticated } from './middlewares/ensureAuthenticated';
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController';
import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController';

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserService = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController =
    new ListUserSendComplimentsController();
const listUserReceiveComplimentsController =
    new ListUserReceiveComplimentsController();

router.post('/users', createUserController.handle);
router.post(
    '/tags',
    ensureAuthenticated,
    ensureAdmin,
    createTagController.handle
);
router.post('/login', authenticateUserService.handle);
router.post(
    '/compliment',
    ensureAuthenticated,
    createComplimentController.handle
);

router.get(
    '/users/compliments/send',
    ensureAuthenticated,
    listUserSendComplimentsController.handle
);
router.get(
    '/users/compliments/receive',
    ensureAuthenticated,
    listUserReceiveComplimentsController.handle
);

export { router };
