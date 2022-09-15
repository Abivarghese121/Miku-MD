var song = await getSong(link[0]);
  ffmpeg(song)
 .save('./song.mp3')
 .on('end', async () => {
  var song = await addInfo('./song.mp3',title,BOT_INFO.split(";")[0],"audio downloader",await skbuffer(thumbnail))
  return await message.client.sendMessage(message.jid, {
      audio:song,
      mimetype: 'audio/mp4'
  }, {
      quoted: message.data
  });
});    
  }
  var myid = message.client.user.id.split("@")[0].split(":")[0]
  let sr = await searchYT(match[1]);
  sr = sr.videos;
  if (sr.length < 1) return await message.sendReply(Lang.NO_RESULT);
  var SongData = []
  for (var i in sr){
    SongData.push({
      title: sr[i].title,
      description: sr[i].artist,
      rowId: handler+"song https://youtu.be/" + sr[i].id
  })
  }
  const sections = [{
      title: Lang.MATCHING_SONGS,
      rows: SongData
  }];
  const listMessage = {
      text: "and "+(sr.length-1)+" more results..",
      footer: "user: " + message.data.pushName,
      title: sr[0].title,
      buttonText: "Select song",
      sections
  }
  await message.client.sendMessage(message.jid, listMessage,{quoted: message.data})
}));
Module({
  pattern: 'yts ?(.*)',
  fromMe: sourav,
  desc: "Select and download songs from yt (list)",
  use: 'search'
}, (async (message, match) => {
  if (!match[1]) return message.sendReply("*Need words*")
  var link = match[1].match(/\bhttps?:\/\/\S+/gi)
  if (link !== null && getID.test(link[0])) {
    var {
  info,
  thumbnail
} = await getJson("https://raganork-network.vercel.app/api/youtube/details?video_id=" +link[0].split("/")[3]);
const buttons = [
  {buttonId: handler+'video '+link[0], buttonText: {displayText: '𝗩𝗜𝗗𝗘𝗢'}, type: 1},
  {buttonId: handler+'song '+link[0], buttonText: {displayText: '𝗔𝗨𝗗𝗜𝗢'}, type: 1}
]
const buttonMessage = {
    image: {url: thumbnail},
    caption: info,
    footer: '',
    buttons: buttons,
    headerType: 4
}
return await message.client.sendMessage(message.jid, buttonMessage)
  }
  let sr = await searchYT(match[1]);
  sr = sr.videos;
  if (sr.length < 1) return await message.sendReply("*No results found!*");
  var videos = [];
  for (var index = 0; index < sr.length; index++) {
      videos.push({
          title: sr[index].title,
          description: sr[index].metadata.duration.accessibility_label,
          rowId: handler+"yts https://youtu.be/" + sr[index].id
      });
  }
  const sections = [{
      title: "YouTube search resulrs",
      rows: videos
  }]
  const listMessage = {
      text: "and " + (sr.length - 1) + " more results...",
      footer: "user: " + message.data.pushName,
      title: sr[0].title,
      buttonText: "Select a video",
      sections
  }
  await message.client.sendMessage(message.jid, listMessage,{quoted: message.data})
}));
