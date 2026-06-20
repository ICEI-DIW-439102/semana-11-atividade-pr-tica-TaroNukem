const autores = [
{
    id: 1,
    nome: "Machado de Assis",
    descricao: "Considerado um dos maiores escritores da literatura brasileira.",
    nascimento: "1839",
    nacionalidade: "Brasileiro",
    movimento: "Realismo",
    imagem: "https://s2.glbimg.com/Ecj1Ne9SZuc5gQzJC44S96yPUhk=/e.glbimg.com/og/ed/f/original/2019/05/17/machado_de_assis_real.jpg",
    destaque: true,
    livros: [
        {
            titulo: "Dom Casmurro",
            descricao: "Romance clássico sobre Bentinho e Capitu.",
            imagem: "https://m.media-amazon.com/images/I/810IAPcQmoL._UF1000,1000_QL80_.jpg"
        },
        {
            titulo: "Memórias Póstumas de Brás Cubas",
            descricao: "Narrado por um defunto autor.",
            imagem: "https://m.media-amazon.com/images/I/815u+SBDpJL.jpg"
        }
    ]
},
{
    id: 2,
    nome: "Clarice Lispector",
    descricao: "Uma das escritoras mais influentes do Brasil.",
    nascimento: "1920",
    nacionalidade: "Brasileira",
    movimento: "Modernismo",
    imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTloJ54h5oRaOsR18yI3GVij3gAu70SJJ8a9w&s",
    destaque: true,
    livros: [
        {
            titulo: "A Hora da Estrela",
            descricao: "A história de Macabéa.",
            imagem: "https://m.media-amazon.com/images/I/61TaHURu27L._AC_UF1000,1000_QL80_.jpg"
        },
        {
            titulo: "Perto do Coração Selvagem",
            descricao: "Primeiro romance da autora.",
            imagem: "https://m.media-amazon.com/images/I/71jFv8WMDwL.jpg"
        }
    ]
},
{
    id: 3,
    nome: "Jorge Amado",
    descricao: "Autor de obras marcantes da cultura brasileira.",
    nascimento: "1912",
    nacionalidade: "Brasileiro",
    movimento: "Modernismo",
    imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTICITLZuquLOKJS1QHkn0feYV7CpqM_KXTSA&s",
    destaque: false,
    livros: [
        {
            titulo: "Capitães da Areia",
            descricao: "Retrato da infância abandonada.",
            imagem: "https://m.media-amazon.com/images/I/816CKGW3kXL.jpg"
        },
        {
            titulo: "Gabriela, Cravo e Canela",
            descricao: "Clássico da literatura nacional.",
            imagem: "https://m.media-amazon.com/images/I/71fxti4ipTL.jpg"
        }
    ]
},
{
    id: 4,
    nome: "Guimarães Rosa",
    descricao: "Importante escritor mineiro.",
    nascimento: "1908",
    nacionalidade: "Brasileiro",
    movimento: "Modernismo",
    imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfQvrCcF3wRd9pfaXHmXLeg0ARkFOEutfXmw&s",
    destaque: true,
    livros: [
        {
            titulo: "Grande Sertão: Veredas",
            descricao: "Uma das maiores obras brasileiras.",
            imagem: "https://m.media-amazon.com/images/I/81NtboFZziL.jpg"
        },
        {
            titulo: "Sagarana",
            descricao: "Coletânea de contos.",
            imagem: "https://m.media-amazon.com/images/I/81VvCG8xXWL._AC_UF1000,1000_QL80_.jpg"
        }
    ]
}
];

function carregarIndex() {

    const lista = document.getElementById("lista-autores");

    if (!lista) return;

    lista.innerHTML = "";

    autores.forEach(autor => {

        lista.innerHTML += `
            <div class="card-livro">

                <img src="${autor.imagem}" alt="${autor.nome}">

                <h2>${autor.nome}</h2>

                <p>${autor.descricao}</p>

                <a href="detalhes.html?id=${autor.id}">
                    Ver Perfil
                </a>

            </div>
        `;
    });

    iniciarSlider();
}

function iniciarSlider() {

    const slideContainer = document.getElementById("slide-container");

    if (!slideContainer) return;

    const destaques = autores.filter(
        autor => autor.destaque
    );

    let indice = 0;

    function mostrarSlide() {

        const autor = destaques[indice];

        slideContainer.innerHTML = `
            <div class="slide-card">

                <img src="${autor.imagem}" alt="${autor.nome}">

                <div class="slide-info">

                    <h2>${autor.nome}</h2>

                    <p>${autor.descricao}</p>

                    <a href="detalhes.html?id=${autor.id}">
                        Ver Perfil
                    </a>

                </div>

            </div>
        `;
    }

    mostrarSlide();

    document
        .getElementById("proximo")
        ?.addEventListener("click", () => {

            indice++;

            if (indice >= destaques.length) {
                indice = 0;
            }

            mostrarSlide();
        });

    document
        .getElementById("anterior")
        ?.addEventListener("click", () => {

            indice--;

            if (indice < 0) {
                indice = destaques.length - 1;
            }

            mostrarSlide();
        });
}

function carregarDetalhes() {

    const detalhes = document.getElementById("detalhes");

    if (!detalhes) return;

    const params = new URLSearchParams(
        window.location.search
    );

    const id = Number(
        params.get("id")
    );

    const autor = autores.find(
        a => a.id === id
    );

    if (!autor) {

        detalhes.innerHTML = `
            <h2>Autor não encontrado.</h2>
        `;

        return;
    }

    detalhes.innerHTML = `
        <div class="perfil-detalhe">

            <img src="${autor.imagem}" alt="${autor.nome}">

            <div>

                <h1>${autor.nome}</h1>

                <p>${autor.descricao}</p>

                <p>
                    <strong>Nascimento:</strong>
                    ${autor.nascimento}
                </p>

                <p>
                    <strong>Nacionalidade:</strong>
                    ${autor.nacionalidade}
                </p>

                <p>
                    <strong>Movimento:</strong>
                    ${autor.movimento}
                </p>

            </div>

        </div>
    `;

    const livros = document.getElementById("livros");

    livros.innerHTML = "";

    autor.livros.forEach(livro => {

        livros.innerHTML += `
            <div class="card-livro">

                <img src="${livro.imagem}" alt="${livro.titulo}">

                <h3>${livro.titulo}</h3>

                <p>${livro.descricao}</p>

            </div>
        `;
    });
}

carregarIndex();
carregarDetalhes();