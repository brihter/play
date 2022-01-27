// note
// for 0.5px offsets see http://diveintohtml5.info/canvas.html

const text = {}

text.print = (layer, cfg) => {
  let { ctx } = layer
  ctx = Object.assign(ctx, cfg)

  ctx.fillText(cfg.text, cfg.x, cfg.y)

  return layer
}
