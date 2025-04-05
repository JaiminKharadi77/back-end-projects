import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      message: "Type in your URL: ", // will ask the question
      name: "URL", // stored in the object value named "URL" or naming the object
    },
  ])
  .then((answers) => {
    const url = answers.URL; // accessing the url which user has typed

    var qr_svg = qr.image(url); // qr function running make into qr-image of the website mentioned
    qr_svg.pipe(fs.createWriteStream(`qr_code.png`)); // create and saving the file 

    fs.writeFile("URL2.txt", url, (err) => { // creating the textfile
      if (err) throw err;
      console.log("File has been saved");
    });
  })

  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
