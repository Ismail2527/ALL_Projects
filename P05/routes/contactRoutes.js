const express = require("express");
const router = express.Router();
const {
  getContact,
  createContact,
  deleteContact,
  UpdateContact,
  getContactid,
} = require("../controllers/contactController");
const validateToken = require("../midlleware/ValidateTokenHandler");

router.use(validateToken);
router.route("/").get(getContact).post(createContact);
router.route("/:id").get(getContactid).put(UpdateContact).delete(deleteContact);

module.exports = router;
