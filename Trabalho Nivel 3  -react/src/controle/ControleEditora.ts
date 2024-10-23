import Editora from "../modelo/Editora";

export let editoras: Array<Editora> = [
    { codEditora: 1, nome: "Editora A" },
    { codEditora: 2, nome: "Editora B" },
    { codEditora: 3, nome: "Editora C" }
];

class ControleEditora {
    editoras: Array<Editora>;

    constructor(editoras: Array<Editora>) {
        this.editoras = editoras;
    }

    // Método para retornar o vetor editoras
    public getEditoras(): Array<Editora> {
        return this.editoras;
    }

    // Método para retornar o nome da editora pelo codEditora
    public getNomeEditora(codEditora: number): String | undefined {
        const editora = this.editoras.filter(e => e.codEditora === codEditora);
        return editora.length > 0 ? editora[0].nome : undefined;
    }
}

export default ControleEditora;