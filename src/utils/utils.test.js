import * as U from './';

describe('/Utils', () => {
  it('should return common elements between two elements', () => {
      expect(U.intersect()).toEqual([]);
      expect(U.intersect([], [])).toEqual([]);
      expect(U.intersect([], [1,2,3])).toEqual([]);
      expect(U.intersect([1, 2, 3], [])).toEqual([]);

      expect(U.intersect([1, 2, 3], [1])).toEqual([1]);
      expect(U.intersect([1, 2, 3], [1, 2])).toEqual([1, 2]);
  });
});
