// Carrega o arquivo JSON e gera os cards dinamicamente
fetch('vtubers.json')
    .then(response => response.json())
    .then(vtubers => {
        const container = document.querySelector('.vtuber-cards-container');
        
        vtubers.forEach(vtuber => {
            // Cria o card para cada vtuber
            const card = document.createElement('div');
            card.classList.add('vtuber-card');

            // Cria a imagem
            const img = document.createElement('img');
            img.src = vtuber.image;
            img.alt = vtuber.name;
            img.onclick = () => window.open(vtuber.link, '_blank'); // Abre o link do Vtuber ao clicar

            // Cria a parte da info
            const info = document.createElement('div');
            info.classList.add('info');

            // Cria o botão "MAIS"
            const moreButton = document.createElement('button');
            moreButton.textContent = 'MAIS';
            moreButton.classList.add('more-button');
            moreButton.onclick = () => window.open(vtuber.more, '_blank'); // Abre o link do botão "MAIS"

            const name = document.createElement('h3');
            name.textContent = vtuber.name;

            const description = document.createElement('p');
            description.textContent = `Sobre: ${vtuber.description}`;

            // Adiciona a imagem e a info ao card
            info.appendChild(name);
            info.appendChild(description);
            info.appendChild(moreButton);
            card.appendChild(img);
            card.appendChild(info);

            // Adiciona o card ao container
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
    'image/ProjectEndlesslogo.png'
];



const randomImage = images[Math.floor(Math.random() * images.length)];


const style = document.createElement('style');
style.textContent = `
    #home::after {
        background-image: url('${randomImage}');
    }
`;
document.head.appendChild(style);
