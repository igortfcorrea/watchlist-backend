import { generateToken } from "../../utils/generateToken.js";

export class AuthController {
    constructor(authService) {
      this.service = authService;
    };
  
    register = async (req, res, next) => {
        try {
            const { name, email } = req.body;
            const user = await this.service.register({ ...req.body });
    
            // Generate JWT Token
            const token = generateToken(user.id, res);
    
            res.status(201).json({
                status: "success",
                data: {
                    user: {
                        id: user.id,
                        name: name,
                        email: email
                    },
                    token: token
                }
            });
        } catch (err) {
            next(err);
        }
    };

    login = async (req, res, next) => {
        try {
            const { email } = req.body;
            const user = await this.service.login({ ...req.body });
    
            // Generate JWT Token
            const token = generateToken(user.id, res);
    
            res.status(201).json({
                status: "success",
                data: {
                    user: {
                        id: user.id,
                        email: email
                    },
                    token: token
                }
            });
        } catch (err) {
            next(err);
        }
    };

    logout = async (req, res) => {
        res.cookie("jwt", "",  {
            httpOnly: true,
            expires: new Date(0)
        });
    
        res.status(200).json({
            status: "success",
            message: "Logged out successfully"
        });
    };
} 