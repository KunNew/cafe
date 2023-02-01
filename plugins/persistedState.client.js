import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    // reducer: (state) => ({auth:state.auth}),
  }).plugin(store);
}
