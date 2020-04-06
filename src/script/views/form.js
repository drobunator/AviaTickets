import {
  getDatePickerInstance,
  getAutocomleteInstance,
} from "../plugins/materialize.js";

class FormUI {
  constructor(datePickerInstance, autocomleteInstance) {
    this._form = document.forms["location-control"];
    this.origin = document.getElementById("autocomplete-origin");
    this.destination = document.getElementById("autocomplete-destination");
    this.depart = document.getElementById("datepicker-depart");
    this.return = document.getElementById("datepicker-return");

    this.originAutocomplete = autocomleteInstance(this.origin);
    this.destinationAutocomplete = autocomleteInstance(this.destination);
    this.departDate = datePickerInstance(this.depart);
    this.returnDate = datePickerInstance(this.return);
  }

  get form() {
    return this._form;
  }

  setAutocomleteDate(data) {
    this.originAutocomplete.updateData(data);
    this.destinationAutocomplete.updateData(data);
  }

  get originValue() {
    return this.origin.value;
  }

  get destinationValue() {
    return this.destination.value;
  }

  get departValue() {
    return this.departDate.toString();
  }

  get returnValue() {
    return this.returnDate.toString();
  }
}

const formUI = new FormUI(getDatePickerInstance, getAutocomleteInstance);

export default formUI;
