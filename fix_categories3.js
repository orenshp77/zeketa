const fs = require('fs');

const inputPath = './zeketa_IMPORT_READY_VISIBILITY_FIXED.csv';
const outputPath = './zeketa_FINAL.csv';

let content = fs.readFileSync(inputPath, 'utf8');
let lines = content.split('\n');
let result = [];
let stats = {גופייה: 0, חולצות: 0, hoodie: 0, מכנסיים: 0};

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  if (i === 0) {
    result.push(line);
    continue;
  }

  // Check product name for keywords
  let hasGufiya = /גופיי|גופייה/.test(line);
  let hasHulza = /חולצ/.test(line);
  let hasKapuchon = /קפוצ|סווטשירט/.test(line);
  let hasMichnas = /מכנס/.test(line);

  // Check if already has sub-category
  let hasGufiyaCat = /בגדים > גופייה/.test(line);
  let hasHulzaCat = /בגדים > חולצות/.test(line);
  let hasHoodieCat = /בגדים > hoodie/.test(line);
  let hasMichnasCat = /בגדים > מכנסיים/.test(line);

  let catsToAdd = [];

  if (hasGufiya && !hasGufiyaCat) {
    catsToAdd.push('גברים > בגדים > גופייה');
    catsToAdd.push('נשים > בגדים > גופייה');
    stats.גופייה++;
  }
  if (hasHulza && !hasHulzaCat) {
    catsToAdd.push('גברים > בגדים > חולצות');
    catsToAdd.push('נשים > בגדים > חולצות');
    stats.חולצות++;
  }
  if (hasKapuchon && !hasHoodieCat) {
    catsToAdd.push('גברים > בגדים > hoodie');
    catsToAdd.push('נשים > בגדים > hoodie');
    stats.hoodie++;
  }
  if (hasMichnas && !hasMichnasCat) {
    catsToAdd.push('גברים > בגדים > מכנסיים');
    catsToAdd.push('נשים > בגדים > מכנסיים');
    stats.מכנסיים++;
  }

  if (catsToAdd.length > 0) {
    // Find the categories field (contains "גברים > בגדים" or "נשים > בגדים")
    // and append our categories
    line = line.replace(/("(?:גברים|נשים) > בגדים[^"]*")/, (match) => {
      return match.slice(0, -1) + ', ' + catsToAdd.join(', ') + '"';
    });
  }

  result.push(line);
}

fs.writeFileSync(outputPath, result.join('\n'), 'utf8');
console.log('Stats:', stats);
console.log('Total fixed:', stats.גופייה + stats.חולצות + stats.hoodie + stats.מכנסיים);
console.log('Saved to: ' + outputPath);
