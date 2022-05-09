interface IGet {
    (argument: {
        url: string;
        headers?: Record<string, string[]>;
        cookies?: Record<string, string>;
        digestAuth?: boolean;
        authUrl?: string;
        followRedirects?: boolean;
    }): Promise<any>;
    (argument: {
        scheme: string;
        host: string;
        path: string;
        query?: Record<string, string[]>;
        fragment?: string;
        username?: string;
        password?: string;
        headers?: Record<string, string[]>;
        cookies?: Record<string, string>;
        digestAuth?: boolean;
        authUrl?: string;
        followRedirects?: boolean;
    }): Promise<any>;
}
interface IPost {
    (arguments: {
        url: string;
        headers?: Record<string, string[]>;
        body: string;
        cookies?: Record<string, string>;
        authUrl?: string;
        followRedirects?: boolean;
    }): Promise<any>;
    (arguments: {
        url: string;
        headers: {
            'Content-Type': ['mulipart/form-data'];
            [key: string]: string[];
        };
        form: Record<string, string>;
        cookies?: Record<string, string>;
        authUrl?: string;
        followRedirects?: boolean;
    }): Promise<any>;
    (arguments: {
        scheme: string;
        host: string;
        path: string;
        query?: Record<string, string[]>;
        fragment?: string;
        username?: string;
        password?: string;
        headers?: Record<string, string[]>;
        body: string;
        cookies?: Record<string, string>;
        authUrl?: string;
        followRedirects?: boolean;
    }): Promise<any>;
    (arguments: {
        scheme: string;
        host: string;
        path: string;
        query?: Record<string, string[]>;
        fragment?: string;
        username?: string;
        password?: string;
        headers: {
            'Content-Type': ['mulipart/form-data'];
            [key: string]: string[];
        };
        form: Record<string, string>;
        cookies?: Record<string, string>;
        authUrl?: string;
        followRedirects?: boolean;
    }): Promise<any>;
}
interface IPut {
    (): Promise<any>;
}
interface IPatch {
    (): Promise<any>;
}
interface IDelete {
    (): Promise<any>;
}
interface IHead {
    (): Promise<any>;
}

export interface HTTP {
    get: IGet;
    post: IPost;
    put: IPut;
    patch: IPatch;
    delete: IDelete;
    head: IHead;
}
