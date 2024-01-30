const fs = require("fs")

function setEnvValue(key, value) {
  const filePath = ".env"
  const fileContents = fs.readFileSync(filePath, "utf8")

  // Split the file contents into an array of lines
  const lines = fileContents.split(/\r?\n/)

  // Find the index of the line that starts with the key
  const targetLineIndex = lines.findIndex((line) => line.startsWith(`${key}=`))

  if (targetLineIndex !== -1) {
    // Replace the value of the target line with the new value
    lines[targetLineIndex] = `${key}=${value}`
  } else {
    // Append the new key/value pair to the end of the file
    lines.push(`${key}=${value}`)
  }

  // Write the modified contents back to the file
  fs.writeFileSync(filePath, lines.join("\n"))
}

module.exports = setEnvValue
