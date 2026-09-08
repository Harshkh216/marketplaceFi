import { useState, useCallback } from 'react';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const toggle = useCallback((productId: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  }, []);

  const has = useCallback((productId: string) => wishlist.has(productId), [wishlist]);

  const count = wishlist.size;

  return { wishlist, toggle, has, count };
}
