import pandas as pd
import numpy as np
import sys

import svd
from user_dataframe import ratings, user_movie_df, movies, get_movies_json

# print("USERS TOP MOVIES:")
# user_ratings = user_movie_matrix.iloc[userId - 1]
# top_user_ratings = user_ratings.sort_values(ascending=False).to_frame()
# print(pd.merge(top_user_ratings, movies, on='movieId').head(10).to_string())

# svd.recommend()
# cf_knn.recommend(userId)


def main(argv):
    print('here')

if __name__ == "__main__":
    main(sys.argv)