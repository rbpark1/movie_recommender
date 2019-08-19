import pandas as pd
import numpy as np
from scipy.sparse.linalg import svds
from user_dataframe import movies, user_movie_df


# input: array of movie ids
# output: array of recs
def recommend(n_recommendations=10, latent_factors=50, print_output=True):
    # dimensions
    # nrow = user_movie_df.shape[0]
    # ncol = user_movie_df.shape[1]

    # add zero row at beginning of user_movie_matrix
    new_row = pd.DataFrame(0, index=[0], columns=user_movie_df.columns)
    df1 = user_movie_df.append(new_row, ignore_index=False)

    # fill new user data with ratings
    # for movie in movies:
    #     # set rating of 5 for that movie

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
    results_df = pred_df.iloc[-1].drop(labels=already_rated_labels).sort_values(ascending=False).to_frame()

    final_recs = pd.merge(results_df, movies, on='movieId')[['movieId', 'title', 'genres']].head(n_recommendations)

    if print_output:
        print("USERS TOP MOVIES:")
        top_user_ratings = user_ratings.sort_values(ascending=False).to_frame()
        print(pd.merge(top_user_ratings, movies, on='movieId').head(15).to_string())

        print('SVD TOP %d RECOMMENDATIONS:' % n_recommendations)
        print(final_recs.to_string())

    # return prediction matrix and final recommendations
    return pred_df, final_recs
