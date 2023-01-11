#!/usr/bin/env node
import chalk from 'chalk'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'
import { createSpinner } from 'nanospinner'

let playername
const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms))

async function welcome() {
	const rainowTitle = chalkAnimation.rainbow(
		`Who Wants To e A JavaScript Millionaire ?`
	)
	await sleep()
	rainowTitle.stop()

	console.log(`${chalk.bgBlue('HOW TO PLAY')}
    I am a process on your computer.
    If you get any questions wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...
    `)
}
async function askName() {
	const answers = await inquirer.prompt({
		name: 'player_name',
		type: 'input',
		message: 'What is your name?',
		default() {
			return 'Player'
		},
	})
	playername = answers.player_name
}

async function question1() {
	const answers = await inquirer.prompt({
		name: 'question_1',
		type: 'list',
		message: 'JavaScript was created  in 10 days then releases on \n',
		choices: [
			'May 23rd, 1995',
			'Nov 24th, 1995',
			'Dec 4th, 1995',
			'Dec 17th, 1995',
		],
	})

	return handleAnswer(answers.question_1 == 'Dec 4th, 1995')
}

async function handleAnswer(isCorrect) {
	const spinner = createSpinner('Checking answer...').start()
	await sleep()

	if (isCorrect) {
		spinner.success({ text: `Nice work ${playername}` })
		winner()
		await sleep(1000)
		process.exit(0)
	} else {
		spinner.error({
			text: ` ☠️ ☠️ ☠️  Game Over, you loose ${playername}!`,
		})
		await sleep(1000)
		process.exit(1)
	}
}

function winner() {
	console.clear()
	const msg = `Congrats , ${playername} ! \n $1,000,000`
	figlet(msg, (err, data) => {
		console.log(gradient.pastel.multiline(data))
	})
}

await welcome()
await askName()
await question1()
