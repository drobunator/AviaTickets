class FavoriteStore {
  constructor() {
    this.favoriteTickets = [];
  }

  get favoriteTiketsData() {
    return this.favoriteTickets;
  }

  set favoriteTiket(data) {
    const res = this.favoriteTickets.some((ticket) => {
      return ticket.id === data.id;
    });

    if (!res) {
      this.favoriteTickets.push(data);
    }
  }

  deleteFavoriteTickets(id) {
    const res = this.favoriteTickets.filter((ticket) => ticket.id !== id);
    this.favoriteTickets = res;
  }
}

const favoriteStore = new FavoriteStore();

export default favoriteStore;
