'use strict';

const parseExif = require('@splash-cli/parse-exif');
const printBlock = require('@splash-cli/print-block');
const chalk = require('chalk');

function uFormatter(num) {
	if (num > 999999999) {
		if (num % 1000000000 === 0) {
			return (num / 1000000000) + 'B';
		}
		return (num / 1000000000).toFixed(1) + 'B';
	}

	if (num > 999999) {
		if (num % 1000000 === 0) {
			return (num / 1000000) + 'M';
		}
		return (num / 1000000).toFixed(1) + 'M';
	}

	if (num > 999) {
		if (num % 1000 === 0) {
			return (num / 1000) + 'K';
		}
		return (num / 1000).toFixed(1) + 'K';
	}

	return num;
};

const showCopy = (data, info) => {
	const user = data.user;

	// Get photos infos
	if (info) {
		const exif = parseExif(data);
		
		if (exif) {
			printBlock(chalk`{bold EXIF DATA:}`);
		}

		exif.forEach(item => {
			console.log(chalk`{bold {yellow ${item.name.toUpperCase()}}}: ${item.value}`);
		});
	}

	if (!info && data.description) {
		printBlock(chalk.dim(`> ${data.description}`));
	} else if (!info && !data.description) {
		printBlock(chalk.dim(`> No description available.`));
	} else if (info && data.description) {
		console.log();
		console.log(chalk.dim(`> ${data.description}`));
		console.log();
	} else {
		console.log();
		console.log(chalk.dim(`> No description available.`));
		console.log();
	}

	console.log(`Downloaded: ${uFormatter(data.downloads)} times.`);
	console.log(`Viewed: ${uFormatter(data.views)} times.`);
	console.log(`Liked by ${uFormatter(data.likes)} users.`);

	console.log();

	console.log(`Shot by: ${chalk.cyan.bold(user.name)} (@${chalk.yellow(user.username)})`);
	console.log();
};


module.exports = showCopy;