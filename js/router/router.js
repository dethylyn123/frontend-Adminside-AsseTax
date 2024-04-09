function setRouter() {
    switch (window.location.pathname) {
        // If you are logged in you cant access outside pages
        case "/login.html":
        case "/index.html":
        case "/":
        case "/inner-page.html":
        case "/inner-page-2.html":
        case "/inner-page-3.html":
            if (localStorage.getItem("token")) {
                window.location.pathname = "/dashboard.html"
            }
            break;
        // If you are not logged in you cant access dashboard pages
        case "/dashboard.html":
        // case "/":
        case "/owners.html":
        case "/pages-faq.html":
        case "/my-profile.html":
        case "/declaration.html":
        case "/register.html":
            if (!localStorage.getItem("token")) {
                window.location.pathname = "/login.html";
            }
            break;
        case "/users.html":
            if (localStorage.getItem("role") != "Admin") {
                window.location.pathname = "/dashboard.html";
            }
            break;
        

    }
}

export {setRouter};