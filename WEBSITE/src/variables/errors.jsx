// #########################################
//     used to show Parse Server erros
// #########################################
const Errors = {
    login: {
        400: {
            message: "Usuário/Senha Inválido" 
        }
    },
    101: {
        message: "Usuário/Senha Inválido" 
    },
    209: {
        message: "Faça login para continuar."
    },
    500: {
        message: "Ocorreu um erro interno, tente novamente."
    },
    //caso o servidor esteja off
    disabled: {
        message: "Não estamos conseguindo conectar com o servidor, tente novamente mais tarde."
    }
}

export default Errors;