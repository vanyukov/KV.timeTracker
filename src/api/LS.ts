const getPrefix = () => "kv_";

const set = (key: string, val: any) => {
  const LSKey = getPrefix() + key;
  let LSVal;
  switch (typeof val) {
    case "object":
    case "boolean":
    case "number":
    case "bigint":
      LSVal = JSON.stringify(val);
      break;

    case "string":
      LSVal = val;
      break;

    default:
      console.error("Invalid value type of the variable stored in localStorage");

      return;
  }
  localStorage.setItem(LSKey, LSVal);
};

const get = (key: string, doParse = true) => {
  const LSKey = getPrefix() + key;
  try {
    const LSVal = localStorage.getItem(LSKey);
    if (doParse && LSVal !== null) {
      return JSON.parse(LSVal);
    }

    return LSVal;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const remove = (key: string) => {
  const LSKey = getPrefix() + key;
  localStorage.removeItem(LSKey);
};

export const LS = {
  set,
  get,
  remove,
};
