**DiscordJS v14 ile yapılmış gelişmiş, boş discord bot altyapısı. Sıfırdan yazılmıştır. Özellikle notlar kısmına dikkat edip, projede halihazırda bulunan örnekler ile basit bir şekilde kurabilirsiniz.**

## 📌 Özellikler
- [x] Gelişmiş
- [X] Kullanımı Kolay
- [X] Anlaşılır, Basit, Değişime Açık Kod
- [X] İsteğe Bağlı Konfigüre Edilebilme

## 📜 İçerik
- [X] Prefix, Slash ve Context Menü Komutları **(isteğe bağlı)**
- [X] Command, Event ve Interaction Handler 
- [X] Buton/Modal/SelectMenu Handler
- [X] MongoDB & Mongoose Handler **(isteğe bağlı)**
- [X] Komutlara Cooldown Ekleme
- [X] "Bunu mu demek istediniz?" Sistemi

## 🔒 Gereksinimler & Kullanılan Modüller
- NPM 
- NodeJS
- DiscordJS v14
- string-similarity
- Mongoose (isteğe bağlı)

## ❔ Kurulum & Çalıştırma & Notlar
### Kurulum
```bash
git clone https://github.com/yourfriendF/djsv14-gelismis-altyapi

cd djsv14-gelismis-altyapi

npm install
```
---
### Dosyaları Düzenleme, Botu Ayarlama ve Önemli Notlar
#### 1- Intent Ayarlama
app.js dosyasında 4. satırda bulunan `intents:` kısmını botunuzun amacına göre düzeltin. Bunun için herhangi bir [intent hesaplama makinesi](https://discord-intents-calculator.vercel.app/) kullanılabilir.

---
#### 2- Tokeni Ayarlama
app.js dosyasında bulunan 9. satırdaki `token:` kısmına botunuzun tokenini **tırnakların arasına** yazın. Botunuzun tokenini [discord developer portaldan](https://discord.com/developers/applications) bulabilirsiniz

---
#### 3- Prefixli Komutlar
Komutlarım aynı zamanda prefix ile de çalışsın diyorsanız 10. satırdaki `prefixCommands:` bölümünü
```js
prefixCommands: ["PREFIX1", "PREFIX2"],
```
şeklinde düzenleyin. İstediğiniz kadar prefix kullanabilirsiniz. Prefixleri virgülle ayırın. Komutlarınızın çalışabilmesi için her komut dosyasında
```js
async executePrefix(client, message, args){
    // kodlar...
},
```
fonksiyonunu düzenleyin.

---
#### 4- Prefixsiz Komutlar
Eğer ki prefixli komut olmasın ben sadece slash komut kullanacağım derseniz `prefixCommands:` bölümünü
```js
prefixCommands: undefined,
```
şeklinde düzenleyin. Yer işgal etmemesi ve göze güzel gelmesi için her komut dosyasında bulunan 
```js
async executePrefix(client, message, args){
    // kodlar...
},
```
fonksiyonunu kaldırabilirsiniz. Ayrıca `events/commandHandler.js` dosyasını da silebilirsiniz.

---
#### 5- Global Slash Komutlar
Komutlarım aynı zamanda eğik çizgi ile botun bulunduğu tüm sunucularda çalışsın diyorsanız 10. satırdaki `slashCommands:` bölümünü
```js
slashCommands: "global",
```
şeklinde düzenleyin.

Komutlarınızın çalışabilmesi için her komut dosyasında
```js
async executeSlash(interaction){
    // kodlar...
},
```
fonksiyonunu düzenleyin.

---
#### 6- Sunucuya Özel Slash Komutlar
Komutlarım aynı zamanda eğik çizgi ile botun bulunduğu sadece bir sunucuda çalışsın diyorsanız 10. satırdaki `slashCommands:` bölümünü
```js
slashCommands: "sunucuID",
```
şeklinde düzenleyin.

Komutlarınızın çalışabilmesi için her komut dosyasında
```js
async executeSlash(interaction){
    // kodlar...
},
```
fonksiyonunu düzenleyin.

---
#### 7- Slash Komutları Kaldırma
Komutlarım eğik çizgi ile çalışmasın diyorsanız 10. satırdaki `slashCommands:` bölümünü
```js
slashCommands: undefined,
```
şeklinde düzenleyin.

Yer işgal etmemesi ve göze güzel gelmesi için her komut dosyasında bulunan
```js
async executeSlash(interaction){
    // kodlar...
},
```
```js
data: {
    slash: new SlashCommandBuilder(), // bunu kaldırın
},
```
fonksiyonlarını kaldırabilirsiniz. Ayrıca hiçbir interaction ile uğraşmak istemiyorsanız `events/interactionHandler.js` dosyasını silebilirsiniz.

```
NOT: Önceden slash komutlu kullanıp sonradan fikrinizi değiştirirseniz sunucularda bulunan komutlar kalmaya devam edecektir. Bunun için botu sunucudan atıp tekrar almanız yeterli olur.
```
---
#### 8- Context Menu & Sağ Tık Komutları
Komutlarım aynı zamanda kullanıcıya veya mesaja sağ tıkladığımda gözüksün oradan da çalıştırayım derseniz her komut dosyasında bulunan `data:` kısmına
```js
// Kullanıcıya Sağ Tık
contextMenu: new ContextMenuCommandBuilder().setType(ApplicationCommandType.User) 

// Mesaja Sağ Tık
contextMenu: new ContextMenuCommandBuilder().setType(ApplicationCommandType.Message) 
```
fonksiyonunu ekleyebilirsiniz.

---
#### 9- Modal & Button & SelectMenu Handler
Modal / Buton / Seçim menüsü gibi mesaj componentlerini algılayabilmek için böyle bir sistem yaptım. Mesela butona basıldığında `interactions/buttons` klasöründe bulunan o butonIdsine sahip dosya çağırılacaktır. Her interaction için klasörlerinde birer örnek vardır. Aşağıda ise ping butonuna basıldığında konsola `yourfriend` yazdıran bir örnek vardır:

```js
// commands/user/test.js dosyası
async executeSlash(interaction) {
  const button = new ButtonBuilder()
    .setLabel("yourfriend")
    .setCustomId("test-butonu")
    .setStyle(ButtonStyle.Primary)

  const actionRow = new ActionRowBuilder()
    .addComponents(button)

  interaction.reply({ ephemeral: true, components: [actionRow] });
}

// interactions/buttons/test-butonu.js dosyası
module.exports =  {
  data: {
    name: "Konsola yazdıran buton",
    buttonId: "test-butonu"
  },

  async execute(interaction) {
        console.log("yourfriend");
  }
};
```
---
#### 10- Yetkiler Hakkında Bilgilendirme
Hem slash komutlar için hem de prefixli komutlar için bir yetki kontrolü yapmak çok zor olduğundan yetki & kanal sınırlandırmalarını if/else ile kendiniz kodlara yerleştireceksiniz. Slash komutlar için ise elle ayarlayın veya `SlashCommandBuilder().setDefaultMemberPermissions()` fonksiyonunu kullanın.

---
### Çalıştırma
Botu başlatmak için `node app.js` kullanabilirsiniz.

---
## ✉️ Destek 
Sadece kodda oluşan hatalar hakkında bana ulaşmak için [yourfriend#6889](https://discord.com/users/573531359843319856) yazabilirsiniz.
Diğer hatalar & istekler için [CodAre discord sunucusundan](https://discord.gg/codare) yardım alabilirsin.

## 🔗 Lisans
Bu proje [MIT Lisansı](https://api.github.com/licenses/mit) ile lisanslanmıştır.
