import React, { Component } from "react";
import History from "./history.js";
import { StackNavigator } from "react-navigation";
export default (DrawNav = StackNavigator({
  History: { screen: History },
}));
