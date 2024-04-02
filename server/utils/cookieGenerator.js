const cookieGenerator = (user,res) => {
    try {
        // Generate JWT token for the user
        const token = user.getJWTToken();

        const options = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true, 
            secure: true, 
            sameSite: 'none' 
        };

        // Generate and send the cookie
        res.status(200).cookie('token', token, options).json({
            success: true,
            message: 'Logged In successfully !!',
            token,
            user
        });
    } catch (error) {
        console.error('Cookie generation error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
module.exports = cookieGenerator;
