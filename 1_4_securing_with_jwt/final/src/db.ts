import { DataStore } from "notarealdb";

export const store = new DataStore("./dist/data");

export const races = store.collection("races");

export const horses = store.collection("horses");

export const users = store.collection("users");
