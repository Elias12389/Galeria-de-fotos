//API para os usuários (parte 1): https://jsonplaceholder.typicode.com/users
//API para as fotografias (parte 2): https://jsonplaceholder.typicode.com/photos

//Usuário para login e senha
//Usuário: Bret | Senha: Sincere@april.biz

const app = document.querySelector("#app");

//Criando a função assíncrona para o consumo da API
async function buscarUsuario(nomeUsuario, mensagemErro, senha) {
  const response = await fetch("https://jsonplaceholder.typicode.com/users"); //Precisamos usar o await para o JS entender que precisa esperar a requisição terminar antes de continuar o código

  const usuarios = await response.json(); //Usamos o await para que antes de atribuir o valor a variável, ele possa terminar a conversão tranquilamente

  const consultarUsuario = usuarios.find((usuario) => {
    return usuario.username === nomeUsuario && usuario.email === senha;
  });

  if (consultarUsuario) {
    fotografias();
  } else {
    mensagemErro.textContent = "Usuário não encontrado/inválido";
  }
}

async function fotografias() {
  //Mensagem que indica o carregamento das fotos para o usuário (assim que elas são carregas, o innerHTML é atualizado)
  app.innerHTML = /*html*/ `
    <div class="d-flex flex-column align-items-center">
      <section class="text-center bg-body rounded-4 p-3 caixa mt-5">
        <p>Carregando fotos... <br> (Isso pode demorar um pouco)</p>
      </section>
    </div>
  `;
  const response = await fetch("https://jsonplaceholder.typicode.com/photos");
  if (!response.ok) {
    return (app.innerHTML = /*html */ `<div class="d-flex flex-column align-items-center mt-5"><section class="text-center bg-body rounded-4 p-3 caixa"><p>Não foi possível carregar as fotografias. <br> Tente novamente mais tarde</p></section></div>`);
  }
  const fotos = await response.json();

  //Método slice(), que serve para percorrer o array só até o elemento 50
  const fotosOrganizadas = fotos.slice(0, 50);

  console.log(fotosOrganizadas);
  //Método map(), serve para percorrer a lista e aplicar um elemento para cada array, criando um novo array
  const fotosMapeados = fotosOrganizadas.map((foto) => {
    return `<div class="card mb-1"><p>${foto.title}</p> <img src="${foto.thumbnailUrl}" data-url="${foto.url}" data-thumbnail="${foto.thumbnailUrl}" class="thumbnail"></div> `;
  });

  //Método join(), junta todos os elementos dentrode uma única string e formata o documento
  const fotosArrumadas = fotosMapeados.join(" ");

  //instalei uma extensão que me ajudou a escrever o código como se fosse em um arquivo HTML
  app.innerHTML = /*html*/ `
        <section class="d-flex justify-content-center align-items-center min-vw-100 flex-column">
            <h1 class="text-light">Galeria de fotos</h1>
            <div class="bg-body p-4 rounded-4 ">
              ${fotosArrumadas}
            </div>
            <button id="logout" class="btn btn-danger mt-4 w-25 h-25">Sair</button>
        </section>
    `;

  //Serve para selecionar todos os elementos com a classe miniatura, colocando eles dentro de uma lista
  const miniaturas = document.querySelectorAll(".thumbnail");

  //ForEach() para poder acessar cada miniatura e seus atributos dentro do innerHTML
  miniaturas.forEach((foto) => {
    foto.addEventListener("click", () => {
      //if para que a thumbnail volte a ser a foto em miniatura (conforme o JSON)
      if (foto.src !== foto.dataset.url) {
        foto.src = foto.dataset.url;
      } else {
        foto.src = foto.dataset.thumbnail;
      }

      console.log(foto.src);
      //Vai selecionar o elemento pai daquele objeto, permitindo pegar o titulo da div daquele elemento
      foto.parentElement.classList.toggle("imagemAumentada");
    });
  });
  const sair = document.querySelector("#logout");

  sair.addEventListener("click", () => Login()); //Arrow function não precisa de chaves para satisfazer um único comando!
}

function Login() {
  app.innerHTML = /*html*/ `
    <section>
        <form action="" class="d-flex flex-column w-50 m-auto mt-5 bg-body p-4 rounded-5 caixa" id="formulario">
            <label for="usuario">Digite o seu nome de usuário:</label>
            <input type="text" name="" id="usuario">

            <label for="senha" class="mt-4">Digite a sua senha:</label>
            <input type="password" name="" id="senha">

            <p class="text-danger" id="mensagemErro"></p>

            <button type="submit" id="entrar" class="btn btn-success rounded-4">Entrar</button>
        </form>
    </section>
    
    `;
  let mensagemErro = document.querySelector("#mensagemErro");

  const formulario = document.querySelector("#formulario");
  formulario.addEventListener("submit", (e) => {
    e.preventDefault(); //Garante que a página não seja recarregada

    let usuario = document.querySelector("#usuario").value.trim();
    let senha = document.querySelector("#senha").value.trim();

    if (usuario === "" || senha === "") {
      return (mensagemErro.textContent = "Campos inválidos, digite novamente!");
    }
    mensagemErro.textContent = "";

    //Precisamos passar a mensagem de erro para que o elemento esteja disponível para a outra função
    buscarUsuario(usuario, mensagemErro, senha);
  });
}

//Chamando o login para que ele carregue na tela
Login();
