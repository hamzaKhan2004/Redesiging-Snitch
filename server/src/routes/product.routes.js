import { Router } from "express";
import authenticate from "../middlewares/auth.middleware.js"
import { createProduct, updateProduct } from "../controllers/product.controller.js";
import multer from "multer";
import { productValidator, updateProductValidator } from "../validator/product.validator.js";

const upload = multer({
    storage: multer.memoryStorage(),
});

const router = Router();

const parseProductFields = (req, res, next) => {
    try {
        if (req.body.sizes) {
            req.body.sizes = JSON.parse(req.body.sizes);
        }

        if (req.body.categories) {
            req.body.categories = JSON.parse(req.body.categories);
        }

        if (req.body.price) {
            req.body.price = JSON.parse(req.body.price);
        }

        next();
    } catch (error) {
        console.log("JSON PARSE ERROR:", error);

        return res.status(400).json({
            message: "Invalid JSON in product fields"
        });
    }
};


/**
 * @POST /api/products
 */

router.post(
    "/",
    authenticate,
    upload.array("images", 5),
    parseProductFields,
    productValidator,
    createProduct
);

router.patch("/update/:id",
    authenticate,
    upload.array("images", 5),
    (req, res, next) => {

        console.log("req.body", req.body)
        console.log(req.body.sizes)

        if (req.body.sizes) {
            req.body.sizes = JSON.parse(req.body.sizes)
        }

        if (req.body.categories) {
            req.body.categories = JSON.parse(req.body.categories)
        }

        if (req.body.price) {
            req.body.price = JSON.parse(req.body.price)
        }

        next()
    },
    updateProductValidator,
    updateProduct
)

/**
 * @DELETE /api/products/image/:id/:imageId
 */


export default router;