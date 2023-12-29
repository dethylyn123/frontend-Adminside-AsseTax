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
        case "/register.html":
            if (!localStorage.getItem("token")) {
                window.location.pathname = "/login.html";
            }
            break;
        case "/users.html":
            if (localStorage.getItem("role") != "Admin") {
                window.location.pathname = "/index.html";
            }
        default:
            break;

    }
}

export {setRouter};