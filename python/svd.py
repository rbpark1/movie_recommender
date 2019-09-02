import pandas as pd
import numpy as np
from scipy.sparse.linalg import svds
from user_dataframe import user_movie_df


# input: array of movie ids
# output: array of recs
def recommend(movieIds, n_recommendations=10, latent_factors=50):
    # dimensions
    # nrow = user_movie_df.shape[0]
    # ncol = user_movie_df.shape[1]

    # add zero row at beginning of user_movie_matrix
    new_row = pd.DataFrame(0, index=[0], columns=user_movie_df.columns)
    df1 = user_movie_df.append(new_row, ignore_index=False)

    # fill new user data with ratings
    for id in movieIds:
        # set rating of 5 for that movie
        df1.iloc[-1][id] = 5.0

    # sparse matrix SVD approximation
    U, S, Vt = svds(df1, k=latent_factors)
    S = np.diag(S)
    # element (i, j) corresponds to ith user's predicted rating for jth movie
    predicted_ratings = np.dot(np.dot(U, S), Vt)
    pred_df = pd.DataFrame(predicted_ratings, columns=df1.columns)

    # select top recommendations for movies not already rated for user 0
    user_ratings = df1.iloc[-1]
    already_rated_labels = list(user_ratings.iloc[user_ratings.nonzero()[0]].index)
    # drop already rated movies and then sort by top recommendations
    results_df = pred_df.iloc[-1].drop(labels=already_rated_labels).sort_values(ascending=False)
    final_recs = results_df.head(n_recommendations)

    # return list of top rec movieIds
    return final_recs.keys().tolist()
