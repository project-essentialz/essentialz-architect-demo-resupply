import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";
import {TPLOrganization} from "../domain";
import {Deserialize, GenericDeserialize} from 'cerialize';

export type HTTPMethod = 'post' | 'put' | 'get' | 'delete';

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

    const _camelCaseKeys = (json: any) => {
        return camelcaseKeys(json, {deep: true})
    }
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
     *
     * Use parameter className optionally if you want
     * the service to bring back the typed object.
     *
     * @param id: string | number
     * @param clazz: string
     */
    const get = (id: string | number, clazz?: any) => {
        return fetch(_getUrl(`/${id}`), _getOptions(method.get))
            .then((response: Response) => response.json().then((json: any) => {
                if (clazz){
                    let object = GenericDeserialize(json, clazz);
                    return object as T;
                }else{
                    const data = _camelCaseKeys(json);
                    return data as T;
                }
            }));
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
     * Performs HTTP GET request to retrieve all resources from the given type
     * @param q: string
     * @param clazz: Class to deserialize to
     */
    const getAll = (q?: string, clazz?: any) => {
        return fetch(_getUrl(q ? `?${q} `: ''), _getOptions(method.get))
            .then((response: Response) => {
                if (response.ok){
                    return response.json().then((json: any) => {
                        if (clazz){
                            let objects = GenericDeserialize(json, clazz);
                            return objects as T[];
                        }else{
                            return _camelCaseKeys(json) as T[];
                        }

                    })

                }
                return [];
            })
    }

    /**
     *
     * @param body: Generic Type
     */
    const create = (body: T) => {
        return fetch(_getUrl(), _getOptions(method.post, body))
            .then((response: Response) => {
                if (response.ok){
                    return response.json().then((json: any) => _camelCaseKeys(json) as T)
                }else{
                    throw new Error("Save error")
                }
            })
    }

    /**
     * Performs HTTP PUT request against the id with the given target data to update
     * @param id: string
     * @param data: Generic Type
     */
    const update = (id: string, data: T) => {
        return fetch(_getUrl(`/${id}`), _getOptions(method.update, data))
            .then((response: Response) => response.json().then((json: any) => _camelCaseKeys(json) as T))
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
                return response.json().then((json: any) => _camelCaseKeys(json) as T)
            } else {
                throw new HTTPError(response.status);
            }

        })
    }

    /**
     *
     * @param formData: FormData
     */
    const upload = (formData: FormData): Promise<any> => {
        return fetch(_getUrl(), {
            method: method.post,
            redirect: 'follow',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        }).then(response => response.json())
            .then(json => _camelCaseKeys(json))
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


const ClassStore: any = {
    TPLOrganization
}
class ObjectFactory {
    static create(className: string) {
        let obj;
        eval("obj=new " + className + "()");
        return obj;
    }
}
