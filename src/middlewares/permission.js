import { UserRole } from "../constants/constants";
import { verifyToken } from "../serviecs/auth";
import { getUser } from "../serviecs/user";


export const requireLogin = async (req, res, next) => {
    try {
        if(req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];

            const user = verifyToken(token);
            req.session.user = user
            // console.log(`[requiredLogin] token -> ${JSON.stringify(token)}`)
            // console.log(`[requiredLogin] role -> ${JSON.stringify(user.role)}`)
            switch (user.role) {
                case 1:
                    // console.log(`[requiredLogin] admin ${user._id}`);
                    const admin = await getUser({ _id: user._id });
                    // console.log(`[requiredLogin] admin ${admin}`);
                    if(!admin) {
                        return res.status(401).json({
                            success: false,
                            message: 'Admin not found'
                        })
                    }
                    req.session.admin = admin
                    next()
                    break;
                case 0:
                    console.log(`[requiredLogin] client ${user._id}`);
                    const client = await getUser({ role: 0 });
                    // console.log(`[requiredLogin] admin ${client}`);
                    if(!client) {
                        return res.status(401).json({
                            success: false,
                            message: 'Client not found'
                        })
                    }
                    req.session.client = client
                    next()
                    break;
                default:
                    console.log('role not 0');
                    break;
                }
            // return res.status(500).json({
            //     success: false,
            //     message: 'Role UnAuthorization'
            // });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Role UnAuthorization'
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const checkPermissions = (...roles) => {
    console.log(`[checkPermissions] role ${JSON.stringify(...roles)}`);
    return (req, res, next) => {
        try {
            const user = req.session.user;
            console.log(`[checkPermissions] user -> ${JSON.stringify(user)}`);
            if(Array.isArray(roles) && roles.includes(user.role) ){
                console.log('Array isArray', Array.isArray(roles));
                // console.log(`[checkPermissions] array -> ${JSON.stringify(Array.isArray(roles) && roles.includes(user.role)}`);
                return next()
            }

            return res.status(401).json({
                success: false,
                message: 'Permission denied'
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}