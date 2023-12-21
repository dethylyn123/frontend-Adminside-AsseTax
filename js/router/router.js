function setRouter() {
    switch (window.location.pathname) {
        // If you are logged in you cant access outside pages
        case "/login.html":
            if (localStorage.getItem("token")) {
                window.location.pathname = "/index.html"
            }
            break;
        // If you are not logged in you cant access dashboard pages
        case "/index.html":
        case "/":
        case "/owners.html":
        case "/declaration.html":
        case "/users.html":
        case "/register.html":
            if (!localStorage.getItem("token")) {
                window.location.pathname = "/login.html";
            }
            break;

        default:
            break;

    }
}

export {setRouter};