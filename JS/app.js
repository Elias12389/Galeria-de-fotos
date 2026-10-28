//API para os usuários (parte 1): https://jsonplaceholder.typicode.com/users
//API para as fotografias (parte 2): https://jsonplaceholder.typicode.com/photos
const app = document.querySelector("#app");
fetch("https://jsonplaceholder.typicode.com/users"); //fetch para login do usuário

function Login() {
  app.innerHTML = /*html*/ `
    <section>
        <form action="" class="d-flex flex-column w-50 m-auto mt-5 " id="formulario">
            <label for="nome">Digite o seu nome:</label>
            <input type="text" name="" id="nome">

            <label for="senha">Digite a sua senha:</label>
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

    let nome = document.querySelector("#nome").value.trim();
    let senha = document.querySelector("#senha").value.trim();

    if (nome === "" || senha === "") {
      return (mensagemErro.textContent = "Campos inválidos, digite novamente!");
    }
    mensagemErro.textContent = "";

    console.log(nome + senha);
  });
}

//Chamando o login para que ele carregue na tela
Login();
