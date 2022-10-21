const router = require("express").Router();
let userController = require("../controller/client");

router.post("/addClient", userController.addClient);
router.get("/getClients", userController.getClients);
router.put("/deleteClient", userController.deleteClient);
router.put("/updateClient", userController.updateClient);
router.get("/getClient/:owner", userController.getClient);

module.exports = router;