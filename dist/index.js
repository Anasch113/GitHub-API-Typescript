"use strict";
console.log("Hello world");
const getUsername = document.querySelector('#user');
const formSubmit = document.querySelector('#form');
const main_container = document.querySelector('.main-container');
async function customFetcher(url, options) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Error in fetching response and network error: ${response.status}`);
    }
    const data = await response.json();
    return data;
}
const showResultUi = (value) => {
};
function fetchUserData(url) {
    customFetcher(url, {}).then((usersData) => {
        for (const singleUser of usersData) {
            showResultUi(singleUser);
            console.log("single user", singleUser.id);
        }
    });
}
fetchUserData("https://api.github.com/users");
