/**
 * Basic test to verify Jest and testing infrastructure is working
 */
describe('Testing Infrastructure', () => {
  it('should run tests successfully', () => {
    expect(true).toBe(true);
  });

  it('should support TypeScript', () => {
    const message: string = 'TypeScript is working';
    expect(message).toBe('TypeScript is working');
  });
});
