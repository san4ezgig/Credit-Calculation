const moneyData = 'moneyData'
const storageKeys = {
  moneyData,
};

const storage = {
  getItem: (key) => {
    try {
      const data = JSON.parse(window.localStorage.getItem(key));

      return data;
    } catch (e) {
      return null;
    }
  },
  setItem: (key, data) => window.localStorage.setItem(key, JSON.stringify(data))
}

export { storage, storageKeys };