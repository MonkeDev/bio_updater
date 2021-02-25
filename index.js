const fetch = require('node-fetch'),
	config = require('./config.json'),
	getPrice = () => {
		return fetch('https://sochain.com/api/v2/get_price/DOGE/USD')
			.then(res => res.json())
			.then((json) => {
				return json.data.prices.find(x => x.price_base == 'USD').price;
			});
	},
	updateBio = (bio) => {
		fetch('https://api.github.com/user', {
			method: 'PATCH',
			headers: {
				Authorization: `token ${config.accesstoken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ bio: bio })
		});
	};

setInterval(async function() {
	const price = await getPrice(),
		bio = `Price of Dogecoin: $${price} USD\nAutomatically updates every 5 minutes`;
	await updateBio(bio);
}, 300000);