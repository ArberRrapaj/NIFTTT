module.exports = function (DB) {
    const nodemailer = require('nodemailer');
    // setup smtp connection
    const transporter = nodemailer.createTransport({
        pool: true,
        host: "mail.cetindere.de",
        port: 465,
        secure: true,
        auth: {
            user: process.env.mail_user,
            pass: process.env.mail_password
        },
        tls: {
            rejectUnauthorized: true,
        },
    });
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("SMPT connection established!");
        }
    });

    var moment = require('moment');
    let Parser = require('rss-parser');
    let parser = new Parser();
    const rssUrl = 'http://minervabooks.net:1200/';
    const timestamp = "YYYY-MM-DD HH:mm:ss";
    // console.log('Dat date:', moment('Tue, 11 Jun 2019 23:43:33 GMT').format(timestamp));

    var CronJob = require('cron').CronJob;
    // Run at every second 0 = '0 * * * * *'
    new CronJob('0 * * * * *', checkRules, null, true);
    /*
    parser.parseURL('http://127.0.0.1:1200/instagram/user/salter2714', function (err, feed) {
        console.log(Date(feed.items[0]['pubDate']));
    });
    */
    function checkRules() {
        console.log('checking rules');
        DB.query("SELECT r.id,r.name,t.name AS triggerPlatform,a.name AS actionPlatform,triggerPayload,actionPayload,`user` FROM Rules AS r LEFT JOIN Platforms AS t ON r.triggerPlatform=t.id LEFT JOIN Platforms AS a ON r.actionPlatform=a.id WHERE active>0;", function (err, result) {
            if (err) console.log('couldn\'t check rules');
            else executeRules(result);
        });
    }

    function executeRules(rules) {
        // console.log(rules);
        rules.forEach(rule => {
            switch (rule.triggerPlatform) {
                case 'Instagram':
                    executeRule(rule, rssUrl + 'instagram/user/' + rule.triggerPayload);
                    break;
                case 'GitHub':
                    executeRule(rule, rssUrl + 'github/repos/' + rule.triggerPayload);
                default:
                    console.log('triggerPlatform is not yet implemented. Support will come soon.')
                    break;
            }
        });
    }

    function executeRule(rule, url) {
        const platform = rule.triggerPlatform;
        console.log('####' + platform + '-Rule####: ');
        parser.parseURL(url, function (err, feed) {
            if (!feed) {
                console.log('Couldn\'t load feed');
                return;
            }
            const lastElementTime = moment(feed.items[0]['pubDate']).format(timestamp);
            console.log('Last element: ', lastElementTime);
            DB.query("SELECT * FROM RuleLogs WHERE ruleId = ? ORDER BY time desc limit 1;", rule.id, function (err, result) {
                if (err) console.log('couldn\'t get RuleLog for ' + platform + '-Rule');
                else {
                    // console.log(moment().format("YYYY-MM-DD HH:mm:ss"));
                    if (result.length == 0) logRule(rule.id, moment().format("YYYY-MM-DD HH:mm:ss"));
                    else {
                        if (lastElementTime > moment(result[0].time).format(timestamp)) {
                            console.log(platform + ': Last element is actually relevant');
                            executeAction(rule);
                        } else console.log(platform + ': Last element is not relevant');
                    }
                }
            });
        });
    }

    function logRule(id, date) {
        const entry = {
            ruleId: id,
            time: date
        }
        DB.query("INSERT INTO RuleLogs SET ?;", entry, function (err, result) {
            if (err) console.log('Error logging rule ' + id, err);
            else console.log('Logged rule' + id);
        });

    }

    function executeAction(rule) {
        console.log('action would be executed now.');

        switch (rule.actionPlatform) {
            case 'Email':
                actionEmail(rule);
                break;
            default:
                break;
        }
        logRule(rule.id, moment().format("YYYY-MM-DD HH:mm:ss"));
    }

    function actionEmail(rule) {
        var message = "Check your Account to see which rule triggered";
        switch (rule.triggerPlatform) {
            case 'Instagram':
                message = 'User ' + rule.triggerPayload + ' uploaded a photo!';
                break;
            default:
                break;
        }
        transporter.sendMail({
            from: '"NIFTTT" <nifttt@cetindere.de>', // sender address
            to: rule.actionPayload, // list of receivers
            subject: "NIFTTT Rule triggered", // Subject line
            text: message, // plain text body
            html: "<b>" + message + "</b>" // html body
        }, function (err, info, response) {
            console.log('Mail-Error:', err);
            console.log('Mail-Info:', info);
            console.log('Mail-Response:', response);
        });
    }

}
