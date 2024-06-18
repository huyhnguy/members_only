

exports.isLoggedIn = (req, res, next) => {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.status(401).json({ msg: 'You are not logged in' })
    }
}

exports.isClubMember = (req, res, next) => {}