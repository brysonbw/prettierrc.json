#!/usr/bin/env node
import inquirer from 'inquirer';
import chalkAnimation from 'chalk-animation';
import gradient from 'gradient-string';
import chalk from 'chalk';
import { writeFile } from "fs/promises";


// delay welcome text
const delay = (ms = 1100) => new Promise((r) => setTimeout(r, ms));


(async () => {    
  // package title display
    const title = chalkAnimation.rainbow(
      'prettierrc.json'
    );
    // init delay function
   await delay();
    title.stop();

    // sub title/message display
    console.log(`
    ${chalk.bgBlue('Hello, friend!')} 
    Let\'s start creating your .prettierrc.json!
    First, we need to know a few things...
  `);

  // question/prompts
  const answers = await inquirer
  .prompt([
    {
      type: 'list',
      name: 'trailingComma',
      message: 'Should trailing commas be placed wherever possible in multi-line comma-separated syntactic structures?',
      prefix: 'es5: trailing commas where valid in ES5 (objects, arrays, etc.',
      choices: ['es5', 'all', 'none'],
    },
    {
        type: 'list',
        name: "tabWidth",
        message: "What should be the tab width?",
        choices: [2, 4],
    },
    {
      type: 'list',
      name: "semi",
      message: "Should semicolons be added at the end of statements?",
      choices: ['true', 'false'] 
    },
    {
      type: 'list',
      name: 'singleQuote',
      message: "Should single quotes be used?",
      choices: ['true', 'false'] 
    }
  ])

  const configObj = {
    trailingComma: answers.trailingComma,
    tabWidth: JSON.parse(answers.tabWidth),
    semi: JSON.parse(answers.semi),
    singleQuote: JSON.parse(answers.singleQuote)
  }

  await writeFile('.prettierrc.json', JSON.stringify(configObj, null, 2))
  await writeFile('.prettierignore', 'node_modules\ndist/\nbuild\n\ncoverage\ntest', 'utf-8')
  .then(() => {
    console.log(gradient.pastel('.prettierrc.json created successfully!'))
    })
    .catch(error => {
      console.log(error);
      process.exit(1);
    });
  
})();

 