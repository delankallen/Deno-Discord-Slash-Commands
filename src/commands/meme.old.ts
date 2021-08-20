// import cheerio from "https://esm.sh/cheerio";

// interface Meme {
//   id: string;
//   name: string;
//   url: string;
//   width: number;
//   height: number;
//   box_count: number;
// }

// interface CaptionedMeme {
//   url: string;
//   pageUrl: string;
// }

// const API_BASE_URL = "https://api.imgflip.com";
// const GET_MEMES = `${API_BASE_URL}/get_memes`;

// const BASE_URL = "https://imgflip.com";

// const imgFlipApi = {
//   getMemes: async () => {
//     const memesJson = await ("https://api.imgflip.com/get_memes");
//     let popMemes: Array<Meme> = memesJson.data.memes;
//     return popMemes;
//   },

//   searchPopular: async (memeName: string) => {
//     const memesJson = await getJSON("https://api.imgflip.com/get_memes");
//     let memeRes: Array<Meme> = memesJson.data.memes;
//     let popMemes: Array<Meme> = memeRes.filter((meme) =>
//       meme.name.toLowerCase().includes(`${memeName.toLowerCase()}`)
//     );
//     return popMemes;
//   },

//   getFeaturedMemeInfo: async (url: string | undefined) => {
//     const imgflipUrl = "https://imgflip.com";
//     let memes: Meme = Object();
//     if (!url) {
//       throw new Error();
//     }

//     const get = bent(imgflipUrl, "GET", "string", 200);
//     const response: string = await get(url);
//     const $ = cheerio.load(response.toString());

//     memes.id = $("#mtm-info p:first-of-type").text().replace(
//       "Template ID: ",
//       "",
//     );
//     memes.url = imgflipUrl + $("#mtm-img").attr("src");
//     return memes;
//   },

//   searchSite: async (searchString: string) => {
//     const url = "https://imgflip.com/memesearch?q=";
//     const regexp = new RegExp("(?<=memetemplate/).+?(?=/)", "m");
//     const get = bent(url, "GET", "string", 200);
//     const response: string = await get(searchString);
//     const $ = cheerio.load(response.toString());
//     let memes: Array<Meme> = [];
//     if ($("#meme-divide").length > 0) {
//       let memeUrls: Array<string> = [];
//       $('h3 a[href^="/meme/"]').each(async (_, ele) => {
//         const urlMeme = $(ele).attr("href")?.replace(
//           "/meme/",
//           "/memetemplate/",
//         );
//         if (!urlMeme) {
//           throw new Error("no featured me-mes");
//         }
//         memeUrls.push(urlMeme);
//       });
//       const result = await Promise.all(
//         memeUrls.map(async (memeUrl) =>
//           await imgFlipApi.getFeaturedMemeInfo(memeUrl)
//         ),
//       );
//       return result;
//     } else {
//       let memememe = $('div.mt-img-wrap a[href^="/memetemplate/"]').get();
//       for (let i = 0; i < 6; i++) {
//         if (i === memememe.length) {
//           return memes;
//         }
//         const ele = memememe[i];
//         let newMeme: Meme = Object();
//         let id = $(ele).attr("href")?.match(regexp);
//         if (!id) {
//           throw new Error("no me-mes in the me-mes");
//         }
//         newMeme.id = id[0];

//         let imgUrl = $(ele).find("img").attr("src");
//         if (!imgUrl) {
//           throw new Error("no me-mes pictures");
//         }

//         newMeme.url = "http:" + imgUrl;
//         memes.push(newMeme);
//       }
//       return memes;
//     }
//   },

//   search: async (searchString: string) => {
//     searchString = encodeURIComponent(searchString);
//     let memes = await imgFlipApi.searchPopular(searchString);
//     if (memes.length === 0) {
//       memes = await imgFlipApi.searchSite(searchString);
//     }

//     return memes;
//   },

//   buildUrlString: (templateId: string, captions: Array<string>) => {
//     const idString = `template_id=${templateId}`;
//     const usernamePass = `&username=memelordceo&password=!:hPBI,fPUY4TklU$Pm1`;
//     let formatCaptions = "";
//     for (let i = 0; i < captions.length; i++) {
//       const caption = captions[i];
//       formatCaptions += `&boxes[${i}][text]=${caption}`;
//     }
//     return idString + usernamePass + formatCaptions;
//   },

//   captionMeme: async (templateId: string, captions: Array<string>) => {
//     captions = captions.map(encodeURIComponent);
//     const post = bent(
//       "https://api.imgflip.com/caption_image?",
//       "POST",
//       "json",
//       200,
//     );
//     const response = await post(
//       imgFlipApi.buildUrlString(templateId, captions),
//     );
//     let completeMeme: CaptionedMeme = response.data;
//     return completeMeme;
//   },
// };

// export const memeCommand = createTextCommand("meme", {
//   async execute(message: Discord.Message, args) {
//     const { _: captions, s: searchTerm } = parseArgs(args, { s: "" });

//     if (args.length === 0) {
//       return message.channel.send(`Usage: \`${memeCommand.usage}\``);
//     }

//     try {
//       if (!searchTerm) {
//         let [memeId] = captions.splice(0, 1);
//         if (captions.length === 0) {
//           // Produce an image with no captions
//           captions.push(" ", " ");
//         }

//         const captionedMeme = await imgFlipApi.captionMeme(memeId, captions);
//         if (!captionedMeme || !captionedMeme.url) {
//           return message.channel.send(
//             `Could not find a meme with an ID of ${memeId}`,
//           );
//         }
//         return message.channel.send(`${captionedMeme.url}\n`);
//       } else {
//         const memes = await imgFlipApi.search(searchTerm);
//         if (captions.length > 0) {
//           const captionedMeme = await imgFlipApi.captionMeme(
//             memes[0].id,
//             captions,
//           );
//           return message.channel.send(`${captionedMeme.url}\n`);
//         } else if (memes.length) {
//           const response = memes.reduce(
//             (acc, meme) => `${acc}${meme.id} : ${meme.url}\n`,
//             "",
//           );
//           return message.channel.send(response);
//         } else {
//           return message.channel.send("Could not find any memes");
//         }
//       }
//     } catch (error) {
//       return message.channel.send(error);
//     }
//   },
// });
