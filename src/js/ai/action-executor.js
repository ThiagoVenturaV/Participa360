export class ActionExecutor {
  constructor(router, store) {
    this.router = router;
    this.store = store;
  }

  execute(action) {
    if (!action || !action.type) return null;

    switch (action.type) {
      case 'navegar':
        if (action.params && action.params.pagina) {
          this.router.navigate(action.params.pagina);
        }
        break;
      case 'reportar_problema':
        this.router.navigate('/reportar');
        break;
      case 'consultar_pontos':
        const user = this.store.getState().user;
        const pontos = user ? user.points : 0;
        return `Você tem ${pontos} pontos no momento.`;
      case 'consultar_relatos':
        this.router.navigate('/meus-relatos');
        break;
      case 'resgatar_recompensa':
        this.router.navigate('/marketplace');
        break;
      case 'ver_alertas':
        this.router.navigate('/alertas');
        break;
      case 'votar_enquete':
        if (action.params && action.params.id) {
           this.router.navigate(`/enquete/${action.params.id}`);
        }
        break;
      case 'listar_funcionalidades':
        return 'Eu posso te ajudar a navegar, reportar problemas, consultar seus pontos, resgatar recompensas e muito mais. Como posso ajudar agora?';
      default:
        break;
    }
    return null;
  }
}
