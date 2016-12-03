
//TEEEEST COMMIT
var Discord = require("discord.js");

var client = new Discord.Client();

var fs = require("fs");
var path = "C:\\Users\\Martin\\node_modules\\generator-discordbot\\generators\\app\\templates\\Bot\\botallu\\highlights.txt";


client.on("message", function (message) {
	//Save twitch highlight links to textfile
	if (message.content.includes ("https://clips.twitch.tv")) {
		var str = message.content;
		var data = "";
		//Search for twitch.tv
		var re = new RegExp("(http|https)://clips.twitch.tv/[A-Za-z0-9_]+/[A-Za-z]+", "g");
		var myArray = str.match(re);
		for (var i=0; i<myArray.length; i++) {
			data = data + myArray[i] + " , ";
		}		
		fs.appendFile(path, data, function(error) {
    		if (error) {
    			console.error("write error:  " + error.message);
     		} 
     		else {
       			console.log("Successful Append to " + path);
     		}
		});				
	}
	//Save Oddshot highlight link to textfile
	if (message.content.includes ("https://oddshot.tv")) {
		var str = message.content;
		var data = "";
		//match oddshot string
		var re = new RegExp("(http|https)://oddshot.tv/shot/[A-Za-z0-9_]+", "g");
		var myArray = str.match(re);
		for (var i=0; i<myArray.length; i++) {
			data = data + myArray[i] + " , ";
		}		
		fs.appendFile(path, data, function(error) {
    		if (error) {
    			console.error("write error:  " + error.message);
     		} 
     		else {
       			console.log("Successful Append to " + path);
     		}
		});				
	}	

	//@allu response 
    if (message.content.includes ("253061098268393473")) {
    	var randomReply;
    	switch (Math.floor((Math.random() * 5) + 1)) {
    		case 1: 
    			randomReply = "Fuk u want m8?";
    			break;
    		case 2: 
    			randomReply = "Hey bro, don't leave me hanging :frowning:";
    			break; 
    		case 3: 
    			randomReply = "No";
    			break;
    		case 4: 
    			randomReply = "Yes";
    			break;
    		case 5: 
    			randomReply = "Shut up";
    			break;    			    			    			   			
    	}
    	message.reply(randomReply);
    }
    //commands
    if (message.content === "!commands") {
        message.reply("!ping, !highlights, !push, !roll, !flip, !maps x, !inhouse namn namn");
    }
    if (message.content === "Ping" || message.content === "!ping") {
        message.reply("Pong!");
    }
    if (message.content === "!sleep") {
        client.destroy();
    }
    if (message.content === "!roll") {
        message.reply(Math.floor((Math.random() * 100) + 1));
    }
    if (message.content === "!flip") {
		switch (Math.floor((Math.random() * 2) + 1)) {
			case 1: 
				message.reply("Heads!");
				break;
			case 2: 
				message.reply("Tails!");
				break;	
		}
    }
    if (message.content === "!push") {
    	message.reply("Push it like you push your girlfriend cirLewd");
    }
    //Read highlights.txt and reply content
    if (message.content === "!highlights") {
    	fs.readFile(path, function (error, data) {
    		if (error) {
    			console.error("write error:  " + error.message);
     		} 
     		else {
       			message.reply(data);
     		}
    	});
    }

//Maps function
    if(message.content.startsWith("!maps"))
    {
        //Stuff
        var inputen = message.content;
        var new_map_pool = "Maps: ";
        var cs_maps = ["Dust 2", "Inferno", "Nuke", "Train", "Cache", "Cobblestone", "Overpass", "Mirage"];
        var no_of_maps = cs_maps.length;

        //New number of maps?
        var correct_command = inputen.match(/^!maps[ ]?[1-8]?$/);
        if(correct_command && inputen.length > 5) {
            new_map_count = inputen.replace("!maps ", "")
            if(new_map_count > 0 && new_map_count <= cs_maps.length) {
                no_of_maps = new_map_count;
            }
        }

        //Generate map pool
        shuffleArray(cs_maps);
        for(var i=0; i<no_of_maps; i++) {
            new_map_pool = new_map_pool + cs_maps[i] + " ";
        }
        message.reply(new_map_pool);
    }   

//Create teams
    if(message.content.startsWith("!inhouse"))
    {
        //Teams
        var team_a = new Array();
        var team_b = new Array();

        //Split player names
        var player_names = message.content.replace("!inhouse", "").trim();
        var player_array = player_names.split(" ");

        //Generate teams
        shuffleArray(player_array);
        for(var i=0; i<player_array.length; i++) {
            if(i & 1)
                team_a.push(player_array[i]);
            else
                team_b.push(player_array[i]);
        }
        message.reply("LAG 1: " + team_a.join(" ") + ", LAG 2: " + team_b.join(" "));
    }      	 	    	    	    	        
});

client.on("presenceUpdate", function (oldMember, newMember) {
if(newMember.presence.game !== null) {    
	if (newMember.presence.game.streaming) {
		MsgToChannel(newMember.presence.game.url);				
	}
}	
});


/**
 * Shuffles an array.
 * @param {Array} a items The array containing the items.
 */
function shuffleArray(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

//Send message to channel
function MsgToChannel(msg) {
	var _channel = client.channels.array();
	for (var i = _channel.length - 1; i >= 0; i--) {
		if (_channel[i].id === "181823407397011456") {
		   _channel[i].sendMessage(msg);	   	
		   }	   
	    }		
}

//Send message to channel
function TtsToChannel(msg) {
	var _channel = client.channels.array();
	for (var i = _channel.length - 1; i >= 0; i--) {
		if (_channel[i].id === "181823407397011456") {
		   _channel[i].sendTTSMessage(msg);	   	
		   }	   
	    }		
}


client.on("ready", () => {
    console.log("ready event handler");
    MsgToChannel("Are those Redbulls only for the commercials, or can you actually drink them? :thinking:");   	    	    
})

client.login("MjUzMDYxMDk4MjY4MzkzNDcz.Cx7BDw.g5-7vUBsgrL_lv1UtV8bpeeZZ60");