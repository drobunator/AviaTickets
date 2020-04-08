import currencyUI from "./currency.js";

class FavoriteTickets {
  constructor(currency) {
    this.container = document.querySelector(".dropdown-content");
    this.currency = currencyUI.getCurrencySymbol.bind(currencyUI);
  }

  renderFavoritTemplate(tickets) {
    this.clearContainer();

    if (!tickets.length) {
      this.renderEmptyMsg();
      return;
    }

    let fragment = "";
    tickets.forEach((ticket) => {
      const template = this.createFavoritTicketTemplate(ticket);
      fragment += template;
    });
    this.container.insertAdjacentHTML("afterbegin", fragment);
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  emptyTemplateMsg() {
    return `<p class="dropdown-empty-msg">Список пуст</p>`;
  }

  renderEmptyMsg() {
    const template = this.emptyTemplateMsg();
    this.container.insertAdjacentHTML("afterbegin", template);
  }

  createFavoritTicketTemplate(ticket) {
    return `
    <div data-id = "${ticket.id}" class="favorite-item d-flex align-items-start" >
              <img
                src="${ticket.airline_logo}"
                class="favorite-item-airline-img"
              />
              <div class="favorite-item-info d-flex flex-column">
                <div
                  class="favorite-item-destination d-flex align-items-center"
                >
                  <div class="d-flex align-items-center mr-auto">
                    <span class="favorite-item-city">${ticket.origin_name}</span>
                    <i class="medium material-icons">flight_takeoff</i>
                  </div>
                  <div class="d-flex align-items-center">
                    <i class="medium material-icons">flight_land</i>
                    <span class="favorite-item-city">${ticket.destination_name}</span>
                  </div>
                </div>
                <div class="ticket-time-price d-flex align-items-center">
                  <span class="ticket-time-departure">${ticket.departure_at}</span>
                  <span class="ticket-price ml-auto">${ticket.price}</span>
                </div>
                <div class="ticket-additional-info">
                  <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
                  <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
                </div>
                <a
                  class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
                  >Delete</a
                >
              </div>
            </div>
    `;
  }
}

const favoriteTickets = new FavoriteTickets(currency);

export default favoriteTickets;
