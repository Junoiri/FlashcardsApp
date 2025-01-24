const authService = require('../services/authService');


exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const newUser = await authService.register({ username, email, password, role });
    return res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};
