(() => {
  let sparks = layer({ name: 'sparks' })

  const spark = (layer) => {
    function rnd(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    }
  
    const padding = STEP
    
    let rndX = rnd(padding, window.innerWidth-padding)
    let rndY = rnd(padding, window.innerHeight-padding)
    
    const x = rndX - (rndX%STEP) + 1
    const y = rndY - (rndY%STEP) + 1
  
    shape.rectangle(layer, { x, y, width: STEP-1, height: STEP-1, fillStyle: 'rgba(255,255,255,0.5)' })
  
    return layer
  }
  
  const makeSparks = (layer) => {
    for (let i=0; i<400; ++i) {
      layer = spark(layer)
    }
  
    return layer
  }
  
  sparks = makeSparks(sparks)
})
