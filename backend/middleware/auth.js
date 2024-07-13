const jwt = require('jsonwebtoken');

/**
 * User Authentication Middleware
 * 
 * Description: Test if user token is valid
 * @param {*} req Request Object
 * @param {*} res Response Object
 * @param {*} next Next Object
 * 
 * @returns next() method if token is valid and an error object
 * error: [error] with status 401 if token is compromised.
 */
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        if(!decodedToken) throw "Invalid Token Authentication";
        const userId = decodedToken.userId;
        res.locals.userId = userId;
        console.log(req.headers)
        const sessionId = req.headers["sessionid"];
        res.locals.sessionId = sessionId;
        const monitoringSessionId = req.headers["monitoringsessionid"];
        console.log("monitoringSession ID: ", monitoringSessionId);
        res.locals.monitoringSessionId = monitoringSessionId;
        if (req.body.userId && (req.body.userId !== userId)) {
            throw 'Invalid UserId';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error })
    }
}