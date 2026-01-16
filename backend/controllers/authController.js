

export const googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({ message: "No credential provided" });
        }

        // 🔐 VERIFY WITH GOOGLE
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        // extract only what you need
        const {
            sub: googleId,
            email,
            email_verified,
            name,
            picture,
        } = payload;

        if (!email_verified) {
            return res.status(403).json({ message: "Email not verified" });
        }

        // 🔥 NOW this user is VERIFIED by Google
        console.log("Verified Google user:", email);

        // later: find/create user + issue YOUR JWT
        res.status(200).json({
            message: "Google user verified",
            user: { googleId, email, name, picture },
        });
    } catch (err) {
        console.error("Google verification failed:", err);
        res.status(401).json({ message: "Invalid Google token" });
    }
};


