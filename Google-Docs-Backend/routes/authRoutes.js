const {Router} = require('express');
const router = Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
const crypto = require('crypto');
const sendEmail = require('../sendEmail');
const createToken = (id)=>{
    return jwt.sign({id},'soham secret',{
     expiresIn: 60 * 60 * 3
    })
}

router.post('/login', async(req,res)=>{
   const {username, password} = req.body;
    const user = await User.findOne({username});
    if(user){
        if (!user) {
            return res.status(401).json({ error: 'User not found' }); // Unauthorized
        }
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid credentials' }); // Unauthorized
        }
        const jwtToken = createToken(user._id);
        res.cookie('jwt', jwtToken, {
            httpOnly: false,
            maxAge: 3 * 60 * 60 * 1000
        });

        res.status(200).json({ message: 'Logged in successfully' });
      }

})

router.post('/signup', async (req,res)=>{
    const {username , password , email} = req.body;
    const user =  await User.create({
        username,
        password,
        email,
    });
    const emailToken = await Token.create({
        userId:user._id,
        token: crypto.randomBytes(32).toString("hex")
    })
    const url = `http://localhost:3002/${user._id}/verify/${emailToken.token}`;
    await sendEmail(user.email,"Verification email",url);

    res.status(202).json({message:'Email sent to your Account !'});
})

router.get('/logout',(req,res)=>{
    res.cookie('jwt','',{ maxAge : 1});
    res.json({message:"logged out"});
    // redirect part left
})

router.get('/:userid/verify/:token', async (req,res)=>{
    const userId = req.params.userid;
    try{
        const user = await User.findOne({_id:req.params.userid});
        if(!user) res.status(400).send("invalid link");

        const token = await Token.findOne({
            userId: user._id,
            token : req.params.token
        })
        if(!token) res.status(400).send("invalid link");
        await User.findByIdAndUpdate(userId, {verified:true});
        const jwtToken = createToken(user._id);
        res.cookie('jwt',jwtToken,{
            httpOnly:true,
            maxAge:3 * 60 * 60 *60,
        })
        res.status(200).send("email verified")
    }catch(error){
        console.log(error)
    }
})

router.get('/verify',(req,res)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'soham secret',async(err, decodedToken)=>{
            if(err){
                console.log("error while verifying")
            }else{
                console.log('decoded token is',decodedToken);
                const { username } = await User.findById(decodedToken.id)
                res.json({decodedToken,username});
            }
        })

    }else{
        console.log("not found")
        res.json({error:"not found"})
    }
});

module.exports = router;