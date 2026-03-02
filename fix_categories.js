const fs = require('fs');
const path = './zeketa_IMPORT_READY_VISIBILITY_FIXED.csv';
const outPath = './zeketa_CATEGORIES_FIXED.csv';

let content = fs.readFileSync(path, 'utf8');
let lines = content.split('\n');
let header = lines[0];
let result = [header];
let fixed = 0;

for (let i = 1; i < lines.length; i++) {
  let line = lines[i];
  if (!line.trim()) continue;

  let name = line.split(',')[4] || '';
  let hasGvarim = line.includes('גברים');
  let hasNashim = line.includes('נשים');

  let addCats = [];

  if ((name.includes('גופיי') || name.includes('גופייה')) && !line.includes('בגדים > גופייה')) {
    if (hasGvarim) addCats.push('גברים > בגדים > גופייה');
    if (hasNashim) addCats.push('נשים > בגדים > גופייה');
  }
  if (name.includes('חולצ') && !line.includes('בגדים > חולצות')) {
    if (hasGvarim) addCats.push('גברים > בגדים > חולצות');
    if (hasNashim) addCats.push('נשים > בגדים > חולצות');
  }
  if ((name.includes('קפוצ') || name.includes('סווטשירט')) && !line.includes('בגדים > hoodie')) {
    if (hasGvarim) addCats.push('גברים > בגדים > hoodie');
    if (hasNashim) addCats.push('נשים > בגדים > hoodie');
  }
  if (name.includes('מכנס') && !line.includes('בגדים > מכנסיים')) {
    if (hasGvarim) addCats.push('גברים > בגדים > מכנסיים');
    if (hasNashim) addCats.push('נשים > בגדים > מכנסיים');
  }

  if (addCats.length > 0) {
    let catMatch = line.match(/"גברים > בגדים.*?"/);
    if (catMatch) {
      let oldCat = catMatch[0];
      let newCat = oldCat.slice(0, -1) + ', ' + addCats.join(', ') + '"';
      line = line.replace(oldCat, newCat);
      fixed++;
    }
  }

  result.push(line);
}

fs.writeFileSync(outPath, result.join('\n'), 'utf8');
console.log('Done! Fixed ' + fixed + ' products');
console.log('Saved to: ' + outPath);
