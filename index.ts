import {
  GpioMapping,
  LedMatrix,
  LedMatrixUtils,
  MatrixOptions,
  PixelMapperType,
  RuntimeOptions,
} from 'rpi-led-matrix';

import * as prompts from 'prompts';

import {
  Billboard,
  Lightcycles,
  Munchman,
  Pong,
  Pulse,
  Space,
  Sunlight,
  Test
} from './modes';

import { CliMode } from './types';

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const matrixOptions: MatrixOptions = {
  ...LedMatrix.defaultMatrixOptions(),
  rows: 16,
  cols: 32,
  chainLength: 4,
  brightness: 50,
  rowAddressType: 2,
  multiplexing: 3,
  hardwareMapping: GpioMapping.Regular,
  pwmLsbNanoseconds: 1500,
  pwmBits: 8,
  pixelMapperConfig: LedMatrixUtils.encodeMappers(
    { type: PixelMapperType.Rotate, angle: 180 }
  )
};

const runtimeOptions: RuntimeOptions = {
  ...LedMatrix.defaultRuntimeOptions(),
  gpioSlowdown: 4
};

app.use(express.static(__dirname + '/public'));

let players = [];
let playerData: {y: number}[] = [{y: 0}];

function onConnection(socket){
  console.log(socket);
  players = [socket];
  socket.emit('obeliskAssignUser', players.length);
  socket.on('drawing', (data) => {
    playerData[0] = {y: data.y};
  });
  socket.on('disconnect', (reason) => {
    console.log('Disconnect ' + socket.id + ' ' + reason);
    players = players.filter(s => s.id != socket.id );
    players.forEach((s, i) => s.emit('obeliskAssignUser',  i+1));
  });
};

io.on('connection', onConnection);

http.listen(port, () => console.log('Server started. Listening on :' + port));

const createModeSelector = () => {
  return async () => {
    const { mode } = await prompts({
      name: 'mode',
      type: 'select',
      message: 'What would you like to do?',
      hint: 'Use tab or arrow keys and press enter to select.',
      choices: [
        { value: CliMode.Billboard, title:'🔤 => Billboard' },
        { value: CliMode.Pong, title:'🎾 => Pong' },
        { value: CliMode.Lightcycles, title:'🏍\s => Lightcycles' },
        { value: CliMode.Munchman, title:  '🟡 => Munchman' },
        { value: CliMode.Space, title: '🚀 => Space Adventure' },
        { value: CliMode.Pulse, title:'🕺 => Twinkle' },
        { value: CliMode.Exit, title: '🚪 => Exit' },
        { value: CliMode.Sunlight, title: '🟠 => Sunlight' },
        { value: CliMode.Test, title:  '(Test Mode)' },
      ],
    });
    return mode as CliMode;
  };
};
const chooseMode = createModeSelector();

(async () => {
  try {
    const matrix = new LedMatrix(matrixOptions, runtimeOptions);
    matrix.clear();

    while (true) {
      switch (await chooseMode()) {
        case CliMode.Billboard: {
          matrix.afterSync(() => {});
          Billboard.init(matrix);
          break;
        }
        case CliMode.Test: {
          matrix.afterSync(() => {});
          Test.init(matrix);
          break;
        }
        case CliMode.Munchman: {
          matrix.afterSync(() => {});
          Munchman.init(matrix);
          break;
        }
        case CliMode.Space: {
          matrix.afterSync(() => {});
          Space.init(matrix);
          break;
        }
        case CliMode.Sunlight: {
          matrix.afterSync(() => {});
          Sunlight.init(matrix);
          break;
        }
        case CliMode.Pulse: {
          matrix.afterSync(() => {});
          Pulse.init(matrix);
          break;
        }
        case CliMode.Pong: {
          matrix.afterSync(() => {});
          Pong.init(matrix, playerData);
          break;
        }
        case CliMode.Lightcycles: {
          matrix.afterSync(() => {});
          Lightcycles.init(matrix);
          break;
        }
        case CliMode.Exit: {
          matrix.afterSync(() => {});
          matrix.clear().sync();
          console.log('Bye!');
          process.exit(0);
        }
      }
    }
  }
  catch (error) {
    console.error(`${__filename} caught: `, error);
  }
})();