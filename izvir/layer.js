const layer = ({ name }) => {
  const element = document.createElement('canvas')
  
  element.width = window.innerWidth
  element.height = window.innerHeight
  element.style.width = '100%'
  element.style.height = '100%'
  element.style.position = 'absolute'
  element.style.top = 0
  element.style.left = 0

  document.body.appendChild(element)
  
  return {
    name,
    element,
    ctx: element.getContext('2d'),
    width: element.width,
    height: element.height
  }
}
