
function add(a, b) {
    return a + b;
  }
  
  describe('add', () => {
    test('should add two numbers correctly', () => {
      const result = add(2, 3);
      expect(result).toBe(5);
    });
  });
  