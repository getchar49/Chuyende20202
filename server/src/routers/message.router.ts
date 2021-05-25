import * as express from "express";

import { messageController } from "../controllers";
import { authenticationPolicy } from "../middlewares";

const router: express.Router = express.Router();
/* messages routes */
router.get("/", authenticationPolicy, messageController.getAllMessage);
router.get("/:channelId", authenticationPolicy, messageController.getMessage);

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> 2de3b0a9c7350c9d2bef89a18d0b8eeb9f6c0392
