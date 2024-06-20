console.log("Hello world")

const getUsername = document.querySelector('#user') as HTMLInputElement
const formSubmit = document.querySelector('#form') as HTMLFormElement
const main_container = document.querySelector('.main-container') as HTMLElement


interface UserData {

    id: number;
    login: string;
    avatar_url: string;
    location: string;
    url: string;
}




async function customFetcher<T>(url: string, options?: RequestInit): Promise<T> {

    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`Error in fetching response and network error: ${response.status}`)
    }

    const data = await response.json();

    return data


}

const showResultUi = (value: Object) => {

}


function fetchUserData(url: string) {

    customFetcher<UserData[]>(url, {}).then((usersData) => {

        for (const singleUser of usersData) {
            showResultUi(singleUser)
            console.log("single user", singleUser.id)
        }

    })

}


fetchUserData("https://api.github.com/users")