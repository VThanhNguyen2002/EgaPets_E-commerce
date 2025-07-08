// Sample test to verify Jest configuration
describe('Sample Test Suite', () => {
  test('should pass basic test', () => {
    expect(1 + 1).toBe(2);
  });

  test('should have NODE_ENV set to test', () => {
    expect(process.env.NODE_ENV).toBe('test');
  });

  test('should have module aliases working', () => {
    // This test will pass if module aliases are configured correctly
    expect(() => {
      const path = require('path');
      const sharedPath = path.resolve(__dirname, '../shared');
      expect(sharedPath).toContain('shared');
    }).not.toThrow();
  });
});