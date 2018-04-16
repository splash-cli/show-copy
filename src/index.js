'use strict';

import parseExif from '@splash-cli/parse-exif';
import printBlock from '@splash-cli/print-block';
import chalk from 'chalk';
import uFormatter from '@splash-cli/unit-formatter';

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