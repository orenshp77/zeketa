const fs = require('fs');

const inputPath = './zeketa_IMPORT_READY_VISIBILITY_FIXED.csv';
const outputPath = './zeketa_CATEGORIES_FIXED_v2.csv';

let content = fs.readFileSync(inputPath, 'utf8');
let fixed = 0;

// Fix products with גופיי in name - add גופייה category
content = content.replace(/^([^,]*,[^,]*,[^,]*,[^,]*,([^,]*גופיי[^,]*),.*?)(\"גברים > בגדים)([^"]*)(\")/gm, (match, before, name, catStart, catMiddle, catEnd) => {
  if (!catMiddle.includes('גופייה')) {
    fixed++;
    return before + catStart + catMiddle + ', גברים > בגדים > גופייה, נשים > בגדים > גופייה' + catEnd;
  }
  return match;
});

// Fix products with חולצ in name - add חולצות category
content = content.replace(/^([^,]*,[^,]*,[^,]*,[^,]*,([^,]*חולצ[^,]*),.*?)(\"גברים > בגדים)([^"]*)(\")/gm, (match, before, name, catStart, catMiddle, catEnd) => {
  if (!catMiddle.includes('חולצות')) {
    fixed++;
    return before + catStart + catMiddle + ', גברים > בגדים > חולצות, נשים > בגדים > חולצות' + catEnd;
  }
  return match;
});

// Fix products with קפוצ or סווטשירט in name - add hoodie category
content = content.replace(/^([^,]*,[^,]*,[^,]*,[^,]*,([^,]*(קפוצ|סווטשירט)[^,]*),.*?)(\"גברים > בגדים)([^"]*)(\")/gm, (match, before, name, x, catStart, catMiddle, catEnd) => {
  if (!catMiddle.includes('hoodie')) {
    fixed++;
    return before + catStart + catMiddle + ', גברים > בגדים > hoodie, נשים > בגדים > hoodie' + catEnd;
  }
  return match;
});

// Fix products with מכנס in name - add מכנסיים category
content = content.replace(/^([^,]*,[^,]*,[^,]*,[^,]*,([^,]*מכנס[^,]*),.*?)(\"גברים > בגדים)([^"]*)(\")/gm, (match, before, name, catStart, catMiddle, catEnd) => {
  if (!catMiddle.includes('מכנסיים')) {
    fixed++;
    return before + catStart + catMiddle + ', גברים > בגדים > מכנסיים, נשים > בגדים > מכנסיים' + catEnd;
  }
  return match;
});

fs.writeFileSync(outputPath, content, 'utf8');
console.log('Fixed approximately ' + fixed + ' products');
console.log('Saved to: ' + outputPath);
