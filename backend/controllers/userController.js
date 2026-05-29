import User from "../models/User.js";

/**
 * Update user profile (role + skills)
 */
export const updateProfile = async (req, res) => {
    try {

        const userId = req.user.id; // from auth middleware

        const { role, skills } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Update only provided fields (prevents accidental overwrite)
        if (role !== undefined) {
            user.role = role;
        }

        if (Array.isArray(skills)) {
            user.skills = skills.map((skill) => ({
                name: skill,
                rating: skill.rating ?? 0,
            }));
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: {
                role: user.role,
                skills: user.skills,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};