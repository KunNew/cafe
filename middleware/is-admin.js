
export default function (context) {
  let user = context.store.getters['auth/user']

  if ( user.role !== 'admin' ) {
    return context.redirect('/errors/403')
  }
}
