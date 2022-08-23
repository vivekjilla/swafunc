module.exports = async function (context, req) {
    var cmod = require('cookie');
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";
    const TOKEN_NAME = 'token'

    const MAX_AGE = 60 * 60 * 8 // 8 hourss
    const cookie = cmod.serialize(TOKEN_NAME, "hola", {
        maxAge: -1,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
        })
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage,
        headers: {
            'Set-Cookie': cookie
        }
    };
}