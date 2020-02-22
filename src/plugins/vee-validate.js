import Vue from "vue"
import { ValidationProvider, ValidationObserver, extend } from "vee-validate"
import { required, email, min, max } from "vee-validate/dist/rules"
import { localize } from "vee-validate"
import tw from "vee-validate/dist/locale/zh_TW.json"

extend("email", email)
extend("required", required)
extend("min", min)
extend("max", max)

localize("tw", tw)

Vue.component("ValidationProvider", ValidationProvider)
Vue.component("ValidationObserver", ValidationObserver)
