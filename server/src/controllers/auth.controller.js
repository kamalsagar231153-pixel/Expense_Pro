import { registerService, loginService } from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await registerService(email, password);

    res.status(201).json({
      success: true,
      data: user
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Debug log MUST be inside function
    console.log("Login attempt:", email);

    const tokens = await loginService(email, password);

    res.status(200).json({
      success: true,
      data: tokens
    });

  } catch (error) {
    res.status(401).json({
      message: error.message
    });
  }
};