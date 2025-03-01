fetch('vtubers.json')
    .then(response => response.json())
    .then(vtubers => {
        const container = document.querySelector('.vtuber-cards-container');

        vtubers.forEach(vtuber => {
            // Criar card
            const card = document.createElement('div');
            card.classList.add('vtuber-card');

            // Criar imagem estática (fundo)
            const imgStatic = document.createElement('img');
            imgStatic.src = vtuber.image;
            imgStatic.alt = vtuber.name;
            imgStatic.classList.add('static-image');
            imgStatic.onclick = () => window.open(vtuber.link, '_blank');

            // Criar imagem animada (camada superior)
            const imgAvatar = document.createElement('img');
            imgAvatar.src = vtuber.avatar;
            imgAvatar.alt = `${vtuber.name} Avatar`;
            imgAvatar.classList.add('avatar-image');
            imgAvatar.style.position = "absolute"; // Sobrepor à imagem estática
            imgAvatar.style.top = "0";
            imgAvatar.style.left = "0";
            imgAvatar.style.opacity = "0"; // Inicialmente invisível
            imgAvatar.onclick = () => window.open(vtuber.link, '_blank');

            // Adiciona evento para trocar a imagem ao passar o mouse
            card.addEventListener('mouseenter', () => {
                imgAvatar.style.opacity = "1"; // Torna o GIF visível
            });

            card.addEventListener('mouseleave', () => {
                imgAvatar.style.opacity = "0"; // Volta à imagem original
            });

            // Criar container para agrupar as imagens
            const imgContainer = document.createElement('div');
            imgContainer.style.position = "relative";
            imgContainer.style.display = "inline-block";
            imgContainer.appendChild(imgStatic);
            imgContainer.appendChild(imgAvatar);

            // Adiciona ao card
            card.appendChild(imgContainer);
            container.appendChild(card);
        });
    })
    .catch(error => console.error('Erro ao carregar os dados dos Vtubers:', error));








// Função para renderizar Markdown com suporte a cores customizadas
function renderMarkdown(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
        .replace(/\[\[(.*?)\]\((.*?)\)\]\(\{(#.*?)\}\)/g, '<a style="color: transparent;">.</a><a href="$2" target="_blank" style="color:$3;">$1</a>') // Links com cor
        .replace(/\[(.*?)\]\(\{(#.*?)\}\)/g, '<span style="color:$2;">$1</span>') // Texto colorido
        .replace(/^> (.*?$)/gm, '<blockquote>$1</blockquote>') // Blockquote
        .replace(/\n/g, '<br>'); // Line breaks
}

// Carrega o JSON e cria a seção FAQ dinamicamente
fetch('faq.json')
    .then(response => response.json())
    .then(faqs => {
        const faqSection = document.querySelector('#faq');

        faqs.forEach(item => {
            const faqItem = document.createElement('div');
            faqItem.classList.add('faq-item', 'collapsed'); // Começa colapsado

            const question = document.createElement('h3');
            question.textContent = item.question;

            const answer = document.createElement('p');
            answer.innerHTML = renderMarkdown(item.answer);

            faqItem.appendChild(question);
            faqItem.appendChild(answer);
            faqSection.appendChild(faqItem);

            // Adiciona evento de clique para expandir/colapsar
            faqItem.addEventListener('click', () => {
                faqItem.classList.toggle('expanded');
                faqItem.classList.toggle('collapsed');
            });
        });
    })
    .catch(error => console.error('Erro ao carregar as perguntas frequentes:', error));





window.addEventListener('scroll', () => {
    const content = document.querySelector('.content');
    
    if (window.scrollY > 100) {  // Verifica se o scroll passou de 100px
        content.classList.add('scrolled');  // Adiciona a classe que contém a transição
    } else {
        content.classList.remove('scrolled');  // Remove a classe quando o scroll voltar para o topo
    }
});
    


// Alternar entre tema claro e escuro com animação
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const currentTheme = document.body.classList.contains('light-theme') ? 'Light' : 'Dark';
    localStorage.setItem('theme', currentTheme);

    // Trocar o emoji
    if (currentTheme === 'Light') {
        themeToggle.textContent = '🌞';
    } else {
        themeToggle.textContent = '🌙';
    }
});

// Verificar tema salvo no localStorage
window.onload = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'Light') {
        document.body.classList.add('light-theme');
        themeToggle.textContent = '🌞'; // Emoji para Light mode
    } else {
        themeToggle.textContent = '🌙'; // Emoji para Dark mode
    }
};



// Exibe a aba quando o link "About" for clicado
document.getElementById('aboutLink').addEventListener('click', function(event) {
    event.preventDefault(); // Impede o comportamento padrão de scroll da âncora

    var aboutSection = document.getElementById('about');
    aboutSection.classList.toggle('hidden'); // Mostra ou esconde a aba "Sobre"
});

// Fecha a aba quando clicar fora dela
document.addEventListener('click', function(event) {
    var aboutSection = document.getElementById('about');
    var aboutLink = document.getElementById('aboutLink');

    // Verifica se o clique foi fora da aba e do link de "About"
    if (!aboutSection.contains(event.target) && !aboutLink.contains(event.target)) {
        aboutSection.classList.add('hidden'); // Esconde a aba "Sobre"
    }
});




const images = [
    'image/domns.png',
    'image/fundo.png',
];

const randomImage = images[Math.floor(Math.random() * images.length)];


const style = document.createElement('style');
style.textContent = `
    #home::after {
        background-image: url('${randomImage}');
    }
`;
document.head.appendChild(style);

function detectDeviceAndShowPopup() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Verificar se o dispositivo é móvel
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

    if (isMobile) {
        // Criar o fundo embaçado (blur)
        const blurBackground = document.createElement('div');
        blurBackground.className = 'blur-background';

        // Criar o pop-up
        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.innerHTML = `
            <p>O WebFront do Screen Recorder não é compatível com dispositivos móveis.</p>
            <button onclick="closePopup()">Fechar</button>
        `;

        // Adicionar o pop-up ao fundo embaçado
        blurBackground.appendChild(popup);

        // Adicionar o fundo embaçado ao corpo do documento
        document.body.appendChild(blurBackground);
    }
}

function closePopup() {
    // Remover o fundo embaçado e o pop-up
    const blurBackground = document.querySelector('.blur-background');
    if (blurBackground) {
        blurBackground.remove();
    }
}

// Chamar a função ao carregar a página
window.onload = detectDeviceAndShowPopup;