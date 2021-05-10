import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "::JOIN::" })
};

export const postJoin = async (req, res, next) => {
    const {
        body: { name, email, password, password2 }
    } = req;
    if(password !== password2) {
        res.status(400);
        res.render("join", { pageTitle: "::JOIN::" })
    } else {
        //To Do: Register User
        try {
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
            next();
        } catch(error) {
            console.log(error);
            res.redirect(routes.home);
        }
    }
};
export const getLogin = (req, res) => {
    res.render("login", { pageTitle: "::LOGIN::" });
};
export const postLogin = passport.authenticate('local', {
    failureRedirect: routes.login,
    successRedirect: routes.home
});

export const githubLogin = passport.authenticate('github');

export const githubLoginCallback= async (_, __, profile, cb) => { //accessToken, refreshToken, profile, cb
    // console.log(accessToken, refreshToken, profile, cb);
    const { _json: {id, avatar_url:avatarUrl, name, email}} = profile;
    console.log(profile);
    try {
        const user = await User.findOne({email});
        console.log(user);
        if(user) {
            user.githubId = id;
            user.save();
            return cb(null, user);
        } 
        const newUser = await User.create({
            email,
            name,
            githubId: id,
            avatarUrl
        });
        return cb(null, newUser);
    } catch(error) {
        return cb(error);
    }
}

export const postGithubLogin = (req, res) => {
    res.redirect(routes.home); 
};

export const kakaoLogin = passport.authenticate('kakao');

export const kakaoLoginCallback = async (_, __, profile, done) => {
    const { _json: {id, properties: {profile_image:avatarUrl, nickname:name},kakao_account: {email}}} = profile;
    console.log(profile);
    try {
        const user = await User.findOne({email});
        console.log(user);
        if(user) {
            user.kakaoId = id;
            user.save();
            return done(null, user);
        } 
        const newUser = await User.create({
            email,
            name,
            kakaoId: id,
            avatarUrl
        });
        return done(null, newUser);
    } catch(error) {
        return done(error);
    }
}

export const postKakaoLogin = (req, res) => {
    res.redirect(routes.home); 
};



export const logout = (req, res) => {
    //To Do: process log out
    req.logout();
    res.redirect(routes.home);
};

export const getMe = (req, res) => {
    res.render("userDetail", { pageTitle: "::USERDETAIL::", user: req.user });
    console.log(req.user);
};


export const userDetail = async (req, res) => {
    const { params: {id}} = req;
    try {
        const user = await User.findById(id).populate('videos');
        console.log("USER::::",user);
        res.render("userDetail", { pageTitle: "::USERDETAIL::" , user});
    } catch(error) {
        res.redirect(routes.home);
    }
}
export const getEditProfile = (req, res) => {
    res.render("editProfile", { pageTitle: "::EDITPROFILE::" });
}
export const postEditProfile = async (req, res) => {
    const {
        body: {name, email},
        file
    } = req;
    try {
        await User.findByIdAndUpdate(req.user.id, {
            name,
            email,
            avatarUrl: file ? file.path : req.user.avatarUrl
        });
        res.redirect(routes.me);
    }catch(error) {
        res.redirect(routes.editProfile);
    }
}
export const getChangePassword = (req, res) => {
    res.render("changePassword", { pageTitle: "::CHANGEPASSWORD::" });
}
export const postChangePassword = async (req, res) => {
    const { 
        body:{
            cPassword, nPassword, vPassword
        }
    } = req;
    try {
        if(nPassword !== vPassword) {
            res.status(400);
            res.redirect(`/users/${routes.changePassword}`);
            return;
        }
        await req.user.changePassword(cPassword, nPassword);
        res.redirect(routes.me);
    } catch(error) {
        res.status(400);
        res.redirect(`/users/${routes.changePassword}`);
    }
}