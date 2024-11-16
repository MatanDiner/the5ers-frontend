import axios from "axios";
import { action, makeAutoObservable, observable, runInAction } from "mobx";

export class StockStore {
  stocks = [];
  userStocks = [];
  selectedStock = {};
  searchText = "";
  constructor() {
    makeAutoObservable(this, {
      stocks: observable,
      userStocks: observable,
      selectedStock: observable,
      searchText: observable,
      getAllStocks: action,
      getUserStocks: action,
      setSelectedStock: action,
      removeUserStock: action,
      addUserStock: action,
      setSearchText: action,
    });
  }

  setSearchText = (text) => {
    this.searchText = text;
  };

  getUserStocks = async () => {
    const stocks = await axios.get(`https://localhost:8000`);
    runInAction(() => {
      this.userStocks = stocks.data;
    });
  };

  removeUserStock = async (stockSymbol) => {
    await axios.delete(`https://localhost:8000/${stockSymbol}`);

    runInAction(() => {
      this.userStocks = this.userStocks.filter(
        (st) => st.symbol !== stockSymbol
      );
    });
  };

  addUserStock = async (stock) => {
    await axios.post(`https://localhost:8000`, stock);
    this.userStocks = [...this.userStocks, stock];
  };

  getAllStocks = async (query = "AA") => {
    const stocks = await axios.get(
      `https://financialmodelingprep.com/api/v3/search-ticker?query=${query}&limit=100&apikey=4k54ZMK2OD1pIozlDssM9cowd4urE4jQ`
    );
    runInAction(() => {
      this.stocks = stocks.data.filter(
        (st) => !this.userStocks.some((userSt) => userSt.symbol === st.symbol)
      );
    });
  };

  setSelectedStock = (stock) => {
    this.selectedStock = stock;
  };
}

export default new StockStore();
