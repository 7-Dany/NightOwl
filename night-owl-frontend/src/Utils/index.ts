export const convertRegionToUTC = (timeZone: string) => {
  return (new Date()).toLocaleString('en-US', {
    timeZone,
    timeZoneName: 'shortOffset'
  }).split(' ').slice(-1)[0].replace(/^GMT/, 'UTC')
}