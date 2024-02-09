const isLoggedIn = (req, res, next) => {
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        console.log('error', 'You must be signed in');
        const responseHeaders = res.getHeaders();
        console.log('Response Headers:', responseHeaders);
        return res.json({ status: 401, message: 'You must be logged in' });
    }
    next();
}

module.exports = { isLoggedIn }


/* 

So, now when we want to authenticate,
in the .get request for the route. we do:

router.post('/register', async(req,res, next)){
    const {email, username, password } = req.body;
    const user = new User({email, username})
    const registeredUser = await User.register(user,password)
    req.login(registeredUser, err => {
        if(err){
            return next(err);
        }
    })
    res.redirect('/home');
}

Now this part if for the registeration of course, so what about if we want to login? will we can use:

router.post('/login',passport.authenticate('local', {failureFlash:true, failureRedirect:'/login'}), (req,res) {
    req.flash('HEY, you are logged on!')
    res.redirect('/home')
})


Or, we have a middleware actually from passport for us, it's called req.isAuthenticated(); which is retrieved from cookies.
so now, just to make everything easier for you my lovely project, I made a middleware, called isLoggedIn, and I exported it. 
Now you can actually import it wherever you want, and just include it within the method. 

const {isLoggedIn} = require('./middlewares/isLoggedIn')

if we want to logout the user, we can:
req.logout() 

*/ 
