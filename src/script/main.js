import style from "../style/style.scss";
import storage from "../script/store/store.js";
import "./plugins/index.js";
import formUI from "./views/form.js";
import currencyUI from "./views/currency.js";
import ticketsUI from "./views/tickets.js";
import favoriteStore from "./store/favoriteStore.js";
import favoriteTikets from "./views/favoriteTickets";

document.addEventListener("DOMContentLoaded", () => {
  initApp();
  const form = formUI.form;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit();
  });

  async function initApp() {
    await storage.init();
    formUI.setAutocomleteDate(storage.shortCitiesList);
  }

  async function onFormSubmit() {
    const origin = storage.getCityCodeByKey(formUI.originValue);
    const destination = storage.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departValue;
    const return_date = formUI.returnValue;
    const currency = currencyUI.currencyValue;

    await storage.fetchTickest({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });
    ticketsUI.renderTickets(storage.lastSearch);
  }
});

const ticketsContainer = document.querySelector(
  ".tickets-sections .container .row"
);

ticketsContainer.addEventListener("click", ({ target }) => {
  if (target.classList.contains("add-favorite")) {
    const id = target.parentElement.dataset.id;
    const ticket = storage.lastSearch.find((item) => item.id === id);
    favoriteStore.favoriteTiket = ticket;
    const tickets = favoriteStore.favoriteTiketsData;

    favoriteTikets.renderFavoritTemplate(tickets);
  }
});

const dropDownContainer = document.querySelector(".dropdown-content");

dropDownContainer.addEventListener("click", ({ target }) => {
  if (target.classList.contains("delete-favorite")) {
    const id = target.parentElement.parentElement.dataset.id;
    favoriteStore.deleteFavoriteTickets(id);

    const tickets = favoriteStore.favoriteTiketsData;
    favoriteTikets.renderFavoritTemplate(tickets);
  }
});
