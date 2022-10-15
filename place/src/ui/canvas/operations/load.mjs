const register = (canvas, element) => {
  const name = 'load'

  const fn = (path, opts = {}) => {
    const image = new Image()
    image.onload = () => {
      const x = opts.x || element.width / 2 - image.width / 2
      const y = opts.y || element.height / 2 - image.height / 2
      element.getContext('2d').drawImage(image, x, y)
    }
    image.src = path
    console.log('canvas:load', { path })
  }

  return { name, fn }
}

export default register
