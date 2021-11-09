import pandas as pd
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from sklearn.cluster import KMeans

def Get_Groups_with_kmean(dataset, number_of_groups):
    kmeans = KMeans(n_clusters= number_of_groups+3, init='k-means++')
    kmeans.fit(dataset)
    # print(kmeans.inertia_)
    clusters = {}
    for i,label in enumerate(kmeans.labels_):
        if label not in clusters:
            clusters[label] = []
        clusters[label].append(i)
    groups = [[] for _ in range(number_of_groups)]
    for i in clusters:
        # i = int(i)
        if 116 in clusters[i]:
            print(clusters[i])
        k = int(len(clusters[i])/number_of_groups)
        for j in range(number_of_groups):
            # print(((j+1)*k))
            # print(clusters[i][(j*k):((j+1)*k)])
            groups[j].extend(clusters[i][(j*k):((j+1)*k)])
        if k == 0:
            R = len(clusters[i])
        else:
            R = len(clusters[i])%number_of_groups
        for j in range(R):
            groups[j].append(clusters[i][-(j+1)])
    return groups