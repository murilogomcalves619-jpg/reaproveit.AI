const cards = document.querySelectorAll(".ingredient-card");

const placeholder = document.getElementById("placeholder");

const recipesContent =
    document.getElementById("recipesContent");

const selectedIngredient =
    document.getElementById("selectedIngredient");

const recipeList =
    document.getElementById("recipeList");

const closeRecipes =
    document.getElementById("closeRecipes");

const contador =
    document.getElementById("contador");


/* =========================
   THEMEALDB
========================= */

const API_BASE =
    "https://www.themealdb.com/api/json/v1/1/";


/* =========================
   TRADUÇÃO DOS NOMES
========================= */

const traducaoReceitas = {

    "Chicken": "Frango",

    "Beef": "Carne bovina",

    "Pork": "Carne suína",

    "Fish": "Peixe",

    "Rice": "Arroz",

    "Corn": "Milho",

    "Banana": "Banana",

    "Apple": "Maçã",

    "Orange": "Laranja",

    "Pineapple": "Abacaxi",

    "Mango": "Manga",

    "Strawberry": "Morango",

    "Watermelon": "Melancia",

    "Avocado": "Abacate",

    "Pear": "Pera",

    "Lime": "Limão",

    "Tomato": "Tomate",

    "Potato": "Batata",

    "Onion": "Cebola",

    "Carrot": "Cenoura",

    "Broccoli": "Brócolis",

    "Cabbage": "Repolho",

    "Cucumber": "Pepino",

    "Pumpkin": "Abóbora",

    "Zucchini": "Abobrinha",

    "Beetroot": "Beterraba",

    "Cauliflower": "Couve-flor",

    "Spinach": "Espinafre",

    "Kale": "Couve",

    "Egg": "Ovo",

    "Milk": "Leite",

    "Cheddar": "Queijo",

    "Yogurt": "Iogurte",

    "Butter": "Manteiga",

    "Bread": "Pão",

    "Pasta": "Macarrão",

    "Flour": "Farinha",

    "Ham": "Presunto",

    "Sausage": "Linguiça",

    "Beans": "Feijão",

    "Oats": "Aveia"

};


/* =========================
   INGREDIENTES
========================= */

contador.textContent =
    `${cards.length} alimentos`;


/* =========================
   CLICAR NO INGREDIENTE
========================= */

cards.forEach(card => {

    card.addEventListener("click", () => {

        cards.forEach(item => {

            item.classList.remove("selected");

        });

        card.classList.add("selected");

        const nome =
            card.dataset.name;

        const ingrediente =
            card.dataset.api;

        buscarReceitas(
            nome,
            ingrediente
        );

    });

});


/* =========================
   BUSCAR RECEITAS
========================= */

async function buscarReceitas(
    nome,
    ingrediente
) {

    placeholder.style.display =
        "none";

    recipesContent.classList.add(
        "active"
    );

    selectedIngredient.textContent =
        nome;

    recipeList.innerHTML = `

        <div class="loading">

            <div class="loading-circle"></div>

            Procurando receitas...

        </div>

    `;


    try {

        const url =
            API_BASE +
            `filter.php?i=${encodeURIComponent(ingrediente)}`;


        const resposta =
            await fetch(url);


        if (!resposta.ok) {

            throw new Error(
                "Erro na comunicação com a API."
            );

        }


        const dados =
            await resposta.json();


        mostrarReceitas(
            dados.meals
        );


    } catch (erro) {

        console.error(
            "Erro:",
            erro
        );

        recipeList.innerHTML = `

            <div class="no-recipes">

                <strong>
                    Não foi possível buscar as receitas.
                </strong>

                <br><br>

                Verifique sua conexão com a internet
                e tente novamente.

            </div>

        `;

    }

}


/* =========================
   MOSTRAR RECEITAS
========================= */

function mostrarReceitas(receitas) {

    if (
        !receitas ||
        receitas.length === 0
    ) {

        recipeList.innerHTML = `

            <div class="no-recipes">

                Não encontramos receitas para
                este ingrediente na TheMealDB.

            </div>

        `;

        return;

    }


    /*
        Mostra no máximo 6 receitas.
    */

    const receitasExibidas =
        receitas.slice(0, 6);


    recipeList.innerHTML =
        receitasExibidas.map(
            receita => {

                const nomeTraduzido =
                    traduzirNomeReceita(
                        receita.strMeal
                    );


                return `

                    <article class="recipe-card">

                        <img
                            class="recipe-image"
                            src="${receita.strMealThumb}"
                            alt="${nomeTraduzido}"
                        >

                        <div class="recipe-info">

                            <h3>
                                ${nomeTraduzido}
                            </h3>

                            <button
                                onclick="verReceita('${receita.idMeal}')"
                            >

                                Ver receita

                            </button>

                        </div>

                    </article>

                `;

            }
        ).join("");

}


/* =========================
   TRADUZIR NOME DA RECEITA
========================= */

function traduzirNomeReceita(nome) {

    if (
        traducaoReceitas[nome]
    ) {

        return traducaoReceitas[nome];

    }


    /*
        Algumas receitas da API
        possuem nomes maiores.

        Aqui fazemos algumas
        substituições simples.
    */

    let nomeTraduzido =
        nome;


    nomeTraduzido =
        nomeTraduzido.replace(
            /Chicken/gi,
            "Frango"
        );

    nomeTraduzido =
        nomeTraduzido.replace(
            /Beef/gi,
            "Carne bovina"
        );

    nomeTraduzido =
        nomeTraduzido.replace(
            /Pork/gi,
            "Carne suína"
        );

    nomeTraduzido =
        nomeTraduzido.replace(
            /Rice/gi,
            "Arroz"
        );

    nomeTraduzido =
        nomeTraduzido.replace(
            /Potato/gi,
            "Batata"
        );

    nomeTraduzido =
        nomeTraduzido.replace(
            /Tomato/gi,
            "Tomate"
        );

    nomeTraduzido =
        nomeTraduzido.replace(
            /Cheese/gi,
            "Queijo"
        );

    nomeTraduzido =
        nomeTraduzido.replace(
            /Egg/gi,
            "Ovo"
        );

    nomeTraduzido =
        nomeTraduzido.replace(
            /Bread/gi,
            "Pão"
        );

    nomeTraduzido =
        nomeTraduzido.replace(
            /Pasta/gi,
            "Macarrão"
        );


    return nomeTraduzido;

}


/* =========================
   ABRIR RECEITA COMPLETA
========================= */

async function verReceita(id) {

    recipeList.innerHTML = `

        <div class="loading">

            <div class="loading-circle"></div>

            Carregando receita...

        </div>

    `;


    try {

        const resposta =
            await fetch(
                `${API_BASE}lookup.php?i=${id}`
            );


        if (!resposta.ok) {

            throw new Error(
                "Erro ao buscar receita."
            );

        }


        const dados =
            await resposta.json();


        if (
            !dados.meals ||
            dados.meals.length === 0
        ) {

            throw new Error(
                "Receita não encontrada."
            );

        }


        const receita =
            dados.meals[0];


        /* =========================
           INGREDIENTES
        ========================== */

        let ingredientes = [];


        for (
            let i = 1;
            i <= 20;
            i++
        ) {

            const ingrediente =
                receita[
                    `strIngredient${i}`
                ];


            const medida =
                receita[
                    `strMeasure${i}`
                ];


            if (
                ingrediente &&
                ingrediente.trim() !== ""
            ) {

                const ingredienteTraduzido =
                    traduzirIngrediente(
                        ingrediente
                    );


                ingredientes.push(
                    `${medida || ""} ${ingredienteTraduzido}`
                );

            }

        }


        /* =========================
           NOME DA RECEITA
        ========================== */

        const nome =
            traduzirNomeReceita(
                receita.strMeal
            );


        /* =========================
           HTML
        ========================== */

        recipeList.innerHTML = `

            <article class="recipe-detail">

                <img
                    class="recipe-detail-image"
                    src="${receita.strMealThumb}"
                    alt="${nome}"
                >


                <h3>
                    ${nome}
                </h3>


                <strong class="recipe-section-title">
                    Ingredientes
                </strong>


                <div class="recipe-ingredients">

                    ${ingredientes.join("<br>")}

                </div>


                <strong class="recipe-section-title">
                    Modo de preparo
                </strong>


                <div class="recipe-instructions">

                    ${receita.strInstructions}

                </div>


                ${
                    receita.strYoutube
                    ?
                    `
                    <a
                        class="youtube-button"
                        href="${receita.strYoutube}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >

                        Ver vídeo da receita

                    </a>
                    `
                    :
                    ""
                }

            </article>

        `;


        /*
            Faz o painel voltar
            para o topo.
        */

        recipesContent.scrollTop = 0;


    } catch (erro) {

        console.error(
            "Erro:",
            erro
        );


        recipeList.innerHTML = `

            <div class="no-recipes">

                Não foi possível carregar
                os detalhes desta receita.

            </div>

        `;

    }

}


/* =========================
   TRADUZIR INGREDIENTES
========================= */

function traduzirIngrediente(
    ingrediente
) {

    const mapa = {

        "Chicken": "Frango",
        "Chicken Breast": "Peito de frango",

        "Beef": "Carne bovina",
        "Beef Mince": "Carne moída",

        "Pork": "Carne suína",

        "Rice": "Arroz",
        "Corn": "Milho",
        "Oats": "Aveia",

        "Beans": "Feijão",

        "Banana": "Banana",
        "Apple": "Maçã",
        "Orange": "Laranja",
        "Papaya": "Mamão",
        "Watermelon": "Melancia",
        "Pineapple": "Abacaxi",
        "Mango": "Manga",
        "Strawberry": "Morango",
        "Grapes": "Uva",
        "Lime": "Limão",
        "Avocado": "Abacate",
        "Pear": "Pera",

        "Tomato": "Tomate",
        "Potato": "Batata",
        "Onion": "Cebola",
        "Carrot": "Cenoura",
        "Broccoli": "Brócolis",
        "Cabbage": "Repolho",
        "Cucumber": "Pepino",
        "Bell Pepper": "Pimentão",
        "Pumpkin": "Abóbora",
        "Zucchini": "Abobrinha",
        "Beetroot": "Beterraba",
        "Cauliflower": "Couve-flor",

        "Kale": "Couve",
        "Spinach": "Espinafre",

        "Egg": "Ovo",
        "Milk": "Leite",
        "Cheddar": "Queijo cheddar",
        "Cheese": "Queijo",
        "Yogurt": "Iogurte",
        "Butter": "Manteiga",

        "Bread": "Pão",
        "Pasta": "Macarrão",
        "Flour": "Farinha",
        "Biscuit": "Biscoito",

        "Ham": "Presunto",
        "Sausage": "Linguiça",

        "Salt": "Sal",
        "Pepper": "Pimenta",
        "Garlic": "Alho",
        "Water": "Água",
        "Oil": "Óleo",
        "Olive Oil": "Azeite",
        "Sugar": "Açúcar",
        "Cream": "Creme de leite",
        "Butter": "Manteiga"

    };


    if (
        mapa[ingrediente]
    ) {

        return mapa[ingrediente];

    }


    return ingrediente;

}


/* =========================
   FECHAR RECEITAS
========================= */

closeRecipes.addEventListener(
    "click",
    () => {

        recipesContent.classList.remove(
            "active"
        );

        placeholder.style.display =
            "flex";


        cards.forEach(card => {

            card.classList.remove(
                "selected"
            );

        });

    }
);