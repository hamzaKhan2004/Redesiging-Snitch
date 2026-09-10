import { body } from "express-validator";
import { validateRequest } from "../config/validate.js";

export const registerValidator = [
    body("name")
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"),
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Email is not valid"),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

    validateRequest,
    // (req, res, next) => {
    //     const errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //         return res.status(400).json({
    //             message: "Validation errors",
    //             errors: errors.array()
    //         })
    //     }
    //     next();
    // }
]

export const loginValidator = [
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Email is not valid"),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    validateRequest,
]