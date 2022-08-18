import { Ref, ref, reactive, watch } from "vue";
const data = {
    search (value) {
        console.log(value)
        let testHook = ref(1000);
        watch(value, () => {
            console.log(formInline)
        })
    },
}
export default data