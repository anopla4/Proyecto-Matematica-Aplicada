import pandas as pd
from sklearn.preprocessing import LabelEncoder, OneHotEncoder
from sklearn.cluster import KMeans

def Get_Groups_with_kmean(dataset, number_of_groups):
    """
    Se recibe un data frame(dataset), correspondiente a un subgrupo determinado de estudiantes, con los atributos normalizados
    y con el procesamiento correspondiente, además del número de grupos en que se desean repartir. Se aplica el algortimo de
    kmean para agrupar estos estudiantes en grupos afines(clusterizar) y a partir de estos grupos afines se reparten 
    de forma equitativa entre los grupos a crear
    """
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
        k = int(len(clusters[i])/number_of_groups)
        for j in range(number_of_groups):
            groups[j].extend(clusters[i][(j*k):((j+1)*k)])
        if k == 0:
            R = len(clusters[i])
        else:
            R = len(clusters[i])%number_of_groups
        for j in range(R):
            min_group = groups[0]
            for group in groups:
                if len(group) < len(min_group):
                    min_group = group
            min_group.append(clusters[i][-(j+1)])
    return groups