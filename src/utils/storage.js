export function readStorage(key, fallback) {
  try {
    const rawValue = localStorage.getItem(key);

    if (!rawValue) {
      return fallback;
    }

    const parsedValue = JSON.parse(rawValue);

    if (parsedValue === null || parsedValue === undefined) {
      return fallback;
    }

    return parsedValue;
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}
