import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

type HTTPMethod = 'post' | 'put' | 'get' | 'delete';

type ApiResponseError = {
    additionalData: any,
    message: string
}

export class HTTPError {
    status: number

    constructor(status: number) {
        this.status = status
    }
}

const api = <T>(base: string, resource: string, token?: string) => {
    const _getUrl = (q?: string) => {
        if (q){
            return `${base}/${resource}${q}`;
        }
        return `${base}/${resource}`;

    }
    const _getOptions = (method: string, body?: any) => {
        let headers: any = {
            'Content-Type': 'application/json'
        }

        if (token) {
            headers = {
                ...headers,
                'Authorization': `Bearer ${token}`,
            }
        }
        return {
            method: method,
            headers: headers,
            body: body ? JSON.stringify(snakecaseKeys(body)) : null
        }
    }


    /**
     * Perform HTTP GET request to retrieve a resource
     * with the given ID
     * @param id: string | number
     */
    const get = (id: string | number) => {
        return fetch(_getUrl(`/${id}`), _getOptions(method.get))
            .then((response: Response) => response.json().then((json: any) => camelcaseKeys(json) as T))
    }

    /**
     * Perform HTTP DELETE request to delete a resource
     * with the given ID
     * @param id: string | number
     */
    const remove = (id: string | number) => {
        return fetch(_getUrl(`/${id}`), _getOptions(method.delete)).then(() => {})
    }

    /**
     * Perform HTTP GET request to retrieve all resources
     * from the given type
     */
    const getAll = (q?: string) => {
        return fetch(_getUrl(q ? `?${q} `: ''), _getOptions(method.get))
            .then((response: Response) => response.json().then((json: any) => camelcaseKeys(json) as T[]))
    }

    const create = (body: T) => {
        return fetch(_getUrl(), _getOptions(method.post, body))
            .then((response: Response) => response.json().then((json: any) => camelcaseKeys(json) as T))
    }

    const update = (id: string, data: T) => {
        return fetch(_getUrl(`/${id}`), _getOptions(method.update, data))
            .then((response: Response) => response.json().then((json: any) => camelcaseKeys(json) as T))
    }

    /**
     * Custom API Call
     * @param method : HTTPMethod
     * @param body : any
     */
    const call = (method: HTTPMethod, body: any): Promise<T> => {
        return fetch(
            _getUrl(),
            _getOptions(method, body)
        ).then((response: Response) => {
            if (response.ok) {
                return response.json().then((json: any) => camelcaseKeys(json) as T)
            } else {
                throw new HTTPError(response.status);
            }

        })
    }

    const upload = (formData: FormData): Promise<any> => {
        return fetch(_getUrl(), {
            method: method.post,
            redirect: 'follow',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        }).then(response => response.json())
            .then(json => camelcaseKeys(json))
    }

    return {
        get,
        getAll,
        create,
        remove,
        update,
        call,
        upload
    }
}

class Api {
    private static instance: Api;
    token?: string
    baseUrl?: string;

    private constructor() {
    }

    public static $ = <T>(resource: string) => {
        return Api.instance.callable<T>(resource);
    }

    public static configure = (baseUrl: string) => {
        if (!Api.instance) {
            Api.instance = new Api();
        }
        Api.instance.baseUrl = baseUrl;
    }

    public static setToken = (token: string) => {
        Api.instance.token = token;
    }

    private callable = <T>(resource: string) => api<T>(this.baseUrl!, resource, this.token)
}

export const method = {
    post: 'post' as HTTPMethod,
    get: 'get' as HTTPMethod,
    delete: 'delete' as HTTPMethod,
    update: 'put' as HTTPMethod
}
export default Api;

