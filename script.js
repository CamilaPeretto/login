const loginForm = document.getElementById('loginForm');
const cadastroForm = document.getElementById('cadastroForm');
const cadastroCard = document.getElementById('cadastroCard');

const mostrarCadastro = document.getElementById('mostrarCadastro');
const esconderCadastro = document.getElementById('esconderCadastro');

const loginMsg = document.getElementById('loginMsg');
const cadastroMsg = document.getElementById('cadastroMsg');

// Pega os usuários salvos no localStorage
function getUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

// Salva os usuários no localStorage
function salvarUsuarios(lista) {
  localStorage.setItem("usuarios", JSON.stringify(lista));
}

// Mostrar cadastro
mostrarCadastro.onclick = () => {
  cadastroCard.classList.remove('hidden');
  loginMsg.textContent = '';
};

// Esconder cadastro
esconderCadastro.onclick = () => {
  cadastroCard.classList.add('hidden');
  cadastroMsg.textContent = '';
};

// Cadastro
cadastroForm.onsubmit = (e) => {
  e.preventDefault();

  const nome = document.getElementById('cadastroNome').value.trim();
  const email = document.getElementById('cadastroEmail').value.trim();
  const senha = document.getElementById('cadastroSenha').value;
  const confirmar = document.getElementById('cadastroConfirmar').value;

  const usuarios = getUsuarios();

  if (senha !== confirmar) {
    cadastroMsg.textContent = "As senhas não coincidem.";
    return;
  }

  const existe = usuarios.some(u => u.email === email);
  if (existe) {
    cadastroMsg.textContent = "Email já cadastrado.";
    return;
  }

  usuarios.push({ nome, email, senha });
  salvarUsuarios(usuarios);

  cadastroMsg.style.color = "green";
  cadastroMsg.textContent = "Cadastro realizado com sucesso!";
  cadastroForm.reset();
};

// Login
loginForm.onsubmit = (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const senha = document.getElementById('loginSenha').value;

  const usuarios = getUsuarios();
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (usuario) {
    loginMsg.style.color = "green";
    loginMsg.textContent = `Bem-vindo(a), ${usuario.nome}!`;
    loginForm.reset();
  } else {
    loginMsg.style.color = "red";
    loginMsg.textContent = "Email ou senha inválidos.";
  }
};
