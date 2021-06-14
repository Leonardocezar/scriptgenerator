const fs = require('fs')

function convertToPlain(rtf) {
  rtf = rtf.replace(/\\par[d]?/g, "");
  rtf = rtf.replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, "")
  rtf.replace(/\\'[0-9a-zA-Z]{2}/g, "").trim()
  const ar = rtf.split(/\n/);
  const title = ar[ar.length-2].replace(/[\\"]/g, '');
  const subtitle = ar[ar.length-1].replace(/[\\"]/g, '');
  return [`${title}`,`Material ${subtitle}`]

}
const a = fs.readFileSync('../../Downloads/2.2_dress/2.2_dress/bottom_area/2_above_knee/2_a_line/1_buttons/2_material/3_wooden/1_natural/Info.rtf')

const t = convertToPlain(a.toString('utf-8'))


console.log(t)
