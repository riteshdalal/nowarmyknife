export { router };

import axios from 'axios';
import { username, password } from './auth.js';
import { Router } from 'express';
var router = Router();

const view = /*html*/`
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Dev Server</title>
            <script src="bundle.js"></script>
        </head>
        <body>
            <h1>Graffiti</h1>
            <div>Scrawl some text in the sys_audit table of the instance</div>

            <form action="/graffiti" method="post">
                <input type="text" name="message" />
                <button type="submit">Submit</button>
            </form>
        </body>
    </html>
`;

router.get('/graffiti', function(req, res, next) {
    res.send(view);
});

const postView = /*html*/`
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Dev Server</title>
            <script src="bundle.js"></script>
        </head>
        <body>
            <h1>Graffiti</h1>
            <div>Scrawl some text in the sys_audit table of the instance</div>

            <h2>Success!!!</h2>
        </body>
    </html>
`;

/* GET users listing. */
router.post('/graffiti', async function(req, res, next) {
    try {
        var response = await axios.post('https://dev64919.service-now.com/api/now/table/sys_audit', 
        {
            "reason": req.body.message
        },
        {
            'auth': {
                'username': username,
                'password': password
            }
        });
        
        res.send(postView);
    }
    catch(err) {
        res.send(err);
    }
});