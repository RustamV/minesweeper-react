import React from "react";
import ReactDOM from "react-dom";
import Board from "./app";
import "./i18n";
import "./styles/index.css";
import "./styles/main.scss";

Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key));
};

ReactDOM.render(<Board />, document.getElementById("root"));
