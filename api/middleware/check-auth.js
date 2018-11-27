// JWT debugger: https://jwt.io/#debugger
// UNIX TimeStamp converter: https://www.epochconverter.com/

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Get token from headers:
        // Authorization Bearer<WHITE_SPACE>Token
        const token = req.headers.authorization.split(" ")[1]; // It should come something like: Bearer<WHITE_SPACE>token...
        //console.log(token);
        //console.log(process.env.JWT_PRIVATE_KEY);

        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        // To get token from request body use this
        //const decoded = jwt.verify(req.body.token, process.env.JWT_PRIVATE_KEY);
        req.userData = decoded;
        // everything went well so we can continue
        next();
    } catch (error) {
        //console.log(error);
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};

/**
 * REMOVE AFTER IMPLEMENTING TOKEN REFRESH <------------------------------------------------------------
 * 
 * A couple of readings to explore:
 * 
 * https://medium.com/hyphe/token-based-authentication-in-node-6e8731bfd7f2
 * https://medium.com/hyphe/using-refresh-tokens-in-node-to-stay-authenticated-ad0c9d2b444f
 * 
 * TODO !!!! Remove these .
 * 
 * Auth - login, JWT, refresh token
 * Users - signup
 * Products - get, post and delete (authenticated user, upload images)
 * Categories - get, post (authenticated user)
 * 
 * --- Init
 * PS > npm init
 * 
 * "email":"test@mail.com", "password":"123456"
 * token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJ1c2VySWQiOiI1YmU0YWM2OWVjNTA1YTQ4NTA1NjBlYjAiLCJpYXQiOjE1NDE3ODc0NDYsImV4cCI6MTU0MTc4Nzc0Nn0.UZqY0gqSOKPqhcYMcXjxcDgdEUp30wh0fxaopyHrkns
 * 
 * 
 * */