
const fs = require("fs");
const getter = require("booru-getter");
var gear = require("../../gearbox.js");


var gear = require("../../gearbox.js");
var paths = require("../../paths.js");
var locale = require('../../../utils/multilang_b');
var mm = locale.getT();


var cmd = 'rule34';

var init = function (message,userDB,DB) {
    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    if (Author.bot) return;
    var Member = Server.member(Author);
    var Target = message.mentions.users.first() || Author;
    var MSG = message.content;
    var bot = message.botUser
    var args = MSG.split(' ').slice(1)
    var LANG = message.lang;

    //-------MAGIC----------------
    //HELP TRIGGER
    let helpkey = mm("helpkey",{lngs:message.lang})
if (message.content.split(" ")[1]==helpkey || message.content.split(" ")[1]=="?"|| message.content.split(" ")[1]=="help"){
    return gear.usage(cmd,message,this.cat);
}
//------------
    if(DB.get(Server.id).channels[Channel.id].modules.NSFW==false){
        message.reply(mm('forFun.nsfwNope',{lngs:LANG}));
        return;
    }

    let GOODMOJI = gear.emoji('rubine')
let GOOD = 'Rubine'

if (DB.get(Server.id).modules.GOODNAME) {
    GOOD = DB.get(Server.id).modules.GOODNAME
}

/*
        if (gear.checkGoods(5, Author) == false) {
            message.reply(mm('forFun.nsfwNofunds',{lngs:LANG, goods:GOOD,prefix:message.prefix}));
            return;
        }
        gear.paramIncrement(bot.user,'goodies',5)
        gear.paramIncrement(bot.user,'earnings.putaria',5)
        gear.paramIncrement(Author,'goodies',-5)
        gear.paramIncrement(Author,'expenses.putaria',5)
*/
        console.log("PUTARIA INVOKED by " + Author.username + "-------------\n")
        let query = message.content.split(" ");
        !query[1] ? query[1] = "pointy_ears" : query[1] = query[1];

        getter.getRandomLewd(query[1], async(url) => {
            if (url === undefined) {
                message.reply(mm('forFun.nsfw404',{lngs:LANG}))
            }
            else {
                //message.channel.send()
                //message.reply("http:" + url);
                             var msg_ax = "**Query:** " +query[1] +"\nby "+Author//GOODMOJI + mm('forFun.nsfwCheckout',{lngs:LANG,emoji:""})
                 var emb = new gear.Discord.RichEmbed();
                      emb.setColor('#b41212')
                      emb.setTitle(':underage: RULE 34')
                      emb.setDescription(msg_ax)

              var image = ("http:" + url)
                 message.channel.send({embed:emb})
                    message.channel.send({files:[{attachment:image,name:"file.png"}]}).then(function (m) {
                m.react('👍')
                m.react('👎')
                m.react('❤')
                m.react('😠')

            }).catch(e=>message.channel.send(image))


            }
        })


}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'nsfw'
};
