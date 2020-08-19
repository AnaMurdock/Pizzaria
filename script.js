const dqs = (el) => document.querySelector(el);
const dqsa = (el) => document.querySelectorAll(el);

let modalQtd = 1;

// Listagem das pizzas
pizzaJson.map((item, index) => {
    // Clona estrutura HTML
    let pizzaItem = dqs('.models .pizza-item').cloneNode(true);

    // Seta atributo
    pizzaItem.setAttribute('data-key', index);

    // Substitui conteúdo do template
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        // Interrompe ação padrão da tag a
        e.preventDefault();

        // Procura o pizza-item mais próximo à tag a
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQtd = 1;

        // Preenche informações do modal
        dqs('.pizzaBig img').src = pizzaJson[key].img;
        dqs('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        dqs('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        dqs('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;

        // Remove seleção ativa do tamanho
        dqs('.pizzaInfo--size.selected').classList.remove('selected');

        // Seleciona como padrão a maior opção de tamanho
        dqsa('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if(sizeIndex == 2){
                size.classList.add('selected');
            }
            
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        })

        // Atualiza quantidade selecionada
        dqs('.pizzaInfo--qt').innerHTML = modalQtd;

        // Transição ao abrir modal
        dqs('.pizzaWindowArea').style.opacity = 0;
        dqs('.pizzaWindowArea').style.display = 'flex';

        setTimeout(() => {
            dqs('.pizzaWindowArea').style.opacity = 1;
        }, 200)
    })

    // Aplica informações em pizza-item
    dqs('.pizza-area').append(pizzaItem);
});


// Eventos do modal

function closeModal(){
    // Transição ao fechar modal
    dqs('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        dqs('.pizzaWindowArea').style.display = 'none';
    }, 200)
}

// Fecha modal
dqsa('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
})

// Diminui quantidade ao clique
dqs('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if(modalQtd > 1){
        modalQtd--;
        dqs('.pizzaInfo--qt').innerHTML = modalQtd;
    }
});

// Aumenta quantidade ao clique
dqs('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQtd++;
    dqs('.pizzaInfo--qt').innerHTML = modalQtd;
});

// Troca seleção de tamanho
dqsa('.pizzaInfo--size').forEach((size) => {
    size.addEventListener('click', () => {
        dqs('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});