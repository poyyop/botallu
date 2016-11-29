var Discord = require("discord.js");

var client = new Discord.Client();

client.on("message", function (message) {
    if (message.content.includes  ("253061098268393473")) {
        message.reply("Fuk u want m8?");
    }
});

client.on("message", function (message) {
    if (message.content === "!commands") {
        message.reply("!ping,  !push, !roll, !flip, !maps x, !inhouse namn namn");
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
		 var x = Math.floor((Math.random() * 2) + 1);
        if (x === 1) {
			message.reply("Heads!");
		}
		if (x === 2) {
			message.reply("Tails!");
		}
    }
    if (message.content === "!push") {
    	message.reply("TODO!");
    }
});

client.on("presenceUpdate", function (oldMember, newMember) {
if(newMember.presence.game !== null) {    
	if (newMember.presence.game.streaming) {
		MsgToChannel(newMember.presence.game.url);				
	}
}	
});

//Maps function
client.on("message", function (message) {
    if(message.content.startsWith("!maps"))
    {
        //Stuff
        var inputen = message.content;
        var new_map_pool = "Maps: ";
        var cs_maps = ["Dust 2", "Inferno", "Nuke", "Train", "Cache", "Cobblestone", "Overpass"];
        var no_of_maps = cs_maps.length;

        //New number of maps?
        var correct_command = inputen.match(/^!maps[ ]?[1-7]?$/);
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
});

//Create teams
client.on("message", function (message) {
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


client.on("ready", () => {
    console.log("ready event handler");
    MsgToChannel("Are those Redbulls only for the commercials, or can you actually drink them?");   	    	    
})

client.login("MjUzMDYxMDk4MjY4MzkzNDcz.Cx7BDw.g5-7vUBsgrL_lv1UtV8bpeeZZ60");