/**
 * This function limits access to routes based on the role of the user making the request.
 * @param role The role that is allowed to access the route.
 * @return A middleware function that checks if the user making the request has the specified role.
 */
import User from "../models/user.model.js";
export const limitRole = (role) =>  async (req, res, next) => {
    // Find the user making the request and populate their role.
    const user =  await User.findById(req.body.id).populate("ptrRol");
    console.log(user)
    // Get the user's role.
    const rol = user.ptrRol.rol;
    
    // Check if the user's role matches the allowed role.
    if (rol != role) {
        // If the user's role doesn't match, return a 401 Unauthorized error.
        return res.status(401).send({
            message: "No tiene permisos para realizar esta acción",
        });
    } else {
        // If the user's role matches, call the next middleware function.
        next();
    }

};
