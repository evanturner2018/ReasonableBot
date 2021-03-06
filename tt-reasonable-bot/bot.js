var HTTPS = require('https');
var fs = require('fs');

var botID = process.env.BOT_ID;

// Regex (should not change often)
var helpRegex = /^!help$/;
var activesRegex = /^!actives$/;
var accountsRegex = /^!accounts$/;
var passEmptyRegex = /^!passwords$/;
var passwordRegex = /^!password \w*$/;
var calendarRegex = /^!calendar$/;
var studyRegex = /^!study$/;
var usernameRegex = /^!username$/;
var reasonableRegex = /^!reasonable$/;
var cleanupRegex = /^!cleanup$/;
var pledgesRegex = /^!pledges$/;
var doorRegex = /^!door$/;
var sigmaRegex = /^!sigma \w*$/;
var capitalizedsigmaRegex = /^!Sigma \w*$/;
var standardsRegex = /^!standards$/;
var thanksRegex = /^!thanks$/;
var nukeRegex = /^!nuke$/;
var moonRegex = /^!moon$/;
var riskRegex = /^!risk$/;
var barRegex = /^!bar$/;
var budgetRegex = /^!budget$/;
var gazeRegex = /^!pd$/;
var fixRegex = /^!fix$/;
var socialRegex = /^!social$/;
var driveRegex = /^!drive$/;
var cockRegex = /^!cock$/;
var retardRegex = /\bretard/;
var covidRegex = /^!covid$/;
var dieRegex = /^!die$/;
var hornyRegex = /^!horny$/;

// Personal variables
var passwords = {};
var accounts = [];

var actives = {};
var sigmaNumbers = [];

/* System Functions */
function readFileToString(filepath, func) {
  return fs.readFileSync(filepath).toString();
};

function importAccounts() {
  // Accounts and passwords
  var lines = readFileToString('./resources/passwords.txt').split('\n');
  console.log(lines);
  for (var i = 0; i < lines.length; i++) {
    temp = lines[i].split(': ');
    accounts.push( temp[0] );
    passwords[temp[0]] = temp[1];
  };
  console.log(accounts);
};

function importActives() {
    // Actives
    var lines = readFileToString('./resources/allactives.txt').split('\n');
    console.log(lines);
    for (var i = 0; i < lines.length; i++) {
        temp = lines[i].split(' - ');
        sigmaNumbers.push( temp[0] );
        actives[temp[0]] = temp[1];
    };
    console.log(sigmaNumbers);
};

/* Callback fuctions */

function getActives() {
    return readFileToString('./resources/actives.txt');
};

function getPledges() {
    return readFileToString('./resources/pledges.txt');
};

function getPassword(account) {
  if( Object.keys(passwords).length === 0 && JSON.stringify(passwords) === JSON.stringify({})
    ){ importAccounts() };
  return passwords[account.toLowerCase()];
};

function getAccounts() {
  if(accounts.length == 0){ importAccounts() };
  return accounts.join('\n')
};

function getHelpText() {
  return readFileToString('./resources/help_text.txt');
};

function getCalendarText() {
    return readFileToString('./resources/calendar.txt');
};

function getStudyImage() {
    return 'http://i.imgur.com/NL43LG2.jpg';
};

function getUsername(){
    return 'sigmachapterofthetatau@gmail.com';
};
function getBar(){
    return 'https://imgur.com/a/Ai5abbF';
};

function getFixForm(){
    return 'https://docs.google.com/forms/d/1PbzY8sRQXdT_Mt45pgj48c19NKyAFoHjgUl3Gr4MVgA/viewform?edit_requested=true';
};

function getReasonable(){
    return readFileToString('./resources/reasonable_list.txt');
};

function getCleanup(){
    return 'https://i.imgur.com/8iXZKx9.jpg';
};

function getDrive() {
  return 'https://drive.google.com/drive/u/0/folders/1cbuZ2D3X1T82Aue1VxbhBfrRQ5viB7ax';
};

function getDoor() {
    return '4047';
};

function getStandardsForm() {
    return 'https://docs.google.com/forms/d/1XaPgW8POfCV81O5zwRYjSz1tcDL3FxTwcRvMmfuRPdg/viewform?edit_requested=true';
};

function getBTC() {
    return 'https://docs.google.com/document/d/1-nMroalAfScZPbMf5G2OGU2Kf18cukcDnCL1n_DftkU/edit?usp=sharing';
};

function getLowestBadge() {
    return 'Evan Turner';
};

function getThanks() {
	var x = Math.floor(Math.random() % 4);
	var s;
	switch (x) {
		case 1:
			s = '';
			break;
		case 2:
			s = 'No problem';
			break;
		case 3:
			s = 'You are welcome';
			break;
		case 4:
			s = 'You\'re welcome';
	}
    return s;
};

function getSigma(sigmaNumber) {
    if(Object.keys(actives).length === 0 && JSON.stringify(actives) === JSON.stringify({})
       ){ importActives() };
    return actives[sigmaNumber];
};

function getNuke(){
    return 'https://i.imgur.com/wL3Uo20.jpg';
};

function getNukeCountdown(){
    return 'https://i.imgur.com/dVF4hGD.jpg';
};

function getDrop(){
    return 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // rick roll
	 //return '!nuke';
};

function getMoon(){
    return 'Do your fucking job @Andrew Campbell';
};

function getRisk(){
    return '!moon';
};

function getBudget(){
    return '$0.69';
};

function getPD(){
    return 'https://i.imgur.com/7eyNivw.png';
};

function getRetard() {
    return 'have you stopped to consider how others feel about the R word';
};

function getCovid() {
    return readFileToString('./resources/covid.txt');
};

function getHorny() {
    return 'https://www.instagram.com/gaven.zou/';
};

function getCock() {
    return readFileToString('./resources/cock.txt');
};

function rollDie() {
    var min = 1;
    var max = 7;
    //return a random number between max (exclusive) and min (inclusive)
    return (Math.floor(Math.random() * (max-min) + min)).toString();
};

// Determine what kind of response to make
function respond() {
  // Now we do the cool stuff!!
  var request = JSON.parse(this.req.chunks[0]);
    var user = JSON.parse;

  // Hey, something happened!
  if (request.text) {
    // HELP OUT USER
    if (helpRegex.test(request.text)) {
      console.log("!help");
      this.res.writeHead(200);
      postMessage(getHelpText);
      this.res.end();
    }
    

    // GET ACCOUNTS
    else if (accountsRegex.test(request.text) || passEmptyRegex.test(request.text)) {
      console.log("!accounts");
      this.res.writeHead(200);
      postMessage(getAccounts);
      this.res.end();
    }
    // GET PASSWORD
    else if (passwordRegex.test(request.text)) {
      account = request.text.slice(10); //!password
      console.log("!password " + account);
      this.res.writeHead(200);
      postMessage(getPassword, account);
      this.res.end();
    }
    // GET ACTIVES
    else if (activesRegex.test(request.text)) {
      console.log("!actives");
      this.res.writeHead(200);
      postMessage(getActives);
      this.res.end();
    }
      
      // GET SPECIFIC ACTIVE
    else if (sigmaRegex.test(request.text) || capitalizedsigmaRegex.test(request.text)) {
        sigmaNumber = request.text.slice(7); //!sigma
        console.log("!sigma " + sigmaNumber);
        this.res.writeHead(200);
        postMessage(getSigma, sigmaNumber);
        this.res.end();
    }
      // GET PLEDGES
    else if (pledgesRegex.test(request.text)) {
        console.log("!pledges");
        this.res.writeHead(200);
        postMessage(getPledges);
        this.res.end();
    }
      // GET CALENDAR
    else if (calendarRegex.test(request.text)) {
        console.log("!calendar");
        this.res.writeHead(200);
        postMessage(getCalendarText);
        this.res.end();
    }

    else if (cockRegex.test(request.text)) {
        console.log("!cock");
        this.res.writeHead(200);
        postMessage(getCock);
        this.res.end();
    }

      // GET STUDY
    else if (studyRegex.test(request.text)) {
        console.log("!study");
        this.res.writeHead(200);
        postMessage(getStudyImage);
        this.res.end();
    }
      // GET USERNAME
    else if (usernameRegex.test(request.text)) {
        console.log("!username");
        this.res.writeHead(200);
        postMessage(getUsername);
        this.res.end();
    }
      // GET REASONABLE
    else if (reasonableRegex.test(request.text)) {
        console.log("!reasonable");
        this.res.writeHead(200);
        postMessage(getReasonable);
        this.res.end();
    }
      
      // GET CLEANUP
    else if (cleanupRegex.test(request.text)) {
        console.log("!cleanup");
        this.res.writeHead(200);
        postMessage(getCleanup);
        this.res.end();
    }

      // GET BAR
    else if (barRegex.test(request.text)) {
        console.log("!bar");
        this.res.writeHead(200);
        postMessage(getBar);
        this.res.end();
    }

      // GET DOOR
    else if (doorRegex.test(request.text)) {
        console.log("!door");
        this.res.writeHead(200);
        postMessage(getDoor);
        this.res.end();
    }
    
    //post link to the google drive
    else if (driveRegex.test(request.txt)) {
      console.log("!drive");
      this.res.writeHead(200);
      postMessage(getDrive);
      this.res.end();
    }

      // GET STANDARDS FORM
    else if (standardsRegex.test(request.text)) {
        console.log("!standards");
        this.res.writeHead(200);
        postMessage(getStandardsForm);
        this.res.end();
    }

      // GET FIX FORM
    else if (fixRegex.test(request.text)) {
        console.log("!fix");
        this.res.writeHead(200);
        postMessage(getFixForm);
        this.res.end();
    }

      // GET THANKS
    else if (thanksRegex.test(request.text)) {
        console.log("!thanks");
        this.res.writeHead(200);
        postMessage(getThanks);
        this.res.end();
    }

    // GET MOON
    else if (moonRegex.test(request.text)) {
        console.log("!moon");
        this.res.writeHead(200);
        postMessage(getMoon);
        this.res.end();
    }

    // GET risk
    else if (riskRegex.test(request.text)) {
        console.log("!risk");
        this.res.writeHead(200);
        postMessage(getRisk);
        this.res.end();
    }

    // GET BUDGET
    else if (budgetRegex.test(request.text)) {
        console.log("!budget");
        this.res.writeHead(200);
        postMessage(getBudget);
        this.res.end();
    }

    //no gay shit
    else if (gazeRegex.test(request.text)) {
      console.log("!pd");
      this.res.writeHead(200);
      postMessage(getPD);
      this.res.end();
    }

    //beat the clock
    else if (socialRegex.test(request.text)) {
      console.log("!social");
      this.res.writeHead(200);
      postMessage(getBTC);
      this.res.end();
    }

    //ban the R word
    else if (retardRegex.test(request.text)) {
      console.log("retard");
      this.res.writeHead(200);
      postMessage(getRetard);
      this.res.end();
    }
     
	// GET NUKE (to be used to spam group chat if it all goes hell)
    else if (nukeRegex.test(request.txt)){
	console.log("!nuke");
	//this.res.writeHead(200); // uncomment this to purge
	//postMessage(getNuke);
	//this.res.writeHead(200);
	//postMessage(getNukeCountdown);
	this.res.writeHead(200);
        postMessage(getDrop);
	this.res.end();
    }
  
    //return the frat's positive covid dates
    else if (covidRegex.test(request.text)) {
      console.log("!covid");
      this.res.writeHead(200);
      postMessage(getCovid);
      this.res.end();
    }

    else if (hornyRegex.test(request.text)) {
        console.log("!horny");
        this.res.writeHead(200);
        postMEssage(getHorny);
        this.res.end();
    }
    
    //roll a six sided die
    else if (dieRegex.test(request.text)) {
      console.log("!die");
      this.res.writeHead(200);
      postMessage(rollDie);
      this.res.end();
    }
    // NOT IMPORTANT...
    else {
      console.log("don't care");
      this.res.writeHead(200);
      this.res.end();
    }
  }
  // Boring......
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
};

// Send the message to the group
function postMessage(messageFunction, optString) {
  var botResponse, options, body, botReq;

  botResponse = messageFunction(optString);

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
};



exports.respond = respond;
