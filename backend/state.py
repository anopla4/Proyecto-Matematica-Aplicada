from random import sample
from numpy.lib.function_base import copy
from numpy.random import permutation


class State:
    def __init__(self, s) -> None:
        self.st = s

    @staticmethod
    def random_state(num_groups, num_students):
        students_per_group = num_students // num_groups
        r = num_students % num_groups
        st = []

        for i in range(r):
            st += [i] * (students_per_group + 1)
        for i in range(r, num_groups):
            st += [i] * students_per_group

        return State(permutation(st))

    @property
    def number_groups(self):
        return max(self.st)

    @property
    def groups(self):
        return set(self.st)

    def clone(self):
        return State(copy(self.st))

    def sample_from_group(self, g, size):
        group = [i for i in range(len(self.st)) if self.st[i] == g]
        return sample(group, size)[0]

    def mutate_state(self, a, b):
        self.st[a], self.st[b] = self.st[b], self.st[a]

    def neighbors(self, count):
        n = []
        for _ in range(count):
            new_st = self.clone()
            g1, g2 = sample(new_st.groups, 2)
            st1, st2 = new_st.sample_from_group(g1, 1), new_st.sample_from_group(g2, 1)
            new_st.mutate_state(st1, st2)
            n.append(new_st)

        return n
