const memeEmbed = {
	content: "FortheMemelord",
	tts: false,
	components: [
		{
			type: 1,
			components: [
				{
					custom_id: "row_0_select_0",
					placeholder: "Selectameme",
					options: [
						{
							label: "meme1",
							value: "https: //i.imgflip.com/5k4wae.jpg",
							default: false
						},
						{
							label: "meme2",
							value: "https: //i.imgflip.com/5k4x2t.jpg",
							default: false
						}
					],
					min_values: 1,
					max_values: 1,
					type: 3
				}
			]
		}
	],
	embeds: [
		{
			type: "rich",
			title: "Selectyourmeme",
			description: "Memesreturnedfromsearch",
			color: "0xdd00ff",
			fields: [
				{
					name: "meme1",
					value: "https: //i.imgflip.com/5k4wae.jpg"
				},
				{
					name: "meme2",
					value: "https: //i.imgflip.com/5k4x2t.jpg"
				}
			],
			image: {
				url: "https: //i.imgflip.com/5k4x2t.jpg",
				height: 0,
				width: 0
			}
		}
	]
}
