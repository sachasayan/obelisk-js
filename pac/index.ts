let colors = {
  'W': 0x1919A6,
  'P': 0xFFFF00,
  '1': 0xFF0000,
  '2': 0xFFB8FF,
  '3': 0x00FFFF,
  '4': 0xFFB852,
  ' ': 0x000000
};

let grid = `
WWWWWWWWWWWWWWOWWWWWWWWWWWWWWWWOWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
WOOOWOOOOOOOOOOWWWOOOOOOPOOOOOWOWOOOOOOOOOOOOOOOOOOOOOOOOWOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOWOOOOOWWWOOOOOOOOOOOOOOOOOOOOOOOOOOOOOW
WOWOOOWWWOWWWOOWWWWWWWOWWWWWWOOOOOWWWWWWWWWWWWWWWWOWWWWWWWWWWWOWWWWWWWWWWWWWWWWWWWWWWWWWOWWWWWOWWWWWWWOWWWWWWWWWWWWWWWWWWWWOWWOW
WOWWWOWOOOOOOOOWWWWWWWOOOOOOOOWOWOOOOOOOOOOOOOOOOOOOOOOWOWWWWWOOOOOOOOOOOOOOOOOOOOOOWWWWOWWWWWOWWWWWWWOOOOOOOOOOOOOOOOOOOOOOWWOW
WOWOOOWOWWWOWWWWOOOWWWOWWWWWWOWOWOWWWOWWWOOOOOWWWWWWWWOWOOOWWWOWWWWWWOWWOOWWWOWWWOWWOOOOOOOOOOOOOOOWWWOWWWWWWOWWOOWWWOWWWOWOWWOW
WOWOWOWOWOOOWOOOWWOWWWOWWWOWWOWOWOOWWOOWWOOOOOWOOOOOOWOWOWOWWWOWWWOWWOWOOOOWWOOWWOWWWWOWWWWOWWWWWWOWWWOWWWOWWOWOOOOWWOOWWOWOOOOW
WOOOWOOOOOWOWOOOOOOOOOOOOOOWWOWOWWOWWOOWWOWOOOWOIOOBOWOOOWOOOOOOOOOWWOWOWWOWWOOWWOWWWWOOOOWOWOOOOOOOOOOOOOOWWOWOWWOWWOOWWOWWWWOW
WOWWWOWWWWWOWOOOOOOWWWWWWWOWWOWOWWOWWOOWWOWOOOWOOOOOTOOWWWOOOOOOOWOWWOWOWWOWWOOWWOWWWWWWWOWOWOWWWWOWWWWWWWOWWOWOWWOWWOOWWOWWWWOW
WOWWWOWWWWWOWOOOOOOWWWWWWWOWWOWOWWOWWOOWWOWWOOWOOOOOOOOWWWOOOOOOOOOWWOWOWWOWWOOWWOWWWWWWWOWOWOWWWWOWWWWWWWOWWOWOWWOWWOOWWOWWWWOW
WOOOWOOOOOWOWOOOOOOOOOOOOOOWWOWOWWOWWOOWWOWWOOWOOCOOOWOOOWOOOOOOOOOWWOWOWWOWWOOWWOWWWWOOOOWOWOOOOOOOOOOOOOOWWOWOWWOWWOOWWOWWWWOW
WOWOWOWOWOOOWOOOWWOWWWOWWWOWWOWOWOOWWOOWWOWWOOWOOOOOOWOWOWOWWWOWWWOWWOWOOOOWWOOWWOWWWWOWWWWOWWWWWWOWWWOWWWOWWOWOOOOWWOOWWOWOOOOW
WOWOOOWOWWWOWWWWOOOWWWOWWWWWWOWOWOWWWOOWWOWWOOWWWWWWWWOWOOOWWWOWWWWWWOWWOOWWWOOWWOWWOOOOOOOOOOOOOOOWWWOWWWWWWOWWOOWWWOOWWOWOWWOW
WOWWWOWOOOOOOOOWWWWWWWOOOOOOWWWOWWWOOOOOOOOOOOOOOOOOOOOWOWWWWWOOOOOOOOOOOOOOOOOOOOOOWWWWWWWWWWWWWWWWWWOOOOOOOOOOOOOOOOOOOOOOWWOW
WOWOOOWWWOWWWOOWWWWWWWOWWWWWWOOOOOWWWWWWWWWWWWWWWWOWWWWWWWWWWWOWWWWWWWWWWWWWWWWWWWWWWWWWWWOOOOOWWWWWWWOWWWWWWWWWWWWWWWWWWWWOWWOW
WOOOWOOOOOOOOOOOOOOOOOOOOOOOOOWOWOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOWWWOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOW
WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWOWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
`;

let f = grid.replace(/\n|\r/g, "");
let field = Array.from(f).map((char) => colors[char]);


function init (matrix){
  (async () => {
    try {
      matrix
        .clear()
        .brightness(20);

      field.forEach((c, i) => {
        matrix.fgColor(c)
          .setPixel(i % 128, Math.floor(i / 128));
      });
      await wait(999999999);
    }
    catch (error) {
      console.error(`${__filename} caught: `, error);
    }
  })();
};

let Pac = { colors, init };


export { Pac };



