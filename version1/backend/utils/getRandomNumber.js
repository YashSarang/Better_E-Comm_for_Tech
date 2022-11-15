
const numbers =
	"0123456789";

function getRandomNumber(length) {
	let result = "";
	const charactersLength = numbers.length;
	for (let i = 0; i < length; i++) {
		result += numbers.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}

module.exports = getRandomNumber;
