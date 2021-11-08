import statistics
import numpy as np


def main():
    pass


def func(x, data):
    attr_val_per_group = build_attr_per_group(x, data)
    num_attr = data.shape[1]
    num_groups = len(attr_val_per_group)
    ecm_per_attr = []

    for a in num_attr:
        dist_attr_vect = []
        for i in range(num_groups):
            for j in range(i + 1, num_groups):
                dist_attr_vect.append(
                    euler_distance(attr_val_per_group[a][i], attr_val_per_group[a][j])
                )
        ecm = ecm_per_attr.append(get_ecm(dist_attr_vect))

    return euler_distance(ecm_per_attr, [0 for _ in range(num_attr)])


def build_attr_per_group(x, data):
    pass


def euler_distance(x, y):
    acc = 0

    for i in range(x):
        acc = acc + (x[i] - y[i]) ** 2
    return np.sqrt(acc)


def get_ecm(x):
    m = statistics.mean(x)
    v = variance(x, m)
    return m + v


def variance(x, m):
    acc = 0
    for item in x:
        acc = acc + (item - m) ** 2
    return acc / (len(x) - 1)
