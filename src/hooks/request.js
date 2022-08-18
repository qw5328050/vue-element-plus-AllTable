import {ref} from vue
function api (url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({data: [], code: 200})
        }, 300)
    })
}

const useRequest = function (url) {
    let loading = ref(false);
    let result = ref(null);
    api(url).then(res => {
        if (res && res.code == 200) {
            loading = true
            result = res.data
        }
    })
    return {
        loading,
        result
    }
}

export default useRequest