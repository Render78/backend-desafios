export const renderHome = async (req, res) => {
    try {
        res.render('home');
    } catch (error) {
        console.error("No se pudo renderizar la vista", error);
    }
};

export const renderLogin = async (req, res) => {
    res.render('login');
};

export const renderRegister = async (req, res) => {
    res.render('register');
};

export const renderCurrent = async (req, res) => {
    res.render('current', { user: req.session.user });
};
