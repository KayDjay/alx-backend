#!/usr/bin/env python3
""" Simple Helper Function Module """

import csv
import math
from typing import List


def index_range(page: int, page_size: int) -> tuple:
    """ Return a tuple of size two containing a start index and an end index"""
    start = (page - 1) * page_size
    end = page * page_size
    return start, end


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """ Get a page with the given page number and page size
        """
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0
        start, end = index_range(page, page_size)
        dataset = self.dataset()
        if start > (len(dataset) / end) and end < (len(dataset) % page_size):
            return []
        else:
            return dataset[start:end]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> List[List]:
        """returns hyper page data after paginating"""
        dataset = self.get_page(page, page_size)
        total_page = math.ceil(len(self.__dataset) / page_size)
        nxt = page + 1 if page < total_page else None
        prev = page - 1 if page > 1 else None
        return {
            "page_size": len(dataset),
            "page": page,
            "data": dataset,
            "next_page": nxt,
            "prev_page": prev,
            "total_pages": total_page
        }
