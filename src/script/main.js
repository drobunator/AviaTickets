import style from "../style/style.scss";
import storage from "../script/store/store";
import "./plugins/index.js";

storage.init().then((res) => {
  console.log(storage);
});
