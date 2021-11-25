export function updateTime (currentTime: Date, secondsEllapsed: number): Date {
  currentTime.setSeconds(currentTime.getSeconds() + secondsEllapsed)
  return currentTime
}
