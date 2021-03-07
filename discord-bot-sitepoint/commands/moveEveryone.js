module.exports = {
  name: '!me',
  description: 'move everyone in the senders channel to the target channel',
  async execute(msg, args) {
    const targetArray = msg.content.split(' ');
    targetArray.shift();
    const targetName = targetArray.join(' ');
    // const channels = msg.guild.channels.filter((ch) => {
    //   return ch.type === 'voice';
    // });
    const target = await msg.guild.channels.find((ch) => {
      if (ch.type === 'voice') {
        return (
          ch.name.toLowerCase() === targetName.toLowerCase() || ch.name.toLowerCase().includes(targetName.toLowerCase())
        );
      }
      return false;
    });
    if (!target) {
      return msg.reply(`cant find a channel called or contains the name  ${targetName}`);
    }
    console.log(msg.member.voiceChannel.id);
    await msg.member.voiceChannel.members.forEach(async (m) => {
      await m.setVoiceChannel(target.id);
      console.info(`${m.user.username}  was moved to ${target.name}`);
      msg.channel.send(`${m.nickname ? m.nickname : m.user.username}  was moved to ${target.name}`);
    });
  },
};
