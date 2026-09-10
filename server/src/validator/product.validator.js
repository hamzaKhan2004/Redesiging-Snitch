import { body } from "express-validator";
import { validateRequest } from "../config/validate.js";

export const productValidator = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .bail()
        .isString()
        .withMessage("Title must be a string")
        .bail()
        .isLength({ min: 3, max: 100 })
        .withMessage("Title must be between 3 and 100 characters"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required")
        .bail()
        .isString()
        .withMessage("Description must be a string")
        .bail()
        .isLength({ min: 10, max: 1000 })
        .withMessage("Description must be between 10 and 1000 characters"),

    body("price")
        .notEmpty()
        .withMessage("Price is required")
        .bail()
        .isObject()
        .withMessage("Price must be an object"),

    body("price.amount")
        .notEmpty()
        .withMessage("Price amount is required")
        .bail()
        .isFloat()
        .withMessage("Price amount must be a number")
        .bail()
        .custom((value) => {
            if (Number(value) < 0) {
                throw new Error("Price amount must be a positive number");
            }
            return true;
        }),

    body("price.currency")
        .notEmpty()
        .withMessage("Price currency is required")
        .bail()
        .isString()
        .withMessage("Price currency must be a string")
        .bail()
        .isIn(["USD", "EUR", "CAD", "INR"])
        .withMessage("Price currency must be one of USD, EUR, CAD, INR"),

    body("categories")
        .notEmpty()
        .withMessage("Categories are required")
        .bail()
        .isArray({ min: 1 })
        .withMessage("At least one category is required"),

    body("categories.*")
        .trim()
        .isString()
        .withMessage("Category must be a string")
        .bail()
        .isLength({ min: 3, max: 50 })
        .withMessage("Category must be between 3 and 50 characters"),

    body("sizes")
        .notEmpty()
        .withMessage("Sizes are required")
        .bail()
        .isArray({ min: 1 })
        .withMessage("At least one size is required"),

    body("sizes.*.size")
        .notEmpty()
        .withMessage("Size is required")
        .bail()
        .isIn(["XS", "S", "M", "L", "XL", "XXL"])
        .withMessage("Size must be one of XS, S, M, L, XL, XXL"),

    body("sizes.*.stock")
        .notEmpty()
        .withMessage("Stock is required")
        .bail()
        .isInt({ min: 0 })
        .withMessage("Stock must be a non-negative integer"),

    validateRequest,
];

export const updateProductValidator = [
    body("title")
        .optional()
        .trim()
        .notEmpty().withMessage("Title is required")
        .isLength({ min: 3, max: 100 }).withMessage("Title must be between 3 and 100 characters"),
    body("description")
        .optional()
        .trim()
        .notEmpty().withMessage("Description is required")
        .isLength({ min: 50, max: 1000 }).withMessage("Description must be between 10 and 1000 characters"),
    body("price.amount")
        .optional()
        .notEmpty().withMessage("Price amount is required")
        .isFloat({ min: 0 }).withMessage("Price amount must be a positive number"),
    body("price.currency")
        .optional()
        .notEmpty().withMessage("Price currency is required")
        .isIn(["USD", "EUR", "CAD", "INR"]).withMessage("Price currency must be one of USD, EUR, CAD, INR"),
    body("categories")
        .optional()
        .isArray().withMessage("Categories must be an array"),
    body("categories.*")
        .optional()
        .trim()
        .notEmpty().withMessage("Category is required")
        .isString().withMessage("Category must be a string"),
    body("sizes")
        .optional()
        .isArray().withMessage("Sizes must be an array"),
    body("sizes.*.size")
        .optional()
        .notEmpty().withMessage("Size is required")
        .isIn(["XS", "S", "M", "L", "XL", "XXL"]).withMessage("Size must be one of XS, S, M, L, XL, XXL"),
    body("sizes.*.stock")
        .notEmpty().withMessage("Quantity is required")
        .isInt({ min: 0 }).withMessage("Quantity must be a non-negative integer"),
]