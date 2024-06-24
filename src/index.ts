console.log("Hello world")

const getUsername = document.querySelector('#user') as HTMLInputElement
const formSubmit = document.querySelector('#form') as HTMLFormElement
const main_container = document.querySelector('.main_container') as HTMLElement


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

    return data;


}

const showResultUi = (value: UserData) => {

    const { login, avatar_url, location, url } = value;

    main_container.insertAdjacentHTML(
        "beforeend",
        `<div class = 'card'>
<img src=${avatar_url} alt = ${login} /> 
<hr/>
<div class = 'card-footer'>
<p>${login}</p>
<img src = ${avatar_url} alt = ${login}
 />
 <a href = ${url}> Github</a>
</div>
</div>`
    )

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


// search functionality


formSubmit.addEventListener('submit', async (e) => {

    e.preventDefault()
    const searchTerm = getUsername.value.toLocaleLowerCase();




    try {


        const url = "https://api.github.com/users"
        const allUsers = await customFetcher<UserData[]>(url, {});

        const matchingUsers = allUsers.filter((user) => {

            return user.login.toLocaleLowerCase().includes(searchTerm)
        })

        main_container.innerHTML = ""

        if (matchingUsers.length === 0) {
            main_container?.insertAdjacentHTML(
                "beforeend",
                `<p>No users found</p>`
            )
        }
        else {
            for (const singleUser of matchingUsers) {
                showResultUi(singleUser)
            }
        }

    } catch (error) {
        console.log("error while search", error)
    }

})
