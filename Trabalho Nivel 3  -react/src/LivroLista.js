import React, { useState, useEffect } from 'react';
import ControleEditora, { editoras } from './controle/ControleEditora';
import ControleLivros, { livros } from './controle/ControleLivro';

// a) Instanciando os controladores de livros e editoras
const controleLivro = new ControleLivros(livros);
const controleEditora = new ControleEditora(editoras);

// b) Definição do componente auxiliar LinhaLivro
const LinhaLivro = (props) => {
    const { livro, excluir } = props;

    // c) Definindo nomeEditora a partir de getNomeEditora
    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

    return (
        <tr>
            {/* e) Adicionando o botão de exclusão */}
            <td>
                <div>{livro.titulo}</div>
                <button onClick={() => excluir(livro.codigo)}>Excluir</button>
            </td>
            <td>{livro.resumo}</td>
            <td>{nomeEditora}</td>
            {/* f) Exibindo autores como uma lista */}
            <td>
                <ul>
                    {livro.autores.map((autor, index) => (
                        <li key={index}>{autor}</li>
                    ))}
                </ul>
            </td>
        </tr>
    );
};

// g) Definição do componente LivroLista
const LivroLista = () => {
    // h) Definindo as propriedades 'livros' e 'carregado'
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);

    // i) Hook useEffect para carregar livros
    useEffect(() => {
        if (!carregado) {
            const livrosObtidos = controleLivro.obterLivros();
            setLivros(livrosObtidos);
            setCarregado(true);
        }
    }, [carregado]);

    // j) Método excluir
    const excluir = (codigo) => {
        controleLivro.excluir(codigo);
        setCarregado(false); // Forçar o redesenho da página
    };

    // k) Retorno do componente com a área principal
    return (
        <main>
            <h1>Catálogo de Livros</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Resumo</th>
                        <th>Editora</th>
                        <th>Autores</th>
                    </tr>
                </thead>
                <tbody>
                    {/* l) Gerar as linhas de livros com map */}
                    {livros.map((livro) => (
                        <LinhaLivro
                            key={livro.codigo}
                            livro={livro}
                            excluir={excluir}
                        />
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export default LivroLista;
