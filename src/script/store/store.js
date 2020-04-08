import api from "../services/apiService";
import { formatDate } from "../helpers/date.js";

class Storage {
  constructor(api, helpers) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.lastSearch = {};
    this.formatDate = helpers.formatDate;
  }
  async init() {
    const response = await Promise.all([
      this.api.countries(),
      this.api.cities(),
      this.api.airlines(),
    ]);

    const [countries, cities, airlines] = response;
    this.countries = this.serializeCountries(countries);
    this.cities = this.serializeCities(cities);
    this.shortCitiesList = this.createShortCitiesList(this.cities);
    this.airlines = this.serializeAirlines(airlines);
    console.log("init epta");
    return response;
  }

  createShortCitiesList(cities) {
    return Object.entries(cities).reduce((acc, [, value]) => {
      acc[value.full_name] = null;
      return acc;
    }, {});
  }

  getCityCodeByKey(key) {
    const city = Object.values(this.cities).find(
      (city) => city.full_name === key
    );
    return city.code;
  }

  getCityNameByCode(code) {
    return this.cities[code].name;
  }

  getAirlineByCode(code) {
    return this.airlines[code].name || "";
  }

  getAirlinesLogo(code) {
    return this.airlines[code].logo || "";
  }

  serializeAirlines(airlines) {
    return airlines.reduce((acc, item) => {
      item.logo = `http://pics.avs.io/200/200/${item.code}.png`;
      item.name = item.name || item.name_translations.en;
      acc[item.code] = item;
      return acc;
    }, {});
  }

  async fetchTickest(params) {
    const response = await this.api.prices(params);
    this.lastSearch = this.serializeTicets(response.data);
  }

  serializeTicets(tikets) {
    return Object.values(tikets).map((ticket) => {
      return {
        ...ticket,
        origin_name: this.getCityNameByCode(ticket.origin),
        destination_name: this.getCityNameByCode(ticket.destination),
        airline_logo: this.getAirlinesLogo(ticket.airline),
        airline_name: this.getAirlineByCode(ticket.airline),
        departure_at: this.formatDate(ticket.departure_at, "dd-MMM-yyyy hh:mm"),
        return_at: this.formatDate(ticket.return_at, "dd-MMM-yyyy hh:mm"),
        id: `tiket${Math.random() + Math.random() * 10}`,
      };
    });
  }

  serializeCountries(countries) {
    //{ 'Country code : {....}'}
    return countries.reduce((acc, country) => {
      acc[country.code] = country;
      return acc;
    }, {});
  }

  serializeCities(cities) {
    return cities.reduce((acc, city) => {
      const country_name = this.getCountryNameByCode(city.country_code);
      const city_name = city.name || city.name_translations.en;
      const full_name = `${city_name}, ${country_name}`;
      const key = city.code;

      acc[key] = {
        ...city,
        country_name,
        full_name,
      };
      return acc;
    }, {});
  }

  getCountryNameByCode(code) {
    return this.countries[code].name;
  }
}

const storage = new Storage(api, { formatDate });

export default storage;
