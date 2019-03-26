var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond()
{
    var request = JSON.parse(this.req.chunks[0]),
    botRegex = /^\/ski/; botRegexDL = /^\/Cleveland/i;botRegexSalt = /^\/jake/;botRegexRules = /^\/fuf/
    botRegexAd=/^\/credit card rewards/;botRegexGTA = /^\/H/; botRegexSC = /^\/sup jake/i; botODB = /\/Yo/i; botDuck = /^\/duck/;
    botRegexP = /^\/TV/i; botRegexTw = /^\/Jake/i; botRegexSb = /^\/Northbrook/; botRegexSh = /^\/wolf/; botRegexWk = /^\/A/; botRegexCC = /^\/snail/;
    botRegexSiege = /^\/♋️/;
    siege1 = 'https://i.groupme.com/350x419.png.adc8c73a6c1547e0a9e04320296329f8'; siege2 = 'https://i.groupme.com/1279x752.jpeg.aa5d0401e0df495bba4b4e09dc5a6bd7'
    siege3 = 'https://i.groupme.com/960x960.png.006e180e05d841c6a2962e844bf1e6fd';
    var teamAb = ["NE","NO","ARI","PHI","CLE","TEN","OAK","DAL","IND","SEA","CIN","PIT","JAC"
                  ,"BAL","SD","DEN","MIN","ATL","KC","NYG","GB","DET","HOU","STL","CHI","CAR",
                  "MIA","BUF","SF","WAS","NYJ","TB"]
    if(request.text && botRegex.test(request.text))
    {
        this.res.writeHead(200);
        postMessage("http://i.imgur.com/4Ae1GPz.jpg");
        postMessage("There was a bear so joe only did 3 lines");
        this.res.end();
    }
    else if(request.text && botRegexDL.test(request.text))
    {
        this.res.writeHead(200);
        postMessage("Honestly, ive been putting up a front its a terrible place and we are all trying to move");
        this.res.end();
    }
    else if(request.text && botRegexSalt.test(request.text))
    {
        this.res.writeHead(200);
        postMessage("https://media.giphy.com/media/5xaOcLxIG8VahUOdOpO/giphy.gif");
        this.res.end();
    }
    else if(request.text && botRegexAd.test(request.text))
    {
        this.res.writeHead(200);
        postMessage("");
        this.res.end();
    }
    else if(request.text && botRegexRules.test(request.text))
    {
        this.res.writeHead(200);
        postMessage("http://i.imgur.com/Ci2s66m.jpg");
        postMessage("show some respect, her names Ellen she is the one that got away");
        this.res.end();
    }
    else if(request.text && botRegexGTA.test(request.text))
    {
        this.res.writeHead(200);
        
        postMessage("No im not fine i got us bolth fucked up where he went home at 12 and i blacked out but vaguely remember puking at midway");
        
        this.res.end();
    }
    else if(request.text && botRegexSC.test(request.text))
    {
        this.res.writeHead(200);
        postMessage("pretty thirsty");
        this.res.end();
    }
    else if(request.text && botRegexP.test(request.text)) {
        this.res.writeHead(200);
        postMessage("https://media.giphy.com/media/3oJpyi7wBpo0sV9V9C/giphy.gif");
        postMessage("It was a bird and she wasn't that diabetic");
        this.res.end();
    }
    
    else if(request.text && botRegexTw.test(request.text))
    {
        this.res.writeHead(200);
        postMessage("ill need a ride my car was stolen");
        this.res.end();
    }
    else if(request.text && botRegexSb.test(request.text)) {
        this.res.writeHead(200);
        postMessage("It's sick, ask Sean.");
        this.res.end();
    }
    else if(request.text && botRegexSh.test(request.text))
    {
        this.res.writeHead(200);
        postMessage("http://i.imgur.com/4Ae1GPz.jpg");
        this.res.end();
    }
    else if(request.text && botRegexWk.test(request.text))
    {
        this.res.writeHead(200);
        postMessage("https://i.imgur.com/zYYSYwK.gif");
        this.res.end();
    }
    else if(request.text && botODB.test(request.text))
    {
        this.res.writeHead(200);
        postMessage("THAT IS NOT WHAT HAPPENED");
        this.res.end();
    }
    else if(request.text && botDuck.test(request.text))
    {
        this.res.writeHead(200);
        postMessage("http://media3.giphy.com/media/YCseTHF2I6CCA/giphy.gif");
        this.res.end();
    }
    else if(request.text && botRegexCC.test(request.text))
    {
        this.res.writeHead(200);
        postMessage("since she had mono there was no kissing, so we had unprotected sex");
        this.res.end();
    }
    else if(request.text && botRegexSiege.test(request.text))
    {
        this.res.writeHead(200);
        postMessage("http://i.imgur.com/yXh1wEo.jpg");
        this.res.end();
    }
    
    else
    {
        this.res.writeHead(200);
        this.res.end();
    }
}

function postMessage(response)
{
    var botResponse,options, body, botReq;
    
    botResponse = response
    
    options =
    {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
    };
    
    body =
    {
        "bot_id" : botID,
        "text" : botResponse
    };
    
    console.log('sending ' + botResponse + ' to ' + botID);
    
    botReq = HTTPS.request(options, function(res)
                           {
                           if(res.statusCode == 202) {
                           //neat
                           } else {
                           console.log('rejecting bad status code ' + res.statusCode);
                           }
                           });
    
    botReq.on('error', function(err)
              {
              console.log('error posting message ' + JSON.stringify(err));
              });
    botReq.on('timeout', function(err) {
              console.log('timeout posting message ' + JSON.stringify(err));
              });
    botReq.end(JSON.stringify(body));
}

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
}


exports.respond = respond;
