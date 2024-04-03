#!/usr/bin/env python3
""" BasicCache module """

from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """ BasicCache class """

    def __init__(self):
        """Call the constructor of the parent class"""
        super().__init__()

    def put(self, key: str, item: str) -> None:
        """ Add an item to the cache

        Args:
            key (str): The key to associate with the item.
            item: The item to be added to the cache.
        """
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key: str) -> dict:
        """ Retrieve an item from the cache.

        Args:
            key (str): The key of the item to retrieve from the cache.

        Returns:
            The value associated with the given key,
            or None if the key is not found in the cache.
        """
        if key is not None:
            return self.cache_data.get(key)
        else:
            return None
