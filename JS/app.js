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

function fotografias() {
  app.innerHTML = /*html*/ `
        <section class="d-flex justify-content-center align-items-center flex-column min-vh-100">
            <p class="fs-3 fw-bold text-success">Usuário logado!</p>
            <p>Próximas atualizações em breve!</p>
            <button id="logout" class="btn btn-danger w-25">Sair</button>
        </section>
    `;

  const sair = document.querySelector("#logout");

  sair.addEventListener("click", () => Login()); //Arrow function não precisa de chaves para satisfazer um único comando!
}

function Login() {
  app.innerHTML = /*html*/ `
    <section>
        <form action="" class="d-flex flex-column w-50 m-auto mt-5 " id="formulario">
            <label for="usuario">Digite o seu nome de usuário:</label>
            <input type="text" name="" id="usuario">

            <label for="senha" class="mt-4">Digite a sua senha:</label>
            <input type="password" name="" id="senha">

            <p class="text-danger" id="mensagemErro"></p>

            <button type="submit" id="entrar" class="btn btn-success">Entrar</button>
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
