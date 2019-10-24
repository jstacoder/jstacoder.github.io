const data = require('./data.json')

const getName = ({ name, entries }, parent = '.') => {
  const fullName = `${!!parent ? `${parent}/` : ''}${name}`
  if (!!entries) {
    return entries.map(entry => getName(entry, fullName)).concat([fullName])
  }
  return [fullName]
}

console.log(getName(data))
