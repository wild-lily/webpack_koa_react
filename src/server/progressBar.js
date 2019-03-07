const slog = require('single-line-log').stdout;

function ProgressBar(description, bar_length) {
    this.description = description || 'Progress';
    this.length = bar_length || 25;

    this.render = (opts) => {
        const percent = (opts.completed / opts.total).toFixed(4);
        const cell_num = Math.floor(percent * this.length);
        let cell = '';
        let empty = '';
        for (let i = 0; i < cell_num; i++) {
            cell += '█';
        }
        for (let i = 0; i < this.length - cell_num; i++) {
            empty += '░';
        }
        const cmdText = `  ${this.description}: ${cell}${empty} ${(100 * percent).toFixed(2)}%
`;
        slog(cmdText);
    };
}


export default ProgressBar;
