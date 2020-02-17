import {
  GpioMapping,
  LedMatrix,
  LedMatrixUtils,
  MatrixOptions,
  PixelMapperType,
  RuntimeOptions,
} from 'rpi-led-matrix';

import { Pac } from './pac';


export const matrixOptions: MatrixOptions = {
  ...LedMatrix.defaultMatrixOptions(),
  rows: 16,
  cols: 32,
  chainLength: 4,
  brightness: 20,
  rowAddressType: 2,
  multiplexing: 3,
  hardwareMapping: GpioMapping.Regular,
  pwmLsbNanoseconds: 1500,
  pixelMapperConfig: LedMatrixUtils.encodeMappers(
    { type: PixelMapperType.Rotate, angle: 180 }
  )
};

export const runtimeOptions: RuntimeOptions = {
  ...LedMatrix.defaultRuntimeOptions(),
  gpioSlowdown: 2
};


let f = Pac.field.replace(/\n|\r/g, "");
let o = [...f].map((char) => { Pac.colors[char]});


const wait = (t: number) => new Promise(ok => setTimeout(ok, t));

(async () => {
  try {
    const matrix = new LedMatrix(matrixOptions, runtimeOptions);

    matrix
      .clear()
      .brightness(100);

    o.forEach((c, i) => {
      matrix.fgColor(c)
        .setPixel(i % 128, Math.floor(i / 128))


    });

    matrix.sync();

    await wait(999999999);
  }
  catch (error) {
    console.error(`${__filename} caught: `, error);
  }
})();







// matrix
// .clear()            // clear the display
// .brightness(100)    // set the panel brightness to 100%
// .fgColor(0x0000FF)  // set the active color to blue
// .fill()             // color the entire diplay blue
// .fgColor(0xFFFF00)  // set the active color to yellow
// // draw a yellow circle around the display
// .drawCircle(matrix.width() / 2, matrix.height() / 2, matrix.width() / 2 - 1)
// // draw a yellow rectangle
// .drawRect(matrix.width() / 4, matrix.height() / 4, matrix.width() / 2, matrix.height() / 2)
// // sets the active color to red
// .fgColor({ r: 255, g: 0, b: 0 })
// // draw two diagonal red lines connecting the corners
// .drawLine(0, 0, matrix.width(), matrix.height())
// .drawLine(matrix.width() - 1, 0, 0, matrix.height() - 1);