import {whatToRender} from '../../compiled/1.code.js';

beforeEach(() => {
    console.log("asd");
    jest.mock('react-dom', () => ({
        render: jest.fn(),
    }));
});

test('adds 1 + 2 to equal 3', () => {
  expect(whatToRender()).toBe("Hello World");
});