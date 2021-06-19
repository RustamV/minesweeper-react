import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import Board from "./app";
import "./styles/main.scss";

Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key));
};

ReactDOM.render(<Board />, document.getElementById("root"));
