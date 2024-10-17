export default class Exercice {
    fen: string;
    expectedCells: Array<string>;

    constructor(fen: string, expectedCells: Array<string>) {
        this.fen = fen;
        this.expectedCells = expectedCells;
    }

    getGoodCellsFromSubmission(submittedCells: Array<string>) : Array<string> {
        return submittedCells.filter((cell) => this.expectedCells.includes(cell));
    }

    getWrongCellsFromSubmission(submittedCells: Array<string>) : Array<string> {
        return submittedCells.filter((cell) => !this.expectedCells.includes(cell));
    }

    getMissingCellsFromSubmission(submittedCells: Array<string>) : Array<string> {
        return this.expectedCells.filter((cell) => !submittedCells.includes(cell));
    }
}