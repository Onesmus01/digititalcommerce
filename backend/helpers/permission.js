import User from '../models/usermodel.js';

export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (user?.role !== 'ADMIN') {
            return res.status(403).json({ success: false, message: "Access denied. Admins only." });
        }
    } catch (error) {
        
    }
}
    