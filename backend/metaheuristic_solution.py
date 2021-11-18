import statistics
import numpy as np
from state import State
from math import inf


def run(data, num_groups):
    d = data.to_numpy()
    val, opt = metaheuristic(num_groups, d.shape[0], d)
    d = {i: [] for i in range(num_groups)}
    for i, item in enumerate(opt.st):
        d[item].append(i)
    return d, val


def metaheuristic(
    num_groups, num_students, data, iter=100, num_init_states=10, num_neighbors=10
):
    func_val_opt = inf
    opt_st = None
    for _ in range(num_init_states):
        state = State.random_state(num_groups, num_students)
        state_func_val = func(np.array(state.st), data, num_groups)
        for _ in range(iter):
            neighbors = state.neighbors(num_neighbors)

            neig_func_vals = [
                func(np.array(ng.st), data, num_groups) for ng in neighbors
            ]
            f_val_neig = np.argmin(neig_func_vals)

            if state_func_val > neig_func_vals[f_val_neig]:
                state = neighbors[f_val_neig]
                state_func_val = neig_func_vals[f_val_neig]
            elif state_func_val == neig_func_vals[f_val_neig]:
                break

        if state_func_val < func_val_opt:
            opt_st = state
            func_val_opt = state_func_val

    return func_val_opt, opt_st


def func(x, data, num_groups):
    attr_val_per_group = build_attr_per_group(x, data, num_groups)
    num_attr = data.shape[1]
    ecm_per_attr = []

    for a in range(num_attr):
        dist_attr_vect = []
        for i in range(num_groups):
            for j in range(i + 1, num_groups):
                dist_attr_vect.append(
                    euler_distance(attr_val_per_group[a][i], attr_val_per_group[a][j])
                )
        ecm_per_attr.append(get_ecm(dist_attr_vect))
    return euler_distance(ecm_per_attr, [0 for _ in range(num_attr)])


def build_attr_per_group(x, data, num_groups):
    attr_val_per_group = {
        i: {j: [] for j in range(num_groups)} for i in range(data.shape[0])
    }
    for std in range(data.shape[0]):
        for attr in range(data.shape[1]):
            attr_val_per_group[attr][x[std]].append(data[std][attr])

    return attr_val_per_group


def euler_distance(x, y):
    acc = 0

    for i in range(len(x)):
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


ent = np.array(
    [[1, 10], [2, 9.5], [2, 11], [2, 1], [2.5, 0], [3, 1], [4, 9], [4.5, 8.5], [5, 9]]
)
