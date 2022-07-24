const app = require('express')();
const server = require('http').createServer(app);
var io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

const PORT = 8000;

io.on('connection', (socket: any) => {
  console.log('Somebody connected via socket.io');
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
