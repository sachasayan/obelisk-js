import {
  Font
} from 'rpi-led-matrix';

let matrix: any;

function displayGameScreen(){
   matrix
    .fgColor(0x333333)
    .drawText(String("Test message."), matrix.width()/2 + 2, 0);
}

function init (m){
    matrix = m;
    matrix.clear();

    matrix.afterSync((mat, dt, t) => {
      matrix.clear();


      (async () => {
      displayGameScreen();
      })

      setTimeout(() => matrix.sync(), 0);
    });

    (async () => {
      const font = new Font('helvR12', `${process.cwd()}/fonts/helvR12.bdf`);
      //const lines = LayoutUtils.textToLines(font, matrix.width(), 'Hello, matrix!');

      matrix.font(font);

      setTimeout(() => matrix.sync(), 100);
    })


}

let Billboard = { init };

export { Billboard };