
 // ============================================
 // ELEMENTOS DO LOGIN
 // ============================================

const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

const message = document.getElementById("message");

const remember = document.getElementById("remember");


// ============================================
// MOSTRAR / ESCONDER SENHA
// ============================================

const togglePassword = document.getElementById("togglePassword");

const passwordIcon = togglePassword.querySelector("i");

togglePassword.addEventListener("click", () => {

    const mostrarSenha = passwordInput.type === "password";

    passwordInput.type = mostrarSenha ? "text" : "password";

    passwordIcon.classList.toggle("fa-eye", mostrarSenha);

    passwordIcon.classList.toggle("fa-eye-slash", !mostrarSenha);

    togglePassword.setAttribute(
        "aria-label",
        mostrarSenha ? "Ocultar senha" : "Mostrar senha"
    );

    togglePassword.setAttribute(
        "aria-pressed",
        String(mostrarSenha)
    );

});


// ============================================
// PEGAR CONTAS SALVAS
// ============================================

function getAccounts() {

    return JSON.parse(
        localStorage.getItem("reaproveita_accounts") || "[]"
    );

}


// ============================================
// SALVAR CONTAS
// ============================================

function saveAccounts(accounts) {

    localStorage.setItem(
        "reaproveita_accounts",
        JSON.stringify(accounts)
    );

}


// ============================================
// MOSTRAR MENSAGEM
// ============================================

function showMessage(text, success = false) {

    message.textContent = text;

    message.style.color = success ? "#465c1d" : "#9a3535";

}


// ============================================
// LOGIN
// ============================================

loginForm.addEventListener("submit", (event) => {

    event.preventDefault();


    // ========================================
    // VERIFICAR CAMPOS VAZIOS
    // ========================================

    if (!emailInput.value.trim()) {

        emailInput.focus();

        emailInput.reportValidity();

        return;
    }


    if (!passwordInput.value.trim()) {

        passwordInput.focus();

        passwordInput.reportValidity();

        return;
    }


    // ========================================
    // VERIFICAR E-MAIL
    // ========================================

    if (!emailInput.checkValidity()) {

        emailInput.focus();

        emailInput.reportValidity();

        return;
    }


    // ========================================
    // PEGAR VALORES
    // ========================================

    const email = emailInput.value.trim().toLowerCase();

    const password = passwordInput.value;


    // ========================================
    // PEGAR CONTAS CADASTRADAS
    // ========================================

    const accounts = getAccounts();


    // ========================================
    // PROCURAR A CONTA
    // ========================================

    const account = accounts.find(
        user =>
            user.email === email &&
            user.password === password
    );


    // ========================================
    // CONTA NÃO ENCONTRADA
    // ========================================

    if (!account) {

        showMessage("E-mail ou senha incorretos.");

        return;
    }


    // ========================================
    // CRIAR SESSÃO
    // ========================================

    const session = {

        email: account.email,

        loggedAt: new Date().toISOString()

    };


    // ========================================
    // LEMBRAR LOGIN
    // ========================================

    if (remember && remember.checked) {

        localStorage.setItem(
            "reaproveita_session",
            JSON.stringify(session)
        );

    } else {

        sessionStorage.setItem(
            "reaproveita_session",
            JSON.stringify(session)
        );

    }


    // ========================================
    // LOGIN REALIZADO
    // ========================================

    showMessage("Login realizado! Entrando...", true);


    // ========================================
    // IR PARA A PÁGINA INICIAL
    // ========================================

    setTimeout(() => {

        window.location.href = "paginaInicial.html";

    }, 700);

});


// ============================================
// ESQUECI A SENHA
// ============================================

document
    .getElementById("forgotPassword")
    .addEventListener("click", () => {

        showMessage(
            "A recuperação de senha precisa ser conectada a um sistema de autenticação."
        );

    });


// ============================================
// LEMBRAR LOGIN
// ============================================

const savedSession =
    localStorage.getItem("reaproveita_session") ||
    sessionStorage.getItem("reaproveita_session");


if (savedSession) {

    try {

        const session = JSON.parse(savedSession);

        emailInput.value = session.email || "";

        if (remember) {
            remember.checked = Boolean(
                localStorage.getItem("reaproveita_session")
            );
        }

    } catch {

        localStorage.removeItem("reaproveita_session");

        sessionStorage.removeItem("reaproveita_session");

    }

}
