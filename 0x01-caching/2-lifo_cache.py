#!/usr/bin/env python3
""" LIFO Cache """

BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BaseCaching):
    """ LIFO Cache class
    Attributes:
        cache_data (dict): Dictionary to store key-value pairs.
    """

    def __init__(self):
        """ Initialize LIFO Cache """
        super().__init__()

    def put(self, key, item):
        """
        Add an item to the cache.

        Args:
            key: Key to be added.
            item: Value to be added.

        If key or item is None, nothing is added.
        If the number of items exceeds the maximum allowed,
        the least recently added item is removed.
        """
        if key is None or item is None:
            return

        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            last_item = self.cache_data.popitem()
            print("DISCARD:", last_item[0])

        self.cache_data[key] = item

    def get(self, key):
        """
        Retrieve an item from the cache.

        Args:
            key: Key to retrieve the associated value.

        Returns:
            The value associated with the key if found, otherwise None.
        """
        if key is None or key not in self.cache_data:
            return None

        return self.cache_data[key]
