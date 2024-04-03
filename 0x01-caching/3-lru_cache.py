#!/usr/bin/env python3
""" LRU Caching """

BaseCaching = __import__('base_caching').BaseCaching


class LRUCache(BaseCaching):
    """ LRU Caching class """
    def __init__(self):
        """ Initialize the LRUCache object. """
        super().__init__()

    def put(self, key, item):
        """
        Add an item to the cache.

        Args:
            key: Key to be added.
            item: Value to be added.

        If key or item is None, nothing is added.
        If the number of items exceeds the maximum allowed,
        the least recently used item is removed.
        """
        if key is None or item is None:
            return

        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            lru_key = list(self.cache_data.keys())[0]
            print("DISCARD:", lru_key)
            del self.cache_data[lru_key]
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
        data = self.cache_data.pop(key)
        self.cache_data[key] = data
        return self.cache_data[key]
