import { Router } from 'express';
import { toggleUserRole } from '../controllers/user.controller.js';
import { checkRoles } from '../middleware/auth.js';
import { requestPasswordReset, resetPassword } from '../controllers/user.controller.js';

const router = Router();

router.put('/premium/:uid', checkRoles('admin'), toggleUserRole);
router.post('/reset-password', requestPasswordReset);
router.post('/reset-password/:token', resetPassword);

export default router;