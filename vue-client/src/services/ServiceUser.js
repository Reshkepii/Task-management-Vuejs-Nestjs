import helper from '../helper';

export default {

    login(values) {
        return helper().post('auth/signin',values)
    },
}