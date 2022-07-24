const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

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

const PORT = (process.env.PORT as unknown as number) || 8000;

app.get('/', (req: any, res: any) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket: ServerToClientEvents) => {
  console.log('a user connected');
  console.log(socket);
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
