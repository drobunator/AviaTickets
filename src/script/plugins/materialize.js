import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

//Init select

const select = document.querySelectorAll("select");
M.FormSelect.init(select);

export function getSelectInstance(elem) {
  return M.FormSelect.getInstance(elem);
}

//Init autocomplete

const autocomplete = document.querySelectorAll(".autocomplete");
M.Autocomplete.init(autocomplete);

export function getAutocomleteInstance(elem) {
  return M.Autocomplete.getInstance(elem);
}

//Init daatepickers

const datepicker = document.querySelectorAll(".datepicker");
M.Datepicker.init(datepicker, {
  showClearBtn: true,
  format: "yyyy-mm-dd",
});

export function getDatePickerInstance(elem) {
  return M.Datepicker.getInstance(elem);
}
