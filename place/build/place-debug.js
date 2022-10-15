(() => {
  // src/ui/canvas/operations/translate.mjs
  var register = (canvas, element) => {
    canvas._translate = {
      x: 0,
      y: 0
    };
    const name = "translate";
    const fn = (x, y) => {
      canvas._translate.x = x;
      canvas._translate.y = y;
      element.style.translate = `${x}px ${y}px`;
      console.log("canvas:translate", { x, y });
    };
    return { name, fn };
  };
  var translate_default = register;

  // src/ui/canvas/operations/center.mjs
  var register2 = (canvas, element) => {
    const name = "center";
    const fn = () => {
      const x = (canvas._render.vw - element.width) / 2;
      const y = (canvas._render.vh - element.height) / 2;
      canvas.translate(x, y);
      console.log("canvas:center", { x, y });
    };
    return { name, fn };
  };
  var center_default = register2;

  // src/ui/canvas/operations/load.mjs
  var register3 = (canvas, element) => {
    const name = "load";
    const fn = (path, opts = {}) => {
      const image = new Image();
      image.onload = () => {
        const x = opts.x || element.width / 2 - image.width / 2;
        const y = opts.y || element.height / 2 - image.height / 2;
        element.getContext("2d").drawImage(image, x, y);
      };
      image.src = path;
      console.log("canvas:load", { path });
    };
    return { name, fn };
  };
  var load_default = register3;

  // src/ui/canvas/operations/scale.mjs
  var register4 = (canvas, element) => {
    canvas._scale = {
      scale: 1,
      min: 0.2,
      max: 20
    };
    const name = "scale";
    const fn = (scale) => {
      canvas._scale.scale = scale;
      element.style.transform = `scale(${scale})`;
      console.log("canvas:scale", { scale });
    };
    return { name, fn };
  };
  var scale_default = register4;

  // src/ui/canvas/operations/index.mjs
  var operations_default = [translate_default, center_default, load_default, scale_default];

  // src/ui/canvas/handlers/drag.mjs
  var handler = (canvas, element) => {
    canvas._drag = {
      active: false
    };
    const handleDrag = ({ enable }) => {
      canvas._drag.active = enable;
      if (enable) {
        window.addEventListener("mousemove", onMouseMove);
      } else {
        window.removeEventListener("mousemove", onMouseMove);
      }
    };
    const onMouseDown = () => handleDrag({
      enable: true
    });
    const onMouseUp = () => handleDrag({
      enable: false
    });
    const onMouseMove = (e) => {
      e.preventDefault();
      if (!canvas._drag.active) {
        return;
      }
      console.log("canvas.handler.drag:onDrag");
      const dx = canvas._translate.x + e.movementX;
      const dy = canvas._translate.y + e.movementY;
      canvas.translate(dx, dy);
    };
    element.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    console.log("canvas.handler.drag:registered");
  };
  var drag_default = handler;

  // src/ui/canvas/handlers/scale.mjs
  var handler2 = (canvas, element) => {
    const getScale = (e) => {
      const getDelta = (e2) => Math.sign(e2.deltaY) * -1;
      const getFactor = () => {
        let factor2 = 4;
        if (canvas._scale.scale >= 2 && canvas._scale.scale < 4)
          factor2 = 2;
        if (canvas._scale.scale >= 4 && canvas._scale.scale < 8)
          factor2 = 1;
        if (canvas._scale.scale > 8 && canvas._scale.scale < 16)
          factor2 = 0.5;
        if (canvas._scale.scale > 16)
          factor2 = 0.25;
        return factor2;
      };
      const delta = getDelta(e);
      const factor = getFactor();
      let scale = parseFloat((canvas._scale.scale + delta / factor).toFixed(2));
      if (scale > canvas._scale.max)
        scale = canvas._scale.max;
      if (scale < canvas._scale.min)
        scale = canvas._scale.min;
      return scale;
    };
    const onWheel = (e) => {
      console.log("canvas.handler.scale:onWheel");
      const scale = getScale(e);
      canvas.scale(scale);
    };
    window.addEventListener("wheel", onWheel);
    console.log("canvas.handler.scale:registered");
  };
  var scale_default2 = handler2;

  // src/ui/canvas/handlers/resize.mjs
  var handler3 = (canvas, element) => {
    const onResize = () => {
      console.log("canvas.handler.resize:onResize");
      canvas.afterRender();
      canvas.center();
    };
    window.addEventListener("resize", onResize);
    console.log("canvas.handler.resize:registered");
  };
  var resize_default = handler3;

  // src/ui/canvas/handlers/index.mjs
  var handlers_default = [drag_default, scale_default2, resize_default];

  // src/ui/canvas/constraints/snap.mjs
  var register5 = (canvas, canvasElement) => {
    const snap = () => {
      let { x, y } = canvas._translate;
      const { centerX, centerY } = canvas._render;
      const { top, bottom, left, right } = canvasElement.getBoundingClientRect();
      if (right < centerX)
        x = x + (centerX - right);
      if (left > centerX)
        x = x - (left - centerX);
      if (bottom < centerY)
        y = y + (centerY - bottom);
      if (top > centerY)
        y = y - (top - centerY);
      translateFn(x, y);
    };
    const translateFn = canvas.translate;
    canvas.translate = (x, y) => {
      translateFn(x, y);
      snap();
    };
    const scaleFn = canvas.scale;
    canvas.scale = (scale) => {
      scaleFn(scale);
      snap();
    };
  };
  var snap_default = register5;

  // src/ui/canvas/constraints/index.mjs
  var constraints_default = [snap_default];

  // src/ui/canvas/canvas.mjs
  var Canvas = class {
    _render = {
      vw: 0,
      vh: 0,
      centerX: 0,
      centerY: 0
    };
    constructor(cfg = {}) {
      const canvas = this.render(cfg);
      this.registerOperations(canvas);
      this.registerHandlers(canvas);
      this.registerConstraints(canvas);
    }
    render(cfg) {
      const canvas = document.createElement("canvas");
      canvas.width = cfg.width;
      canvas.height = cfg.height;
      const target = document.querySelector(cfg.renderTo);
      target.appendChild(canvas);
      this.afterRender();
      return canvas;
    }
    afterRender() {
      const round = (value) => parseInt(value.toFixed(0));
      this._render.vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      this._render.vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
      this._render.centerX = round(this._render.vw / 2);
      this._render.centerY = round(this._render.vh / 2);
    }
    registerOperations(canvas) {
      operations_default.reduce((cls, registerFn) => {
        const { name, fn } = registerFn(this, canvas);
        cls[name] = fn;
        return cls;
      }, this);
    }
    registerHandlers(canvas) {
      handlers_default.forEach((handler4) => handler4(this, canvas));
    }
    registerConstraints(canvas) {
      constraints_default.forEach((interceptor) => interceptor(this, canvas));
    }
  };

  // src/ui/index.mjs
  var ui_default = {
    Canvas
  };

  // src/index.mjs
  window.Place = {
    ui: ui_default
  };
})();
