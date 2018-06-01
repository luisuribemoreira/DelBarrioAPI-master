const injection = {
  /**
   * Inyectar el atributo IDEN_USUARIO del usuario autenticado al payload entrante
   */
  IDEN_USUARIO: () => {
    return (req, res, next) => {
      if (req.user) {
        req.body.IDEN_USUARIO = req.user.IDEN_USUARIO
      }
      next()
    }
  }
}

export default injection
