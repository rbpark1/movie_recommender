import pandas as pd
import numpy as np
import sys

import svd
from user_dataframe import ratings, user_movie_df, movies, get_movies_json

# child_process interface
# argument input: string, array of movieids
# ex: '[1 3 5]'
# output: n_recs (default 10)
# ex: '[1 5 14 16]'
def main(argv):
    movieIds = eval(argv[1])
    if isinstance(movieIds, int):
        print(svd.recommend([movieIds]))
    else:
        print(svd.recommend(movieIds))


if __name__ == "__main__":
    main(sys.argv)