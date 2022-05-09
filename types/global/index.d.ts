declare namespace NodeJS {
    export interface Module {
        hot: {
            accept: (...args: any[]) => any;
        };
    }
}
