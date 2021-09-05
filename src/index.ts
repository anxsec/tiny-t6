import { Action } from './core';
import { Recorder } from './recorder';
import { Runner } from './runner';

const recorder = new Recorder();

recorder.start('http://localhost:8080');

const actions: Action[] = [];

recorder.on('addAction', (action) => {
  actions.push(action);
});

recorder.on('recordEnd', async () => {
  console.log(actions);

  const runner = new Runner();
  try {
    await runner.run(actions);
    console.log('passed');
  } catch {
    console.log('failed');
  }
});
