const PASTEBIN_RAW_URL = "https://raw.githubusercontent.com/JempUnkn/firebase_teste/refs/heads/main/logger.log";

// Função para obter os dados criptografados do arquivo
async function getEncryptedData() {
    try {
        document.getElementById("error-message").style.display = "none"; // Ocultar erro
        document.getElementById("loading-message").style.display = "block"; // Mostrar carregamento
        const response = await fetch(PASTEBIN_RAW_URL);
        document.getElementById("loading-message").style.display = "none"; // Ocultar carregamento

        if (!response.ok) throw new Error("Erro ao obter os dados.");
        const data = await response.text();

        if (!data || data.trim() === "") throw new Error("Dados vazios ou inválidos.");
        return data;
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
        document.getElementById("loading-message").style.display = "none"; // Ocultar carregamento
        return null;
    }
}

// Função para descriptografar os dados (Base64 → Texto)
function decryptData(encryptedText) {
    try {
        return atob(encryptedText); // Decodifica Base64
    } catch (error) {
        console.error("Erro ao descriptografar dados:", error);
        return null;
    }
}

// Função para verificar se usuário e senha existem
function checkCredentials(decryptedData, inputUser, inputPass) {
    const lines = decryptedData.split("\n"); // Quebra em linhas
    for (let line of lines) {
        const [user, pass] = line.trim().split(":"); // Separa user e senha
        if (user === inputUser && pass === inputPass) {
            return true; // Se encontrar, retorna sucesso
        }
    }
    return false; // Se não encontrar, retorna falso
}

// Função para definir um cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

// Função para obter um cookie
function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) return value;
    }
    return null;
}

// Função principal de login
window.onload = function () {
    console.log("Cookies no carregamento:", document.cookie);
    if (getCookie("auth") === "true") {
        console.log("Usuário autenticado. Redirecionando...");
        window.location.href = "../dashboard/index.html";
    } else {
        console.log("Usuário não autenticado.");
    }

    // Adicionando listener para o formulário de login
    document.getElementById("login-form").addEventListener("submit", async function (event) {
        event.preventDefault();
        
        const usernameInput = document.getElementById("username").value.trim();
        const passwordInput = document.getElementById("password").value.trim();
        const errorMessage = document.getElementById("error-message");

        if (!usernameInput || !passwordInput) {
            errorMessage.textContent = "Preencha todos os campos!";
            errorMessage.style.display = "block";
            return;
        }

        const encryptedData = await getEncryptedData();
        if (!encryptedData) {
            errorMessage.textContent = "Erro ao carregar credenciais.";
            errorMessage.style.display = "block";
            return;
        }

        const decryptedData = decryptData(encryptedData);
        if (!decryptedData) {
            errorMessage.textContent = "Erro ao descriptografar as credenciais.";
            errorMessage.style.display = "block";
            return;
        }

        // Verifica se usuário e senha existem no logger.log
        if (checkCredentials(decryptedData, usernameInput, passwordInput)) {
            setCookie("auth", "true", 1);
            console.log("Usuário autenticado! Cookie setado:", document.cookie);
            window.location.href = "../dashboard/index.html";
        } else {
            errorMessage.textContent = "Usuário ou senha incorretos.";
            errorMessage.style.display = "block";
        }
    });
};