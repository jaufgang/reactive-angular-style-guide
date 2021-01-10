import { PrettierPipe } from './prettier.pipe';

describe('PrettierPipe', () => {
  it('create an instance', () => {
    const pipe = new PrettierPipe();
    expect(pipe).toBeTruthy();
  });
});
