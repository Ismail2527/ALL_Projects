const testUserController = (req, res) => {
  try {
    res.status(200).send("<h1>test User Data</h1>");
  } catch (error) {
    console.log("error In test API", error);
  }
};

module.exports = { testUserController };
