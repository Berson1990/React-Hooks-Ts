import { useReducer, useCallback } from "react";
import HttpType from '../components/types/HttpType';

const initialState = {
    loading: false,
    error: null,
    data: null,
    extra: null,
    identifier: ''
}
const httpReducer = (curHttpState: HttpType, action: any) => {
    switch (action.type) {
        case 'SEND':
            return { loading: true, error: null, data: null, extra: null, identifier: action.identifier };
        case 'RESPONSE':
            return { ...curHttpState, loading: false, data: action.responseData, extra: action.extra };
        case 'ERROR':
            return { ...curHttpState, loading: false, error: action.errorMessage };
        case 'CLEAR':
            return initialState
        default:
            throw new Error('Shoud not be reached !');

    }
}
const useHttp = () => {
    const [htppState, dispatchHttp] = useReducer(httpReducer, initialState)
    const clear: any = useCallback(() => dispatchHttp({ type: clear }), []);

    const sendRequest = useCallback((url: string, method: string, body: any = null, reqExtra: any = null, identifier) => {

        dispatchHttp({ type: 'SEND', identifier: identifier });
        fetch(url,
            {
                method: method,
                body: body,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                return response.json();
            })
            .then(resonseData => {
                dispatchHttp({ type: 'RESPONSE', responseData: resonseData, extra: reqExtra })
            })
            .catch(error => {
                dispatchHttp({
                    type: 'ERROR', errorMessage: 'Somthing went wrong'
                });
            });
    }, [])

    return {
        isLoading: htppState.loading,
        data: htppState.data,
        error: htppState.error,
        sendRequest: sendRequest,
        reqExtra: htppState.extra,
        reqIdentifier: htppState.identifier,
        clear: clear
    }
}
export default useHttp;