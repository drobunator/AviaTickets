import style from "../style/style.scss";
import storage from "../script/store/store.js";
import "./plugins/index.js";
import formUI from "./views/form.js";
import currencyUI from "./views/currency.js";
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
  }
});
