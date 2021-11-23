function create_partition(dataset, constrains, subset_size) {
  let subset = new Set();
  let index = 0;
  let len = 0;
  for (var feature in constrains) {
    len = dataset[feature].length;
    for (let i = 0; i < dataset[feature].length; i++) {
      let flag = false;
      if ("eq" in constrains[feature]) {
        for (let j = 0; j < constrains[feature]["eq"].length; j++) {
          if (dataset[feature][i] === constrains[feature]["eq"][j]) {
            flag = true;
            break;
          }
        }
      } else {
        let fail = false;
        if ("gt" in constrains[feature]) {
          if (dataset[feature][i] > constrains[feature]["gt"]) {
            flag = true;
          } else {
            flag = false;
            fail = true;
          }
        }
        if ("lt" in constrains[feature]) {
          if (!fail && dataset[feature][i] < constrains[feature]["gt"]) {
            flag = true;
          } else {
            flag = false;
            fail = true;
          }
        }
        if ("neq" in constrains[feature]) {
          if (!fail) {
            for (let j = 0; j < constrains[feature]["neq"].length; j++) {
              if (dataset[feature][i] === constrains[feature]["eq"][j]) {
                flag = false;
                break;
              } else {
                flag = true;
              }
            }
          }
        }
      }
      if (flag) {
        if (index > 0 && !subset.has(i)) {
          continue;
        }
        subset.add(i);
      } else if (subset.has(i)) {
        subset.delete(i);
      }
    }
    index++;
  }
  if (subset.size > subset_size)
    throw Error(
      "Las condiciones impuestas las satisfacen un número de estudiantes superior al previsto"
    );
  for (let i = 0; i < len; i++) {
    if (!subset.has(i) && subset.size < subset_size) {
      subset.add(i);
    }
  }
  return subset;
}

export { create_partition };
