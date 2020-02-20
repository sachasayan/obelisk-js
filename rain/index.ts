import * as Jimp from 'jimp';

let spaceship = [
  0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000,
  0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x4d4d4d, 0x4d4d4d, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000,
  0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x4d4d4d, 0xa3a3a3, 0xa3a3a3, 0x4d4d4d, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000,
  0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x4d4d4d, 0xf1794b, 0x8c591c, 0x4d4d4d, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000,
  0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x4d4d4d, 0xf1794b, 0x8c591c, 0x4d4d4d, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000,
  0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x4d4d4d, 0xf1794b, 0x8c591c, 0x4d4d4d, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000,
  0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x4d4d4d, 0xa3a3a3, 0xa3a3a3, 0x4d4d4d, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000,
  0x000000, 0x000000, 0x000000, 0xa3a3a3, 0x000000, 0x000000, 0x4d4d4d, 0xc4c4c4, 0xc4c4c4, 0x4d4d4d, 0x000000, 0x000000, 0xa3a3a3, 0x000000, 0x000000, 0x000000,
  0x000000, 0x000000, 0x000000, 0x838383, 0x000000, 0x4d4d4d, 0xa3a3a3, 0xc4c4c4, 0xc4c4c4, 0xa3a3a3, 0x4d4d4d, 0x000000, 0x838383, 0x000000, 0x000000, 0x000000,
  0x000000, 0x000000, 0x000000, 0x838383, 0x0f24e1, 0xa3a3a3, 0xa3a3a3, 0xc4c4c4, 0xc4c4c4, 0xa3a3a3, 0xa3a3a3, 0x0f24e1, 0x838383, 0x000000, 0x000000, 0x000000,
  0x000000, 0x000000, 0x000000, 0x4d4d4d, 0x5a5af0, 0x4d4d4d, 0xa3a3a3, 0xc4c4c4, 0xc4c4c4, 0xa3a3a3, 0x4d4d4d, 0x5a5af0, 0x4d4d4d, 0x000000, 0x000000, 0x000000,
  0x000000, 0x000000, 0x4d4d4d, 0xa3a3a3, 0x5a5af0, 0x4d4d4d, 0xa3a3a3, 0xc4c4c4, 0xc4c4c4, 0xa3a3a3, 0x4d4d4d, 0x5a5af0, 0xa3a3a3, 0x4d4d4d, 0x000000, 0x000000,
  0x000000, 0x000000, 0x4d4d4d, 0xa3a3a3, 0x5a5af0, 0x4d4d4d, 0xa3a3a3, 0xa3a3a3, 0xa3a3a3, 0xa3a3a3, 0x4d4d4d, 0x5a5af0, 0xa3a3a3, 0x4d4d4d, 0x000000, 0x000000,
  0x000000, 0x000000, 0x4d4d4d, 0xa3a3a3, 0x5a5af0, 0xa3a3a3, 0x4d4d4d, 0x4d4d4d, 0x4d4d4d, 0x4d4d4d, 0xa3a3a3, 0x5a5af0, 0xa3a3a3, 0x4d4d4d, 0x000000, 0x000000,
  0x000000, 0x000000, 0x4d4d4d, 0x4d4d4d, 0x0f24e1, 0x4d4d4d, 0x000000, 0xa3a3a3, 0x838383, 0x000000, 0x4d4d4d, 0x0f24e1, 0x4d4d4d, 0x4d4d4d, 0x000000, 0x000000,
  0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000
]



class Raindrop {
  velocity: number;
  y: number;

  constructor(
    readonly x: number,
    y: number,
    velocity: number,
  ) {
    this.velocity = velocity;
    this.y = y + Math.random() * 16;
  }

  next(): number {
    this.y += this.velocity;
    this.velocity += 0.001;
    if (this.y > 16) {
      this.y = 0;
      this.velocity = 0.4;
    }
    return Math.floor(this.y);
  }
}

function init (matrix){

    matrix
      .clear()
      .brightness(20);

    let rocket;
    const raindrops: Raindrop[] = [];

    for (let x = 0; x < matrix.width()/2 ; x++) {
      raindrops.push(new Raindrop(Math.random()*matrix.width(), 0, 0.4));
    }

    matrix.afterSync((mat, dt, t) => {
      matrix
      .clear()
      .brightness(20);

      raindrops.forEach(drop => {
        drop.next();
        matrix.fgColor(0xFFFFFF).setPixel(drop.x, drop.y);
      });

      // spaceship.forEach((pixel, i) => {
      //   if (pixel !== 0x000000){
      //     matrix.fgColor(pixel).setPixel(i % 16 + (64-8), Math.floor(i / 16))
      //   }
      // });

      if(rocket){
        rocket.scan(0, 0, rocket.bitmap.width, rocket.bitmap.height, function(x, y, idx) {
          let pc = rocket.getPixelColor(x, y);
          if (pc % 256 == 255) {
            matrix.fgColor( (pc - (pc % 256)) / 256).setPixel((t%2) + x + (64-8), (t % 4) + y);
          }
        });
      }

      setTimeout(() => matrix.sync(), 0);
    });


    Jimp.read('./rain/spaceship.png')
      .then(img => {
        rocket = img;
        matrix.sync();
      })
      .catch(err => {
        console.error(err);
      });

}

let Rain = { init };

export { Rain };
