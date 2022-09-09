// ===============================|  yourfriend  |===============================
// Kurulum hakkında bilgi için:
// https://github.com/yourfriendF/djsv14-gelismis-altyapi#-kurulum--%C3%A7al%C4%B1%C5%9Ft%C4%B1rma--notlar
// =========================================================================

/* Definitions */
const { Client, Collection } = require("discord.js");
const client = new Client({
    intents: 33283 // https://github.com/yourfriendF/djsv14-gelismis-altyapi#1--intent-ayarlama
});

/* Configuration */
const settings = {
    token: "TOKEN", 
    prefixCommands: ["PREFIX", "PREFIX2"], // kullanılmayacaksa undefined yapın
    slashCommands: "", // global veya sunucuIDsi yazın - slash olmayacaksa undefined yapın
    mongoDB: undefined
}

/* Handlers */
import("./handler.js");
global.client = client;

/* Login */
client.login(settings.token)
    .then(() => console.log("[BOT] Bota giriş yapıldı!"))
    .catch(e => console.log("[BOT] Bota giriş yapılırken bir hata oluştu:\n" + e));

/* Export */
module.exports = settings;