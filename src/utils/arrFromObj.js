export default function arrFromObj (obj) {
  return Object.keys(obj).map(key => ({ ...obj[key], id: key }))
}
