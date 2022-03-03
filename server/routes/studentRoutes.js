const express = require("express");
const router = express.Router();
const {
  getStudent,
  setStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

router.route("/").get(getStudent).post(setStudent);
router.route("/:id").delete(deleteStudent).put(updateStudent);

/*router.get("/", getStudent);
router.post("/", setStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);
*/

module.exports = router;
